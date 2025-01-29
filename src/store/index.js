import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from '../plugins/axios';

const store = createStore({
  state: {
    user: {
      email: '',
      imageSrc: '',
      detectedImageBlob: '',
      personalColor: {
        resultTone: '',
        description: '',
      }
      
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    setUserEmail(state, email) {
      state.user.email = email;
    },
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
    }
  },
  actions: {
    async analysisImage({ state }) {
      const formData = new FormData();
      formData.append("email", state.user.email);
      formData.append("image", state.user.detectedImageBlob, "face-image.png");
      try {
        const response = await axios.post('/color/analysis', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        
        return response;
      } catch (error) {
        console.error('Error analysisImage:', error);
      }
    },
  },
  plugins: [createPersistedState({
    storage: window.localStorage,
  })],
});

export default store;
