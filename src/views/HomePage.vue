<template>
  <div class="container">
      <div class="box">
        <p class="title">Your Color, Your Hijab</p>
        <p class="subtitle">Discover your perfect match with Personal Color 🤓 </p>
        <!-- <div class="email-input">
        <input
          v-model="email"
          type="text"
          placeholder="Enter your email"
          class="input"
        />
        <button @click="validateEmail" class="btn">Validate Email</button> -->
      <!-- </div> -->
        <div class="image-box">
          <img style="width:600px;"
               src="@/assets/hijab-personal-color.svg" alt="면접 리허설 이미지" class="image" />
        </div>
        <button @click="goToInterviewSelection">START</button>
      </div>

  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
export default {
  name: 'HomePage',
  data() {
    return {
      email: '',
    }
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['setUserEmail']),
    ...mapActions(['createSession', 'loadInterviewQuestions', 'resetInterview']),
    async goToInterviewSelection() {
      alert('카메라 약관 작업 필요');
      this.$router.push({ name: 'PcaAnalysis' });
    },
    validateEmail() {
      // 이메일 유효성 검증
      this.setUserEmail(this.email); // 유효한 이메일이면 상태 업데이트
    }
  }
};
</script>
