<template>
  <MobileLayout>
    <v-col class="text-center">
      <h1 class="text-h5 font-weight-bold mb-4">Hi color</h1>
      <v-img src="@/assets/hijab-introduction.svg" aspect-ratio="1.5" contain class="mb-4" />
      <p class="mb-4">✨ Find Your Perfect Hijab Shade ✨</p>
      <v-btn @click="goToPcaAnalysis" block class="mb-2" color="primary">Take a photo</v-btn>
      <v-btn @click="triggerFileInput" block color="secondary">Upload photo</v-btn>
      <!-- 숨겨진 input 태그 -->
      <input
          type="file"
          accept="image/*"
          ref="images"
          @change="uploadToPcaAnalysis"
          style="display: none"
      />
    </v-col>
  </MobileLayout>
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
    ...mapMutations(['setDetectedImageSrc', 'setDetectedImage', 'setPersonalColor']),
    ...mapActions(['analysisImage']),
    async goToPcaAnalysis() {
      alert('카메라 약관 작업 필요');
      this.$router.push({ name: 'CameraToPca' });
    },
    triggerFileInput() {
      this.$refs.images.click();
    },
    async uploadToPcaAnalysis() {
      const file = this.$refs.images.files[0];
      if (!file) return;

      this.setDetectedImageSrc(URL.createObjectURL(file));

      try {
        const fileBlob = await this.handleFile(file);
        console.log('Blob 변환 완료:', fileBlob);
        this.setDetectedImage(fileBlob);

        // 분석 페이지로 이동
        this.$router.push({ name: 'Loading' }); // or 'PcaResult'
        await this.analyze();
      } catch (error) {
        console.error('Blob 변환 실패:', error);
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      }
    },
    async analyze() {
      //TODO: debounce 적용 필요
      const resultPersonalColor = await this.analysisImage();
      if (!resultPersonalColor) {
        console.error("분석 결과가 없습니다.");
        alert("분석 결과를 가져오는 데 실패했습니다. 다시 시도해주세요.");
        return;
      }
      this.setPersonalColor(resultPersonalColor.data);
    },
    handleFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const blob = new Blob([reader.result], { type: file.type });
          resolve(blob);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    },

  }
};
</script>
