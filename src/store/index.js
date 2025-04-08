import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from '../plugins/axios';

const store = createStore({
  state: {
    user: {
      imageSrc: '',
      detectedImageBlob: '',
      personalColor: {
        resultTone: '',
        description: '',
      },
      pcaResult: {
        success: false,
        errorMsg: '',
      }
      
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getPersonalColor(state) {
        return state.user.personalColor;
    },
    getPcaResult(state) {
      return state.user.pcaResult;
    },
  },
  mutations: {
    setDetectedImageSrc(state, blob) {
      state.user.imageSrc = blob;
    },
    setDetectedImage(state, blob) {
      state.user.detectedImageBlob = blob;
    },
    setPersonalColor(state, personalColor) {
      state.user.personalColor.resultTone = personalColor.tone;
      state.user.personalColor.description = personalColor.description;
    },
    resetPca(state) {
      state.user.detectedImageBlob = '';
      state.user.personalColor = {};
      state.user.personalColor.resultTone = '';
      state.user.personalColor.description = '';
      state.user.pcaResult.success = false;
      state.user.pcaResult.errorMsg = '';
    },
    setPcaResult(state, pcaResult) {
      state.user.pcaResult.success = pcaResult.success;
      state.user.pcaResult.errorMsg = pcaResult.errorMsg;
    },
  },
  actions: {
    async analysisImage({ state }) {
      const formData = new FormData();
      try {
        const blob = state.user.detectedImageBlob;

        if (!(blob instanceof Blob)) {
          console.error("유효한 Blob이 아님:", blob);
          throw new Error("이미지 Blob이 유효하지 않습니다.");
        }
        formData.append("image", state.user.detectedImageBlob, "face-image.png");
        const response = await axios.post('/color/analysis', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        this.commit('setPcaResult', { success: true, errorMsg: '' });
        this.commit('setPersonalColor', response.data);
      } catch (error) {
        console.error('Error analysisImage:', error);
        alert("분석 결과를 가져오는 데 실패했습니다. 다시 시도해주세요.");
        this.commit('setPcaResult', { success: false, errorMsg: 'Error occurred during analysis.' });
      }
    },
  },
  plugins: [createPersistedState({
    storage: window.localStorage,
  })],
});

export default store;
