import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { alertShow } from '@/composables/useAlertStore';

loadFonts()
const app = createApp(App);

// 전역 프로퍼티 등록
app.config.globalProperties.$alert = alertShow;

// 체이닝 그대로 사용
app
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
