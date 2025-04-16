// sseClient.js
const host = `${process.env.VUE_APP_API_BASE_URL}`;
export function connectSSE(requestId, eventName, onMessage, onError) {
    return new Promise((resolve) => {
        console.log("SSE 연결 시도", requestId);
        const source = new EventSource(`${host}/api/sse/subscribe?requestId=${requestId}`);

        source.addEventListener(eventName, (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("수신된 SSE 데이터", data);
                onMessage(data);
                source.close();
            } catch (err) {
                console.error("JSON 파싱 오류", err);
            }
        });

        source.onopen = () => {
            console.log("SSE 연결 성공");
            resolve(source); // 연결 성공 시 Promise resolve
        };

        source.onerror = (err) => {
            console.log("source is ", source);
            if (source.readyState === EventSource.CLOSED) {
                console.log('✅ SSE 연결이 정상적으로 종료되었습니다.');
                return;
            }

            console.error("❌ SSE 연결 오류", err);
            source.close();
            if (onError) onError();
        };
    });

}
