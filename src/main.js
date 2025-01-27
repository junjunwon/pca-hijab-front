import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 전역 CSS 파일 추가
import './assets/css/global.css';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
