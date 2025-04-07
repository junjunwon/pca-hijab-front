import { createRouter, createWebHistory } from 'vue-router';
// import store from '../store';
import HomePage from '../views/HomePage.vue';
import PcaResult from '../components/personalcolor/PcaResult.vue';
import PcaAnalysis from '../components/personalcolor/PcaAnalysis.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/result',
    name: 'PcaResult',
    component: PcaResult
  },
  {
    path: '/analysis',
    name: 'PcaAnalysis',
    component: PcaAnalysis
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // const allowedPaths = ['/', '/interview-selection', '/skill-selection', '/interview-start', '/coupang-ad'];
  next();
  // if (!allowedPaths.includes(to.path) && !store.state.sessionId) {
  //   next('/');
  // } else {
  //   next();
  // }
});
export default router;