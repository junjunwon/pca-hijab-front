<template>
  <div class="container">
      <div class="box">
        <p class="title">Hi color</p>
        <div class="image-box">
          <img style="width:393px;"
               src="@/assets/hijab-introduction.svg" alt="히잡 소개 이미지" class="image" />
        </div>
        <p class="subtitle">✨ Find Your Perfect Hijab Shade ✨</p>
        <button @click="goToPcaAnalysis">Take a photo</button>
        <button @click="uploadToPcaAnalysis">Upload photo</button>
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
    }
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['']),
    ...mapActions(['']),
    async goToPcaAnalysis() {
      alert('카메라 약관 작업 필요');
      this.$router.push({ name: 'PcaAnalysis' });
    },
    async uploadToPcaAnalysis() {
      alert('업로드 약관 작업 필요, 개발 진행중');
    }
  }
};
</script>
