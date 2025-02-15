  <template>
    <select v-model="selectedNumber" id="numberSelect" @change="emitSelectedNumber">
      <option v-for="number in numbers" :key="number" :value="number">{{ number }}</option>
     </select>
  </template>
  
  <script>
  export default {
    props: {
      maxNumber: {
        type: Number,
        required: true
      },
      modelValue: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        selectedNumber: this.modelValue // 부모로부터 초기 값을 받음
      };
    },
    computed: {
      numbers() {
        // maxNumber 값에 따라 1부터 maxNumber까지의 숫자 배열 생성
        return Array.from({ length: this.maxNumber }, (_, i) => i + 1);
      }
    },
    methods: {
      emitSelectedNumber() {
        // 부모 컴포넌트에게 선택된 숫자 값을 전달
        this.$emit('update:modelValue', this.selectedNumber);
      }
    },
    watch: {
      modelValue(newValue) {
        // 부모 컴포넌트로부터 값이 변경되면 데이터 업데이트
        this.selectedNumber = newValue;
      }
    }
  };
  </script>  