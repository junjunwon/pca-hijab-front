import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from '../plugins/axios';

const store = createStore({
  state: {
    user: {
      email: '',
      detectedImageBlob: '',
    }
  },
  mutations: {
    setUserEmail(state, email) {
      state.user.email = email;
    },
    setDetectedImage(state, blob) {
      state.user.detectedImageBlob = blob;
      console.log(state.user.detectedImageBlob);
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
  getters: {
    
  },
  plugins: [createPersistedState({
    storage: window.localStorage,
  })],
});

export default store;
