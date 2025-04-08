<template>
  <MobileLayout>
    <v-container
        class="loading-container d-flex flex-column align-center justify-center text-center"
        fluid
    >
      <!-- 로딩 이모지 & 메시지 -->
      <div class="emoji text-4xl mb-4">⏳</div>
      <h2 class="text-h6 font-weight-medium mb-2">당신의 퍼스널 컬러를 분석 중입니다</h2>
      <p class="text-subtitle-2 text-grey-darken-1 mb-6">
        잠시만 기다려 주세요!
      </p>

      <!-- 로딩 바 -->
      <v-progress-linear
          indeterminate
          color="primary"
          class="loading-bar"
          height="6"
      />
    </v-container>
  </MobileLayout>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'Loading',
  data() {
    return {
      polling: null,
      timeout: null,
    };
  },
  computed: {
    ...mapGetters(['getPcaResult']),
  },
  mounted() {
    let responded = false;

    // 10초 타임아웃 설정
    this.timeout = setTimeout(() => {
      if (!responded) {
        this.clearTimers();
        this.$dialog?.alert('10초 동안 응답이 없어 처음 화면으로 이동합니다.');
        this.$router.push({ name: 'Home' });
      }
    }, 10000);

    // 0.5초 간격 polling
    this.polling = setInterval(() => {
      const result = this.getPcaResult;

      if (!result) {
        this.$router.push({ name: 'Home' });
      }

      responded = true;
      this.clearTimers();

      if (result.success) {
        this.$router.push({ name: 'PcaResult' });
      } else if (result.errorMsg) {
        this.$dialog?.alert('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
        this.$router.push({ name: 'Home' });
      }
    }, 500);
  },
  beforeUnmount() {
    this.clearTimers();
  },
  methods: {
    clearTimers() {
      if (this.polling) {
        clearInterval(this.polling);
        this.polling = null;
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
  },
});
</script>


<style scoped>
.loading-container {
  height: 100vh;
  background: #fffaf5;
  padding: 32px;
}

.loading-bar {
  width: 80%;
}
</style>