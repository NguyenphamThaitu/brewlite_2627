import { useSyncExternalStore } from 'react';

// true khi đã chạy trên trình duyệt (tránh lệch giao diện do giỏ hàng lưu trong localStorage)
export function useHydrated() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
}