<template>
  <div class="container  step4">
    <!-- 상단 로딩바 -->
    <LoadingBar :isLoading="isLoading" />
    <div class="card">
      <!-- 중간의 질문과 비디오 녹화 -->
      <div class="content">
        <div class="question-area">
          <p class="nav"><span class="n">{{ "test" }}</span></p>
          <p class="title">{{ "안내문구 테스트" }}
            <span @click="generateSpeech" class="speaker -on"></span>
          </p>
          <!-- <p v-else>로딩 중...</p> -->
        </div>

        <div class="box">
          <div class="video-area">
            <video controls autoplay playsinline ref="video" height="400" width="600"></video>
          </div>
          <canvas ref="captureCanvas" style="display: none;"></canvas>
        </div>
      </div>
    </div>
    <!-- 하단 버튼 -->
    <div class="">
      <button class="btn_line" id="btn-start-recording" @click="stopAndstartRec">다시 녹화</button>
      <button @click="captureAndAnalyze" class="btn_line">Analyze Personal Color</button>
    </div>
  </div>
</template>

<script>
// import axios from '../../plugins/axios';
import * as faceapi from "face-api.js";
import ColorThief from "colorthief";
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import LoadingBar from '../util/LoadingBar.vue';

export default {
  components: {
    LoadingBar
  },
  data() {
    return {
      isLoading: false,
      recorder: null,
      synth: window.speechSynthesis,
      isRecording: false, // 음성 인식 상태 확인
      personalColor: null, // 분석 결과 저장
    };
  },
  computed: {
    ...mapState(['']),
    ...mapGetters(['']),
  },
  watch: {
  },
  mounted() {
    this.loadFaceApiModels();
    this.startRec();
  },
  methods: {
    ...mapMutations(['']),
    ...mapActions(['']),
    async loadFaceApiModels() {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      console.log("Face API models loaded");
    },
    generateSpeech() {
      const text = this.currentQuestion.question;
      this.textToSpeech(text);
    },
    textToSpeech(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      this.synth.speak(utterance);
    },
    startRec() {
      this.$refs.video.srcObject = null;
      this.captureCamera((camera) => {
        const video = this.$refs["video"];
        video.muted = true;
        video.volume = 0;
        video.srcObject = camera;
        this.recorder = camera;
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
    async captureAndAnalyze() {
      const canvas = this.$refs.captureCanvas;
      const video = this.$refs.video;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 얼굴 윤곽 인식
      const detections = await faceapi.detectAllFaces(
        canvas,
        new faceapi.TinyFaceDetectorOptions()
      );
      if (detections.length === 0) {
        alert("얼굴을 인식하지 못했습니다. 다시 시도해주세요.");
        return;
      }

      // 얼굴 영역 추출
      const faceBox = detections[0].box;
      const faceCanvas = document.createElement("canvas");
      faceCanvas.width = faceBox.width;
      faceCanvas.height = faceBox.height;
      faceCanvas
        .getContext("2d")
        .drawImage(
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

      // 주요 색상 추출
      const colorThief = new ColorThief();
      const dominantColor = colorThief.getColor(faceCanvas);
      this.personalColor = this.analyzePersonalColor(dominantColor);

      alert(`당신의 퍼스널컬러는 ${this.personalColor}입니다!`);
    },
    analyzePersonalColor([r, g, b]) {
      // 간단한 퍼스널컬러 분석 로직 (예: 톤 기반)
      if (r > g && r > b) return "Warm (Spring/Autumn)";
      if (b > r && b > g) return "Cool (Winter/Summer)";
      return "Neutral";
    },
  },
};
</script>
