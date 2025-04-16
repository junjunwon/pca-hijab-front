// composables/cookie.js

import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'vue3-cookies';

export function useRequestId() {
    const { cookies } = useCookies();

    const ensureRequestId = () => {
        let requestId = cookies.get('requestId');
        console.log('ensureRequestId-requestId:', requestId);
        if (!requestId) {
            requestId = uuidv4();
            // const isDev = window.location.hostname === 'localhost';
            cookies.set('requestId', requestId, {
                // path: '/',
                sameSite: 'None',     // SameSite=None으로 설정 (로컬에서도 필요할 수 있음)
                secure: false,
            });
        }
        return requestId;
    };

    const getRequestId = () => cookies.get('requestId');

    return { ensureRequestId, getRequestId };
}
