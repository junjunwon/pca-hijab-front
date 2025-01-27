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
// import ColorThief from "colorthief";
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import RecordRTC from "recordrtc";
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
      this.captureCamera(camera => {
        const video = this.$refs["video"];
        video.muted = true;
        video.volume = 0;
        video.srcObject = camera;
        this.recorder = RecordRTC(camera, {
          type: "video",
          mimeType: 'video/webm', // 웹 브라우저에서 가장 호환성 좋은 포맷
          videoBitsPerSecond: 2500000, // 비트레이트 설정 (2.5Mbps)
          frameRate: 30 // 프레임 속도 설정
        });
        this.recorder.startRecording();
        this.recorder.camera = camera;

      });
      this.isRecording = true; // 녹화 중 상태로 변경
    },
    captureCamera(callback) {
      navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 1280 }, // 원하는 해상도 (가로)
          height: { ideal: 720 }, // 원하는 해상도 (세로)
          frameRate: { ideal: 30, max: 60 } // 프레임 속도
        },
        audio: true
      })
        .then(function(camera) {
          callback(camera);
        })
        .catch(function(error) {
          alert("Unable to capture your camera. Please check console logs.");
          console.error(error);
        });
    },
    stopRec() {
      return new Promise((resolve) => {
        try {
          // 녹화 중인지 확인하고, recorder가 있는 경우에만 stopRecording 호출
          this.recorder.stopRecording(this.stopRecordingCallback);
          this.isRecording = false; // 녹화 중 상태 해제
          
          this.recorder.stopRecording(() => {
            this.stopRecordingCallback();
            resolve(); // 녹화가 끝난 후에 resolve 호출
          });
          this.isRecording = false; // 녹화 중 상태 해제
        } catch (e) {
          alert('비디오가 로딩중입니다. 잠시만 기다려주세요.');
        }
        
      });
    },
    stopRecordingCallback() {
      const video = this.$refs["video"];
      if (video) {
        video.srcObject = null;
        video.muted = false;
        video.volume = 1;
      }
      
      this.recorder.camera.stop();
      this.recorder.destroy();
      this.recorder = null;
    },
  },
};
</script>
