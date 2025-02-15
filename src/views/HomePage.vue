<template>
  <div class="container">
      <div class="box">
        <p class="title">Your Color, Your Hijab</p>
        <p class="subtitle">Discover your perfect match with Personal Color 🤓 </p>
        <div class="email-input">
          <input
            v-model="email.address"
            type="text"
            placeholder="Enter your email"
            class="input"
          />
        <button @click="validateAndSetEmail" class="btn">Validate Email</button>
      </div>
        <div class="image-box">
          <img style="width:600px;"
               src="@/assets/hijab-personal-color.svg" alt="면접 리허설 이미지" class="image" />
        </div>
        <button @click="goToInterviewSelection">START NOW!</button>
      </div>

  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
import validateMixin from '@/mixins/validateMixin.js';

export default {
  mixins: [validateMixin],
  name: 'HomePage',
  data() {
    return {
      email: {
        address: '',
        passValid: false,
      },
    }
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['setUserEmail']),
    ...mapActions(['createSession', 'loadInterviewQuestions', 'resetInterview']),
    async goToInterviewSelection() {
      if (!this.email.passValid) {
        alert('이메일을 입력해주세요.');
        return;
      }
      alert('카메라 약관 작업 필요');
      this.$router.push({ name: 'PcaAnalysis' });
    },
    validateAndSetEmail() {
      // 이메일 유효성 검증
      this.email.passValid = this.validateEmail(this.email.address);
      if (!this.email.passValid) {
        alert('❌ 유효한 이메일 형식이 아닙니다.');
      } else {
        alert("✅ 이메일이 유효합니다!");
        this.setUserEmail(this.email.address); // 유효한 이메일이면 상태 업데이트
      }
    }
  }
};
</script>
