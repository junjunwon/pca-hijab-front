<template>
  <div class="container step4">
    <div class="card">
      <div class="content">
          <h2 class="title">You are a {{ personalColor.resultTone }}</h2>
          <p class="subtitle">Email: {{}} </p>
          <p class="subtitle">{{ personalColor.description }} </p>
      </div>
      <div class="">
        <div>
          <img :src="resultImageSrc" alt="Face Image" />
        </div>
        <div>
          <button @click="restartPca">Back to Home</button>
          <button @click="showProduct">Discover Your Hijab</button>
        </div>
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
    },
    showProduct() {
      alert('준비중...');
    }
  }
};
</script>
