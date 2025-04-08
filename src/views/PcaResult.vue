<template>
  <MobileLayout>
    <v-container fluid class="pa-0 gallery-page">
      <!-- 히잡 배경 이미지 -->
      <v-img
          src="@/assets/hijab-introduction.svg"
          height="200"
          cover
          class="w-100"
      />

      <!-- 이모지 + 컬러명 + 설명 -->
      <div class="text-center my-6">
        <div class="text-3xl">🎨</div>
        <h2 class="text-xl font-bold mt-2">{{ personalColor.resultTone }}</h2>
        <p class="mt-2 px-4 text-gray-600 text-sm">
          {{ personalColor.description }}
        </p>
      </div>

      <!-- 퍼스널컬러와 연관된 색상들 -->
      <v-row class="pa-4" dense>
        <v-col
            v-for="(color, index) in colorPalette"
            :key="index"
            cols="4"
            class="pa-1"
        >
          <div :style="{ backgroundColor: color }" class="color-box" />
        </v-col>
      </v-row>

      <!-- 이모지 + Color Match 문구 -->
      <div class="text-center mt-6">
        <div class="text-2xl">🛍️</div>
        <h3 class="text-base font-semibold mt-1">Your Color Match</h3>
      </div>

      <!-- 상품 리스트 갤러리 -->
      <v-row class="pa-4" dense>
        <v-col
            v-for="(item, i) in products"
            :key="i"
            cols="6"
            class="pa-1"
        >
          <v-card
              class="rounded-lg overflow-hidden"
              height="160"
              flat
          >
            <v-img
                :src="item.image"
                height="120"
                cover
            />
            <div class="text-xs pa-2 text-center">{{ item.name }}</div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Shop now 버튼 -->
      <div class="text-center mt-4 mb-6">
        <v-btn
            @click="redirectToBrand"
            color="primary"
            class="rounded-pill px-10 text-capitalize"
        >
          Shop Now
        </v-btn>
      </div>
      <!-- 다시 분석하러 가기 버튼 -->
      <div class="text-center mt-2 mb-8">
        <v-btn
            variant="outlined"
            color="secondary"
            class="rounded-pill px-8 text-capitalize"
            @click="restartPca"
        >
          다시 분석하러 가기
        </v-btn>
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
        { name: 'Peach Hijab', image: '@/assets/hijab-introduction.svg' },
        { name: 'Beige Classic', image: '@/assets/hijab-introduction.svg' },
        { name: 'Autumn Mood', image: '@/assets/hijab-introduction.svg' },
        { name: 'Natural Brown', image: '@/assets/hijab-introduction.svg' }
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
.gallery-page {
  background-color: #fffaf5;
}

.color-box {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
}
</style>