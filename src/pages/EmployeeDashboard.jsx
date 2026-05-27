import React, { useState } from 'react';
import { EmployeeLayout } from '../layouts/EmployeeLayout';
import { useServiceStore } from '../store/useServiceStore';
import { spaServices } from '../utils/mockData';
import { Button } from '../components/Button';
import { 
  Sparkles, 
  Clock, 
  Check, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  X,
  CheckCircle2
} from 'lucide-react';

// Định dạng tiền tệ VND chuyên nghiệp
const formatCurrency = (val) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
};

/**
 * Màn hình Nghiệp vụ Nhân viên (EmployeeDashboard.jsx)
 * Thiết kế ưu tiên Mobile-First cực tốt cho màn hình dọc của iPhone (13 -> 16 Pro Max).
 */
export const EmployeeDashboard = () => {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    getTotalItems,
    checkout,
    isCheckingOut
  } = useServiceStore();

  const [activeTab, setActiveTab] = useState('massage'); // 'massage' (Bấm huyệt) hoặc 'hair' (Cắt tóc)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [checkedOutItems, setCheckedOutItems] = useState([]);
  const [checkedOutTotal, setCheckedOutTotal] = useState(0);

  const services = spaServices[activeTab] || [];
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Chọn/Bỏ chọn nhanh dịch vụ
  const handleSelectService = (service) => {
    const isInCart = cart.some(item => item.id === service.id);
    if (isInCart) {
      removeFromCart(service.id);
    } else {
      addToCart(service);
    }
  };

  // Xác nhận đơn hàng (Chống double-tap click đúp bằng cờ isCheckingOut của store)
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    // Lưu tạm thông tin giỏ hàng trước khi bị xóa để hiển thị hóa đơn thành công
    setCheckedOutItems([...cart]);
    setCheckedOutTotal(totalPrice);
    
    const result = await checkout();
    if (result.success) {
      setIsDrawerOpen(false);
      setShowSuccessModal(true);
    }
  };

  return (
    <EmployeeLayout>
      <div className="flex flex-col gap-4">
        
        {/* 1. HAI TAB LỚN DỄ BẤM BẰNG NGÓN CÁI (Sticky đầu ngón tay) */}
        <div className="grid grid-cols-2 gap-3 bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-luxury-gold/15 shadow-sm sticky top-[57px] z-20">
          <button
            onClick={() => setActiveTab('massage')}
            className={`
              py-3 rounded-xl font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 focus:outline-none
              ${activeTab === 'massage'
                ? 'bg-luxury-emerald text-luxury-sand shadow-premium glow-emerald'
                : 'text-luxury-emerald/60 hover:bg-luxury-gold/5'
              }
            `}
          >
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            Trị Liệu Body
          </button>
          
          <button
            onClick={() => setActiveTab('hair')}
            className={`
              py-3 rounded-xl font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 focus:outline-none
              ${activeTab === 'hair'
                ? 'bg-luxury-emerald text-luxury-sand shadow-premium glow-emerald'
                : 'text-luxury-emerald/60 hover:bg-luxury-gold/5'
              }
            `}
          >
            ✂️ Stylist Tóc
          </button>
        </div>

        {/* 2. DANH SÁCH GÓI DỊCH VỤ DẠNG CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
          {services.map((item) => {
            const isInCart = cart.some(cartItem => cartItem.id === item.id);
            
            return (
              <div 
                key={item.id}
                className={`
                  bg-white/80 backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-sm
                  ${isInCart 
                    ? 'border-luxury-gold ring-1 ring-luxury-gold bg-luxury-gold/5 shadow-premium' 
                    : 'border-luxury-gold/15'
                  }
                `}
              >
                {/* Ảnh dịch vụ và Thời gian làm việc */}
                <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Badge thời lượng */}
                  <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-luxury-sand text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                    <Clock className="w-3 h-3 text-luxury-gold" />
                    {item.duration}
                  </span>
                  
                  {/* Tích xanh đã chọn sang xịn */}
                  {isInCart && (
                    <div className="absolute top-2.5 left-2.5 bg-luxury-emerald text-luxury-sand p-1 rounded-full shadow-emerald animate-bounce">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Tiêu đề, mô tả và hành động chọn */}
                <div className="p-3.5 flex flex-col gap-2.5 flex-grow justify-between">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-sans font-bold text-[13px] text-luxury-emerald leading-tight">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed font-normal">{item.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1 gap-2 pt-2 border-t border-luxury-gold/10">
                    <span className="text-xs font-black text-luxury-gold">
                      {formatCurrency(item.price)}
                    </span>
                    
                    <button
                      onClick={() => handleSelectService(item)}
                      className={`
                        px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 flex items-center gap-1 active:scale-95
                        ${isInCart 
                          ? 'bg-luxury-emerald text-luxury-sand hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 border border-luxury-emerald' 
                          : 'bg-luxury-gold text-luxury-emerald hover:bg-luxury-gold/90'
                        }
                      `}
                    >
                      {isInCart ? (
                        <>
                          <Check className="w-3 h-3" /> Đã chọn
                        </>
                      ) : (
                        'Chọn gói'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. THANH DỰ KIẾN CHI PHÍ CỐ ĐỊNH PHÍA DƯỚI (Mobile Sticky Bottom Bar) */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 border-t border-luxury-gold/25 shadow-2xl p-3 flex items-center justify-between max-w-md mx-auto rounded-t-2xl backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            {/* Nút giỏ hàng có Badge số lượng nổi bật */}
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2.5 bg-luxury-emerald text-luxury-sand rounded-xl shadow-emerald active:scale-95 transition-transform"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-luxury-gold text-luxury-emerald font-sans font-black text-[9px] w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm animate-pulse">
                {totalItems}
              </span>
            </button>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold text-slate/40 tracking-wider">Tổng cần thanh toán</span>
              <span className="text-[15px] font-black text-luxury-emerald">{formatCurrency(totalPrice)}</span>
            </div>
          </div>
          
          <Button
            onClick={handleCheckout}
            isLoading={isCheckingOut}
            className="px-4 py-2.5 text-xs font-extrabold rounded-lg shadow-sm"
            variant="primary"
          >
            Xác nhận đơn
          </Button>
        </div>
      )}

      {/* 4. DRAWER SLIDE-UP XEM CHI TIẾT ĐƠN HÀNG (Dành cho Mobile khi bấm vào Icon Giỏ hàng) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-end justify-center">
          <div className="bg-luxury-cream w-full max-w-md rounded-t-2xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[80vh]">
            
            {/* Header Drawer */}
            <div className="bg-luxury-emerald text-luxury-sand p-3.5 flex items-center justify-between border-b border-luxury-gold/15">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4.5 h-4.5 text-luxury-gold" />
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider">Chi tiết đơn dịch vụ</h3>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-luxury-sand transition-all focus:outline-none"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Danh sách các gói đã chọn trong giỏ */}
            <div className="p-3.5 flex-grow overflow-y-auto flex flex-col gap-3">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-xl border border-luxury-gold/15 flex items-center justify-between gap-2.5 animate-fade-in shadow-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-10 h-10 rounded-lg object-cover border border-luxury-gold/10 flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-bold text-xs text-luxury-emerald truncate leading-tight">{item.name}</h4>
                      <span className="text-[9px] text-slate-400 font-bold mt-1 inline-flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5 text-luxury-gold" /> {item.duration}
                      </span>
                      <span className="text-[10px] font-black text-luxury-gold mt-0.5">{formatCurrency(item.price)}</span>
                    </div>
                  </div>

                  {/* Nút cộng/trừ số lượng và nút xóa */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="flex items-center border border-luxury-gold/20 rounded-md overflow-hidden bg-luxury-cream text-[11px] font-bold">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-0.5 px-2 text-luxury-emerald hover:bg-luxury-gold/10 focus:outline-none"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-1.5 text-luxury-emerald">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-0.5 px-2 text-luxury-emerald hover:bg-luxury-gold/10 focus:outline-none"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                      title="Xóa dịch vụ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Khối thanh toán trong Drawer */}
            <div className="p-3.5 bg-white border-t border-luxury-gold/20 flex flex-col gap-3.5">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-luxury-emerald uppercase">Tổng thanh toán:</span>
                <span className="text-base font-black text-luxury-emerald tracking-wide">
                  {formatCurrency(totalPrice)}
                </span>
              </div>

              {/* Nút thanh toán chống double click */}
              <Button
                onClick={handleCheckout}
                isLoading={isCheckingOut}
                className="w-full py-2.5 text-xs font-bold shadow-sm"
                variant="primary"
              >
                Xác nhận thanh toán
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* 5. MODAL HÓA ĐƠN KHI THANH TOÁN THÀNH CÔNG */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xs rounded-2xl border border-luxury-gold/30 p-5 shadow-2xl relative overflow-hidden flex flex-col items-center">
            
            {/* Chấm tròn ngọc ngà nền */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-luxury-gold/10 rounded-full blur-xl pointer-events-none"></div>
            
            {/* Checkmark tròn xanh lá */}
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-3 shadow-inner">
              <CheckCircle2 className="w-7 h-7 animate-ping absolute opacity-30" />
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-[15px] font-serif font-black text-luxury-emerald text-center">HOÀN TẤT THÀNH CÔNG!</h3>
            <p className="text-[9px] font-bold text-slate/40 tracking-wider uppercase mt-1">Biên Lai Điện Tử Aura Spa</p>
            
            {/* Hóa đơn chi tiết */}
            <div className="w-full bg-luxury-cream border border-luxury-gold/15 rounded-xl p-3 my-4 flex flex-col gap-2">
              <span className="text-[8px] font-bold uppercase text-luxury-emerald/40 tracking-wider border-b border-luxury-gold/10 pb-1.5 block">Hóa đơn dịch vụ</span>
              <div className="flex flex-col gap-1.5 max-h-[120px] overflow-y-auto pr-0.5 text-[11px] font-semibold text-slate-700">
                {checkedOutItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between gap-3">
                    <span className="truncate flex-1">{item.name} <strong className="text-luxury-emerald">x{item.quantity}</strong></span>
                    <span className="font-extrabold text-luxury-emerald flex-shrink-0">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-baseline border-t border-luxury-gold/20 pt-2 mt-1">
                <span className="text-[9px] font-bold text-luxury-emerald uppercase">Tổng tiền:</span>
                <span className="text-sm font-black text-luxury-emerald">
                  {formatCurrency(checkedOutTotal)}
                </span>
              </div>
            </div>

            <Button 
              onClick={() => setShowSuccessModal(false)}
              variant="secondary"
              className="w-full text-xs py-2 rounded-lg"
            >
              Đóng & Tiếp tục khách mới
            </Button>
          </div>
        </div>
      )}

    </EmployeeLayout>
  );
};
