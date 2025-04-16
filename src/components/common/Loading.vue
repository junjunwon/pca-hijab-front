<template>
  <MobileLayout>
    <v-container
        class="loading-container d-flex flex-column align-center justify-center text-center"
        fluid
    >
      <!-- 일러스트/이모지 -->
      <div class="emoji">💫</div>

      <!-- 메시지 -->
      <h2 class="loading-title">Analyzing Your Personal Color</h2>
      <p class="loading-subtitle">
        Finding the colors that make you shine ✨
      </p>

      <!-- 로딩 바 -->
      <v-progress-linear
          indeterminate
          color="#FF6B6B"
          class="loading-bar mt-8"
          height="8"
          rounded
      />
    </v-container>
  </MobileLayout>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Loading',
  data() {
    return {
    };
  },
  mounted() {
  },
  beforeUnmount() {
  },
  methods: {
  },
});
</script>

<style scoped>
.loading-container {
  height: 100vh;
  background: linear-gradient(180deg, #ff5757 0%, #ffb8b8 100%);
  color: white;
  padding: 32px 16px;
}

.emoji {
  font-size: 48px;
  margin-bottom: 20px;
}

.loading-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.loading-subtitle {
  font-size: 14px;
  opacity: 0.9;
}

.loading-bar {
  width: 80%;
}
</style>