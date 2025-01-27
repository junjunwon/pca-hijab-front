import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from '../plugins/axios';

const store = createStore({
  state: {
    user: {
      email: '',
    }
  },
  mutations: {
    setUserEmail(state, email) {
      state.user.email = email;
    },
  },
  actions: {
    async saveTestAction({ state }) {
      try {
        const response = await axios.post('/api/color/analysis', {
          email: state.user.email,
        });

        return response;
      } catch (error) {
        console.error('Error creating session:', error);
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
