<!-- components/LoadingBar.vue -->
<template>
    <div v-if="isLoading" class="loading-bar">Loading...</div>
  </template>
  
  <script>
  export default {
    props: {
      isLoading: {
        type: Boolean,
        required: true
      }
    }
  };
  </script>