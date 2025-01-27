import { createRouter, createWebHistory } from 'vue-router';
// import store from '../store';
import HomePage from '../views/HomePage.vue';
import InterviewResult from '../components/interview/InterviewResult.vue';
import MockInterview from '../components/interview/MockInterview.vue';
import CoupangAd from '@/components/util/CoupangAd.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/interview-result',
    name: 'InterviewResult',
    component: InterviewResult
  },
  {
    path: '/mock-interview',
    name: 'MockInterview',
    component: MockInterview
  },
  {
    path: '/coupang-ad',
    name: 'CoupangAd',
    component: CoupangAd
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