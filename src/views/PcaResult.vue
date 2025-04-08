<template>
  <MobileLayout>
    <v-container fluid class="pa-0 result-page">

      <!-- 상단 배경 및 인물 일러스트 -->
      <div class="top-banner red-gradient"></div>

      <!-- 결과 정보 -->
      <div class="result-card">
        <div class="sparkle-icon">✨</div>
        <h2 class="title">{{ personalColor.resultTone }}</h2>
        <p class="subtitle">{{ personalColor.description }}</p>

        <!-- 점수 -->
        <v-row justify="center" class="score-row">
          <v-col cols="4" class="score-item">
            <div class="score">86%</div>
            <div class="label">Warm Tone</div>
          </v-col>
          <v-col cols="4" class="score-item">
            <div class="score">63%</div>
            <div class="label">Spring</div>
          </v-col>
          <v-col cols="4" class="score-item">
            <div class="score">76%</div>
            <div class="label">Bright</div>
          </v-col>
        </v-row>

        <v-divider class="my-8" />

        <!-- 컬러 매치 -->
        <div class="text-center">
          <div class="drop-icon">💧</div>
          <h3 class="color-match-title">Your Color Match</h3>
        </div>

        <!-- 상품 리스트 -->
        <v-row class="pa-2 product-list" dense>
          <v-col
              v-for="(item, i) in products"
              :key="i"
              cols="4"
              class="pa-1"
          >
            <v-card class="rounded-lg overflow-hidden" flat>
              <v-img
                  :src="item.image"
                  height="100"
                  cover
              />
              <div class="product-name">{{ item.name }}</div>
            </v-card>
          </v-col>
        </v-row>

        <!-- 버튼 -->
        <v-btn @click="redirectToBrand" class="app-button-red" block rounded size="x-large">
          <strong>Shop now</strong>
        </v-btn>
        <div @click="restartPca" class="share-result text-center mt-2">
          go back
        </div>
      </div>
    </v-container>
  </MobileLayout>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      colorPalette: [
        '#CFAF91', '#EFD8C5', '#A45A52',
        '#D8B4A0', '#B89C8E', '#ECC1A1'
      ],
      products: [
        { name: 'Peach Hijab', image: require('@/assets/hijab-temp.svg') },
        { name: 'Beige Classic', image: require('@/assets/hijab-temp.svg') },
        { name: 'Autumn Mood', image: require('@/assets/hijab-temp.svg') },
      ],
      personalColor: {},
      resultImageSrc: '',
    };
  },
  async mounted() {
    this.personalColor = this.getUser.personalColor;
    this.resultImageSrc = this.getUser.imageSrc;
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    ...mapMutations(['resetPca']),
    ...mapActions(['']),
    redirectToBrand() {
      window.open('https://shopee.co.id/Hijab-cat.11042684.11042685', '_blank');
    },
    restartPca() {
      this.resetPca();
      this.$router.push({ name: 'Home' });
    },
  }
});
</script>
<style scoped>
.result-page {
  background-color: #fffaf5;
}

.red-gradient {
  background: linear-gradient(180deg, #ff5757 0%, #ffb8b8 100%);
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
}

.character-img {
  width: 140px;
  height: auto;
}

.result-card {
  background-color: white;
  border-radius: 24px 24px 0 0;
  margin-top: -24px;
  padding: 24px 16px 40px;
}

.sparkle-icon {
  font-size: 20px;
  text-align: center;
}

.title {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-top: 4px;
}

.subtitle {
  font-size: 14px;
  color: #888;
  text-align: center;
  margin-top: 4px;
}

.score-row {
  margin-top: 24px;
}

.score-item {
  text-align: center;
}

.score {
  font-size: 20px;
  font-weight: 600;
  color: #ff5757;
}

.label {
  font-size: 12px;
  color: #666;
}

.color-match-title {
  font-size: 16px;
  font-weight: 600;
  margin-top: 4px;
}

.drop-icon {
  font-size: 20px;
}

.share-result {
  font-size: 14px;
  color: #aaa;
  text-decoration: underline;
}

.product-name {
  font-size: 11px;
  line-height: 1.2;
  text-align: center;
  margin-top: 4px;
  color: #333;
}

.product-list {
  margin-bottom: 24px;
}
</style>