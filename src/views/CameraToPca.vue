<template>
  <MobileLayout>
    <div class="camera-wrapper">
      <video ref="video" autoplay playsinline muted></video>

      <!-- 얼굴 가이드 -->
      <div class="face-guide" />

      <!-- 텍스트 가이드 -->
      <p class="capture-guide-text">
        make sure your face fits <br />nicely in the circle!
      </p>

      <!-- 카메라 버튼 UI -->
      <div class="camera-ui">
        <button class="shutter-button" @click="detectToPca" />
      </div>

      <!-- 캡처용 canvas -->
      <canvas ref="captureCanvas" class="hidden-canvas"></canvas>
    </div>
  </MobileLayout>
</template>
<script>
import * as faceapi from "face-api.js";
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
// import Loading from '../common/Loading.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    // Loading
  },
  data() {
    return {
      isLoading: false,
      personalColor: null, // 분석 결과 저장
      image: new Image(),
      imageSrc: '',
      file: '',

    };
  },
  computed: {
    ...mapState(['']),
    ...mapGetters(['']),
  },
  watch: {
  },
  mounted() {
    this.isLoading = true;
    this.loadFaceApiModels();
    this.startRec();
  },
  methods: {
    ...mapMutations(['setDetectedImage', 'setPersonalColor', 'setDetectedImageSrc']),
    ...mapActions(['analysisImage']),
    async loadFaceApiModels() {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      console.log("Face API models loaded");
    },
    startRec() {
      this.$refs.video.srcObject = null;
      this.captureCamera((stream) => {
        const video = this.$refs["video"];
        video.srcObject = stream;
        this.startWebSocket();  // WebSocket 연결 시작
      });
    },
    captureCamera(callback) {
      navigator.mediaDevices
          .getUserMedia({
            video: { facingMode: 'user' },
            audio: false,
            with: 393,
          })
          .then((camera) => {
            callback(camera);
            this.isLoading = false;
          })
          .catch((error) => {
            alert("Unable to capture your camera. Please check console logs.");
            console.error(error);
          });
    },
    async detectToPca() {
      await this.detectFace();
      this.$router.push({ name: 'Loading' });
      setTimeout(() => {
        this.analyze();
      }, 100); // 100~300ms 사이 실험 가능
    },
    async detectFace() {
      try {
        console.log("captureAndAnalyze 시작");

        const canvas = this.$refs.captureCanvas;
        const video = this.$refs.video;

        if (!video.videoWidth || !video.videoHeight) {
          console.error("비디오 크기 확인 실패", { videoWidth: video.videoWidth, videoHeight: video.videoHeight });
          alert("비디오가 준비되지 않았습니다. 다시 시도해주세요.");
          return;
        }
        console.log("비디오 크기 확인 완료");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        console.log("캔버스에 비디오 그리기 완료", ctx);

        console.log("얼굴 인식 시작");
        const detections = await faceapi.detectAllFaces(
            canvas,
            new faceapi.TinyFaceDetectorOptions()
        );
        console.log("얼굴 인식 결과:", detections);

        if (!detections || detections.length === 0) {
          console.warn("얼굴을 인식하지 못함");
          alert("얼굴을 인식하지 못했습니다. 얼굴을 화면 중앙에 맞추고 다시 시도해주세요.");
          return;
        }

        const faceBox = {
          x: detections[0].box._x,
          y: detections[0].box._y,
          width: detections[0].box._width,
          height: detections[0].box._height,
        };
        console.log("첫 번째 얼굴 박스:", faceBox);

        const faceCanvas = this.extractFace(canvas, faceBox);
        console.log("faceCanvas 크기:", faceCanvas.width, faceCanvas.height);

        // faceCanvas를 이미지로 변환
        this.imageSrc = faceCanvas.toDataURL();
        this.setDetectedImageSrc(this.imageSrc);
        // faceCanvas를 Blob으로 변환
        faceCanvas.toBlob((blob) => {
          this.setDetectedImage(blob);
        })
      } catch (error) {
        console.error("전체 프로세스에서 오류 발생", error);
        alert("분석 중 알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
    async analyze() {
      //TODO: debounce 적용 필요
      const resultPersonalColor = await this.analysisImage();
      if (!resultPersonalColor) {
        console.error("분석 결과가 없습니다.");
        alert("분석 결과를 가져오는 데 실패했습니다. 다시 시도해주세요.");
        return;
      }
      console.log(resultPersonalColor);
      this.setPersonalColor(resultPersonalColor.data);
    },
    extractFace(canvas, faceBox) {
      try {
        console.log("extractFace 시작:", faceBox);

        const faceCanvas = document.createElement("canvas");
        faceCanvas.width = faceBox.width;
        faceCanvas.height = faceBox.height;

        const faceCtx = faceCanvas.getContext("2d");
        faceCtx.drawImage(
            canvas,
            faceBox.x,
            faceBox.y,
            faceBox.width,
            faceBox.height,
            0,
            0,
            faceBox.width,
            faceBox.height
        );

        console.log("extractFace 완료");
        return faceCanvas;
      } catch (extractError) {
        console.error("extractFace 중 오류 발생", extractError);
        throw extractError; // 상위로 에러 전달
      }
    },
    async imageUpload() {
      // refs 속성을 이용해 input 태그에 접근함
      this.file = this.$refs.images.files[0];
      console.log(this.file);
      this.setDetectedImageSrc(URL.createObjectURL(this.file));

      try {
        const fileBlob = await this.handleFile();
        console.log('Blob 변환 완료:', fileBlob);
        this.setDetectedImage(fileBlob);
      } catch (error) {
        console.error('Blob 변환 실패:', error);
      }
    },
    handleFile() {
      return new Promise((resolve, reject) => {
        if (this.file) {
          const reader = new FileReader();

          reader.onload = (e) => {
            try {
              // Base64 데이터를 Blob으로 변환
              const binaryStr = atob(e.target.result.split(',')[1]);
              const len = binaryStr.length;
              const arr = new Uint8Array(len);

              for (let i = 0; i < len; i++) {
                arr[i] = binaryStr.charCodeAt(i);
              }

              const blob = new Blob([arr], { type: this.file.type });
              resolve(blob);
            } catch (error) {
              reject(error);
            }
          };

          reader.onerror = (error) => {
            reject(error);
          };

          reader.readAsDataURL(this.file);
        } else {
          reject(new Error('파일이 없습니다.'));
        }
      });
    },
    startWebSocket() {
      const socket = new WebSocket("ws://172.23.19.84:3000/ws");  // WebSocket 연결 시도
      const timeoutDuration = 5000;  // 5초 타임아웃 설정 (필요 시 조정)

      // 타임아웃 처리
      const timeout = setTimeout(() => {
        if (socket.readyState === WebSocket.CONNECTING) {  // 아직 연결 중이면
          socket.close();  // 강제 종료
          console.log("WebSocket 연결 타임아웃: 5초 내 연결 실패");
        }
      }, timeoutDuration);

      socket.onopen = () => {
        clearTimeout(timeout);  // 연결 성공 시 타임아웃 취소
        console.log("WebSocket 연결 성공");
        // 필요 시 스트림 전송 로직 추가
      };

      socket.onerror = (error) => {
        clearTimeout(timeout);  // 오류 발생 시 타임아웃 취소
        console.error("WebSocket 오류:", error);
      };

      socket.onclose = () => {
        clearTimeout(timeout);  // 연결 종료 시 타임아웃 취소
        console.log("WebSocket 연결 종료");
      };

      socket.onmessage = (message) => {
        console.log("서버로부터 메시지 수신:", message.data);
      };
    },
  },
});
</script>
<style scoped lang="scss">
@import '@/assets/styles/face-capture.scss';
</style>