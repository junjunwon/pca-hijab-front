import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import CameraToPca from '../views/CameraToPca.vue';
import PcaResult from '../views/PcaResult.vue';
import Loading from '../components/common/Loading.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/camera',
    name: 'CameraToPca',
    component: CameraToPca
  },
  {
    path: '/result',
    name: 'PcaResult',
    component: PcaResult
  },
  {
    path: '/loading',
    name: 'Loading',
    component: Loading
  },
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