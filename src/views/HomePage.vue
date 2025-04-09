<template>
  <MobileLayout>
    <div class="intro-header">
      <h1 class="headline">Find Your<br />Personal Color</h1>
      <p class="subtext">Over 2.4 million people have found theirs</p>
    </div>
    <div class="intro-page">
      <div class="prep-section">
        <h2 class="prep-title">Quick prep<br />before we start</h2>

        <ul class="prep-checklist">
          <li>
            <span class="icon blue-circle" /> Turn off blue light filters
          </li>
          <li>
            <span class="icon light-bulb" /> Use natural or white lighting
          </li>
          <li>
            <span class="icon sparkle" /> No makeup is best
          </li>
        </ul>

        <div class="face-check">
          <div class="face-item">
            <v-img src="@/assets/hijab-temp2.png" alt="full face visible" />
            <span class="caption success">Good lighting,<br />full face visible</span>
          </div>
          <div class="face-item">
            <v-img src="@/assets/hijab-temp2.png" alt="partly in shadow" />
            <span class="caption error">Face is partly<br />in shadow</span>
          </div>
          <div class="face-item">
            <v-img src="@/assets/hijab-temp2.png" alt="face covered" />
            <span class="caption error">Face is mostly<br />covered</span>
          </div>
        </div>
      </div>
      <div class="button-group">
        <v-btn @click="goToPcaAnalysis" class="app-button-red" block rounded size="x-large">
          <strong>I’m ready – Let’s go! 🪄</strong>
        </v-btn>
        <v-btn @click="triggerFileInput" class="app-button-red" block rounded size="x-large">
          <strong>Upload photo</strong>
        </v-btn>
      </div>
    </div>
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
      this.$alert('카메라 약관 작업 필요', 'info');
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
        setTimeout(() => {
          this.analyze();
        }, 100); // 100~300ms 사이 실험 가능
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
<style scoped lang="scss">
@import '@/assets/styles/app-button.scss';

.intro-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 32px;

  .button-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px; // 버튼 사이 간격 줄이기
  }
}

.intro-header {
  background: linear-gradient(180deg, #f75a5f 0%, #f08e8e 100%);
  color: white;
  text-align: center;
  padding: 40px 24px 32px;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;

  .headline {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
    line-height: 1.3;
  }

  .subtext {
    font-size: 16px;
    font-weight: 400;
    opacity: 0.9;
  }
}

.prep-section {
  background-color: #fff;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);

  .prep-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  .prep-checklist {
    list-style: none;
    padding: 0;
    margin: 0 0 16px 0;

    li {
      display: flex;
      align-items: center;
      font-size: 16px;
      margin-bottom: 12px;

      .icon {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        border-radius: 50%;

        &.blue-circle {
          background-color: #3b82f6;
        }

        &.light-bulb {
          background-color: #fbbf24;
        }

        &.sparkle {
          background-color: #fbcfe8;
        }
      }
    }
  }

  .face-check {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    text-align: center;

    .face-item {
      flex: 1;

      img {
        width: 100%;
        max-width: 80px;
        margin: 0 auto 8px;
      }

      .caption {
        font-size: 11px;
        display: block;

        &.success {
          color: #16a34a;
        }

        &.error {
          color: #dc2626;
        }
      }
    }
  }
}
</style>