import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    
    // Giả lập thời gian phản hồi mạng (API Latency) 1.2s để test cơ chế chống nhấn đúp
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (username === 'nguyet1997' && password === 'Vantaa@35') {
      const user = { username, name: 'Nguyệt Nguyễn' };
      set({
        user,
        role: 'admin',
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      localStorage.setItem('spa_session', JSON.stringify({ user, role: 'admin' }));
      return { success: true, role: 'admin' };
    } else if (username === 'nhanvien1' && password === '12345678') {
      const user = { username, name: 'KTV Nguyễn Thị Hồng' };
      set({
        user,
        role: 'employee',
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      localStorage.setItem('spa_session', JSON.stringify({ user, role: 'employee' }));
      return { success: true, role: 'employee' };
    } else {
      const errMsg = 'Tài khoản hoặc mật khẩu không chính xác!';
      set({
        isLoading: false,
        error: errMsg
      });
      return { success: false, error: errMsg };
    }
  },

  logout: () => {
    localStorage.removeItem('spa_session');
    set({
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  },

  initializeSession: () => {
    const session = localStorage.getItem('spa_session');
    if (session) {
      try {
        const { user, role } = JSON.parse(session);
        set({ user, role, isAuthenticated: true });
      } catch (e) {
        localStorage.removeItem('spa_session');
      }
    }
  }
}));
