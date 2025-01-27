<template>
  <div class="container">
      <div class="box">
        <p class="title">Let's find my own hijab<br />With My Personal Color</p>
        <p class="subtitle">write your email address 🤓 </p>
        <div class="email-input">
        <input
          v-model="email"
          type="text"
          placeholder="Enter your email"
          class="input"
        />
        <button @click="validateEmail" class="btn">Validate Email</button>
      </div>
        <button class="button-text" @click="goToInterviewSelection">START</button>
        <div class="image-box">
          <img style="width:400px; height: 400px;"
               src="@/assets/otter_ character.png" alt="면접 리허설 이미지" class="image" />
        </div>
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
      this.$router.push({ name: 'MockInterview' });
    },
    validateEmail() {
      // 이메일 유효성 검증
      this.setUserEmail(this.email); // 유효한 이메일이면 상태 업데이트
    }
  }
};
</script>
