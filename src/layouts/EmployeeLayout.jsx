import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, User } from 'lucide-react';

/**
 * Layout cho màn hình Nhân viên, tối ưu hóa Mobile-First cho iPhone dọc.
 */
export const EmployeeLayout = ({ children }) => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-luxury-cream text-slate flex flex-col">
      
      {/* Thanh Header Cố định cao cấp */}
      <header className="bg-luxury-emerald text-luxury-sand px-4 py-3 flex items-center justify-between border-b border-luxury-gold/25 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-luxury-gold flex items-center justify-center font-bold text-luxury-emerald shadow-inner">
            <User className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-luxury-gold/80 font-bold uppercase tracking-wider leading-tight">Nhân Viên Trực</span>
            <span className="text-xs font-bold text-luxury-sand leading-none">{user?.name || 'KTV Nguyễn Thị Hồng'}</span>
          </div>
        </div>
        
        {/* Tên thương hiệu Spa */}
        <div className="font-serif font-black text-sm tracking-widest text-luxury-gold">
          AURA SPA
        </div>

        {/* Nút đăng xuất nhanh đầu ngón cái */}
        <button
          onClick={logout}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-luxury-gold/15 text-luxury-gold hover:bg-luxury-gold/20 text-[10px] font-bold transition-all border border-luxury-gold/20"
        >
          <LogOut className="w-3 h-3" />
          Đăng xuất
        </button>
      </header>

      {/* Vùng nội dung chính */}
      <main className="flex-1 w-full max-w-lg mx-auto flex flex-col pb-20 p-4">
        {children}
      </main>
    </div>
  );
};
