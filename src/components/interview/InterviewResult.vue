<template>
  <div class="container step5">
    <div class="card">
      <h2 class="title">모든 면접이 종료되었습니다.</h2>
      <p class="subtitle">결과를 확인해볼까요?</p>
      <div v-if="showingResult">
        <!-- 결과 테이블 -->
        <div class="response-table">
          <div class="session-info">
            <h4>인터뷰 유형 : {{ responseData.interviewTitle }}</h4>
            <h4>기술 : {{ responseData.skillTitle }}</h4>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width: 280px;">질문</th>
                <th>추천 답변</th>
                <th style="width: 100px;">영상 다운로드</th>
                <!-- <th>문항별 ChatGPT 답변</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in responseData.questionAnswerResponses" :key="index">
                <td>{{ item.question }}</td>
                <td>{{ item.idealAnswer || '준비중' }}</td>
                <td>
                  <button class="btn_text" v-if="item.answerBlob" @click="downloadAnswerBlob(item.answerBlob, index)">
                    Download
                  </button>
                  <span v-else>저장된 영상 없음</span>
                </td>
                <!-- <td>{{ item.answer || '답변 없음' }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="box">
        <button @click="restartInterview">처음으로 가기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      showingResult: false,
      responseData: {
        sessionId: null,
        interviewTitle: '',
        skillTitle: '',
        questionAnswerResponses: []
      }
    };
  },
  async mounted() {
    // 서버 데이터로 로그인 기능 개발 후 작업
    // const sessionResponse = await this.getSessionResult();
    // this.responseData = sessionResponse.data;
    this.responseData.sessionId = this.$store.state.sessionId;
    this.responseData.interviewTitle = this.$store.state.selectedInterview.title;
    this.responseData.skillTitle = this.$store.state.selectedSkill.title;
    this.responseData.questionAnswerResponses = this.$store.state.answers;
    if (this.responseData !== null) {
      this.showingResult = true;
    }
  },
  computed: {
    ...mapGetters(['getAnswers', 'getSelectedInterview', 'getSelectedSkill', 'getSessionId']),
  },
  methods: {
    ...mapMutations(['resetState']),
    ...mapActions(['saveInterviewResults', 'getSessionResult']),
    downloadAnswerBlob(blob, index) {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob); // Blob을 URL로 변환
      downloadLink.download = `mock_interview_video_${index + 1}.webm`; // 파일명 설정
      downloadLink.click(); // 클릭 이벤트로 다운로드 실행
    },
    async downloadFeedback() {
      const result = await this.saveInterviewResults();
      if (result) {
        const blob = new Blob([JSON.stringify(result)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'interview_results.json';
        a.click();
        URL.revokeObjectURL(url);
      } else {
        alert('질의응답 다운로드 중 오류가 발생했습니다.');
      }
    },
    restartInterview() {
      this.resetState();
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>
