// useAlertStore.js
import { ref } from 'vue';

const message = ref('');
const type = ref('info');
const visible = ref(false);

function show(msg, t = 'info') {
    message.value = msg;
    type.value = t;
    visible.value = true;

    setTimeout(() => {
        visible.value = false;
    }, 3000);
}

export const useAlertStore = () => ({
    message,
    type,
    visible,
    show,
});

export const alertShow = show; // ✨ 전역에서 직접 불러 쓸 수 있게
