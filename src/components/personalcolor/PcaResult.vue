<template>
  <div class="container step4">
    <div class="card">
      <h2 class="title">You are a {{ personalColor.resultTone }}</h2>
      <p class="subtitle">Email: {{}} </p>
      <div>
        <p class="subtitle">{{ personalColor.description }} </p>
      </div>
      <div>
        <img :src="resultImageSrc" alt="Face Image" />
      </div>
      <div class="box">
        <button @click="restartPca">처음으로 가기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      email: '',
      personalColor: {},
      resultImageSrc: '',
    };
  },
  async mounted() {
    console.log('this.getUser');
    console.log(this.getUser);
    this.email = this.getUser.email;
    this.personalColor = this.getUser.personalColor;
    this.resultImageSrc = this.getUser.imageSrc;
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    ...mapMutations(['resetPca']),
    ...mapActions(['']),
    restartPca() {
      this.resetPca();
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>
