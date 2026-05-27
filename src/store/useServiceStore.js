import { create } from 'zustand';

export const useServiceStore = create((set, get) => ({
  cart: [],
  isCheckingOut: false,

  // Thêm dịch vụ vào giỏ hàng
  addToCart: (service) => {
    const { cart } = get();
    const existing = cart.find(item => item.id === service.id);
    
    if (existing) {
      // Nếu đã có thì tăng số lượng
      set({
        cart: cart.map(item => 
          item.id === service.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      });
    } else {
      // Nếu chưa có thì thêm mới
      set({
        cart: [...cart, { ...service, quantity: 1 }]
      });
    }
  },

  // Xóa khỏi giỏ hàng
  removeFromCart: (serviceId) => {
    const { cart } = get();
    set({
      cart: cart.filter(item => item.id !== serviceId)
    });
  },

  // Cập nhật số lượng trực tiếp
  updateQuantity: (serviceId, quantity) => {
    const { cart } = get();
    if (quantity <= 0) {
      set({
        cart: cart.filter(item => item.id !== serviceId)
      });
      return;
    }
    set({
      cart: cart.map(item => 
        item.id === serviceId ? { ...item, quantity } : item
      )
    });
  },

  // Xóa toàn bộ giỏ
  clearCart: () => {
    set({ cart: [] });
  },

  // Tính tổng số tiền dịch vụ chọn
  getTotalPrice: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  // Tính tổng số lượng gói
  getTotalItems: () => {
    const { cart } = get();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  // Giả lập thanh toán hóa đơn bất đồng bộ
  checkout: async () => {
    const { cart } = get();
    if (cart.length === 0) return { success: false, error: 'Giỏ hàng trống!' };

    set({ isCheckingOut: true });

    // Giả lập kết nối ngân hàng / cổng thanh toán 1.5 giây
    await new Promise((resolve) => setTimeout(resolve, 1500));

    set({ isCheckingOut: false, cart: [] });
    return { success: true };
  }
}));
