<template>
  <div
      class="alert"
      :class="`alert--${type}`"
  >
    <v-icon class="alert-icon" :icon="icon" />
    <div class="alert-text">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info', // info, warning, error
    validator: (val) => ['info', 'warning', 'error'].includes(val),
  },
});

const icon = computed(() => {
  switch (props.type) {
    case 'info':
      return 'mdi-information-outline';
    case 'warning':
      return 'mdi-alert-outline';
    case 'error':
      return 'mdi-close-circle-outline';
  }
});
</script>

<style scoped>
.alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  background-color: #fffaf5;
  border: 1px solid transparent;
}

.alert-icon {
  font-size: 20px;
}

.alert--info {
  background-color: #fefcf9;
  color: #555;
  border-color: #ffe8b6;
}

.alert--warning {
  background-color: #fff4e5;
  color: #b05e00;
  border-color: #ffc66c;
}

.alert--error {
  background-color: #ffecec;
  color: #d32f2f;
  border-color: #ff9d9d;
}
</style>
