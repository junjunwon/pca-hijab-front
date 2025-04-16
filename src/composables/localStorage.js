import { v4 as uuidv4 } from 'uuid';

export function useRequestId() {
    const STORAGE_KEY = 'requestId';

    const ensureRequestId = () => {
        let requestId = localStorage.getItem(STORAGE_KEY);
        if (!requestId) {
            requestId = uuidv4();
            localStorage.setItem(STORAGE_KEY, requestId);
        }
        return requestId;
    };

    const getRequestId = () => localStorage.getItem(STORAGE_KEY);

    const clearRequestId = () => localStorage.removeItem(STORAGE_KEY);

    return { ensureRequestId, getRequestId, clearRequestId };
}