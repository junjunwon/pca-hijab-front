<template>
  <div class="container  step4">
    <!-- 상단 로딩바 -->
    <LoadingBar :isLoading="isLoading" />
    <div class="card">
      <!-- 중간의 질문과 비디오 녹화 -->
      <div class="content">
        <div class="question-area">
          <p class="nav"><span class="n">{{ "test" }}</span></p>
          <p class="title">{{ guideSentence }}
            <span @click="generateSpeech" class="speaker -on"></span>
          </p>
          <!-- <p v-else>로딩 중...</p> -->
        </div>

        <div class="box">
          <div class="video-area">
            <video autoplay muted ref="video"></video>
            <img v-if=imageSrc :src="imageSrc" alt="Face Image" />
          </div>
        </div>
        <canvas ref="captureCanvas" style="display: none;"></canvas>
      </div>
    </div>
    <!-- 하단 버튼 -->
    <div class="">
      <button @click="detectFace">Detect Face</button>
      <button v-if=imageSrc @click="analyze">Analyze Personal Color</button>
    </div>
  </div>
</template>

<script>
// import axios from '../../plugins/axios';
import * as faceapi from "face-api.js";
// import ColorThief from "colorthief";
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import LoadingBar from '../util/LoadingBar.vue';

export default {
  components: {
    LoadingBar
  },
  data() {
    return {
      isLoading: false,
      synth: window.speechSynthesis,
      isRecording: false, // 음성 인식 상태 확인
      personalColor: null, // 분석 결과 저장
      image: new Image(),
      imageSrc: '',
      guideSentence: '📸 머리카락은 뒤로 남기고, 맨 얼굴로 정면을 바라봐주세요.',

    };
  },
  computed: {
    ...mapState(['']),
    ...mapGetters(['']),
  },
  watch: {
  },
  mounted() {
    this.generateSpeech();
    this.loadFaceApiModels();
    this.startRec();
  },
  methods: {
    ...mapMutations(['setDetectedImage']),
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
      });
    },
    captureCamera(callback) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((camera) => {
          callback(camera);
        })
        .catch((error) => {
          alert("Unable to capture your camera. Please check console logs.");
          console.error(error);
        });
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
      const resultPca = await this.analysisImage();
      console.log(resultPca);
      //loading바에 아래 문구 추가하면 좋을듯?
      // '잠시만 기다려주세요...\n' +
      //                       'AI가 당신의 퍼스널 컬러를 분석하여 \n' +
      //                       '어울리는 히잡 컬러를 추천해드립니다 ✨
      alert(`퍼스널 컬러 분석 결과...${resultPca.data.tone} (TODO: 별도 결과 페이지 구성 필요)`);
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
    generateSpeech() {
      this.textToSpeech(this.guideSentence);
    },
    textToSpeech(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      this.synth.speak(utterance);
    },
    analyzePersonalColor([r, g, b]) {
      console.log("analyzePersonalColor 시작:", { r, g, b });

      if (r > g && r > b) return "Warm (Spring/Autumn)";
      if (b > r && b > g) return "Cool (Winter/Summer)";
      return "Neutral";
    },
  },
};
</script>
