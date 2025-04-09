<template>
  <v-app>
    <GlobalAlert />
    <router-view/>
  </v-app>
</template>

<script>

import GlobalAlert from "@/components/GlobalAlert.vue";

export default {
  name: 'App',
  components: {GlobalAlert},

  data: () => ({
    //
  }),
}
</script>
