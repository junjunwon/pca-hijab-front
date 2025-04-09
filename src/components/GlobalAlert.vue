<template>
  <Transition name="fade">
    <div v-if="visible" class="global-alert" :class="`alert--${type}`">
      <v-icon class="icon" :icon="icon" />
      {{ message }}
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { useAlertStore } from '@/composables/useAlertStore';

const { visible, message, type } = useAlertStore();

const icon = computed(() => {
  switch (type.value) {
    case 'warning': return 'mdi-alert-outline';
    case 'error': return 'mdi-close-circle-outline';
    default: return 'mdi-information-outline';
  }
});
</script>

<style scoped>
.global-alert {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 9999;

  min-width: 280px;
  max-width: 90vw;
  width: fit-content;

  white-space: pre-wrap; /* 줄바꿈 허용 */
  word-break: break-word; /* 단어 단위 줄바꿈 */
}

.alert--info {
  background: #fefcf9;
  color: #333;
}
.alert--warning {
  background: #fff4e5;
  color: #b05e00;
}
.alert--error {
  background: #ffecec;
  color: #d32f2f;
}
.icon {
  font-size: 20px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
