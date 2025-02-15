<template>
    <div class="ad-container">
      <!-- 쿠팡파트너스 광고 코드 삽입 -->
      <button @click="showResult">결과 바로보기</button>
      <div @click="showResult" v-html="coupangAd"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        coupangAd: `<a href="https://link.coupang.com/a/bXyVen" target="_blank" referrerpolicy="unsafe-url">
            <img src="https://ads-partners.coupang.com/banners/767228?subId=&traceId=V0-301-879dd1202e5c73b2-I767228&w=320&h=480" alt="">
            </a>`
      };
    },
    methods: {
        showResult() {
            this.$router.push({ name: 'InterviewResult' });
        }
    }
  }
  </script>

  <style>
  .ad-container {
    margin: 20px 0;
    text-align: center;
  }
  </style>
  