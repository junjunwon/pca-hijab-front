<template>
  <v-app>
    <v-main class="bg-grey-lighten-5 gallery-page">
      <v-container class="pa-4" fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
</script>
<style scoped>
.gallery-page {
  background-color: #fffaf5;
}
</style>