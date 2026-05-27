import { useState, useCallback } from 'react';

/**
 * Custom Hook giúp quản lý trạng thái tải của các thao tác bất đồng bộ (submit, payment, login)
 * và tự động ngăn chặn việc gọi trùng lặp (Anti-duplicate calling / Double-tap prevention).
 * 
 * @param {Function} asyncCallback - Hàm bất đồng bộ cần thực thi
 * @returns {Array} [executeAction, isPending]
 */
export const useAsyncAction = (asyncCallback) => {
  const [isPending, setIsPending] = useState(false);

  const executeAction = useCallback(async (...args) => {
    if (isPending) return; // Ngăn chặn nếu đang chạy
    
    setIsPending(true);
    try {
      const result = await asyncCallback(...args);
      return result;
    } catch (error) {
      console.error("Lỗi hành động bất đồng bộ:", error);
      throw error;
    } finally {
      setIsPending(false);
    }
  }, [asyncCallback, isPending]);

  return [executeAction, isPending];
};
