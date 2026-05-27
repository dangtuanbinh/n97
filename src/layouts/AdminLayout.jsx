import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { LayoutDashboard, Receipt, Users, LogOut, Menu, X } from 'lucide-react';

/**
 * Layout cho trang Admin, bao gồm Sidebar bên trái (co giãn linh hoạt trên di động)
 * và nội dung các Tab hiển thị bên phải.
 */
export const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const { user, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', name: 'Tổng quan', icon: LayoutDashboard },
    { id: 'details', name: 'Chi tiết giao dịch', icon: Receipt },
    { id: 'employees', name: 'Nhân viên', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-luxury-sand flex flex-col md:flex-row relative">
      
      {/* Mobile Top Header */}
      <header className="md:hidden bg-luxury-emerald text-luxury-sand p-4 flex items-center justify-between border-b border-luxury-gold/20 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg font-bold tracking-widest text-luxury-gold">AURA</span>
          <span className="text-[9px] bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30 px-2.5 py-0.5 rounded-full font-extrabold tracking-wider">ADMIN</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-luxury-sand hover:text-luxury-gold transition-colors focus:outline-none"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-luxury-emerald text-luxury-sand border-r border-luxury-gold/15 flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:h-screen
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col gap-7">
          {/* Logo Brand */}
          <div className="flex flex-col border-b border-luxury-gold/15 pb-5 text-center">
            <span className="font-serif text-2xl font-black tracking-widest text-luxury-gold">AURA</span>
            <span className="text-[10px] text-luxury-gold/60 tracking-wider font-bold mt-1 uppercase">Spa & Hair Salon</span>
          </div>

          {/* User Profile Badge */}
          <div className="flex items-center gap-3 bg-luxury-emerald-light/35 border border-luxury-gold/10 p-3 rounded-xl">
            <div className="w-9 h-9 rounded-full bg-luxury-gold flex items-center justify-center font-serif font-black text-luxury-emerald text-base shadow-inner">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-luxury-sand">{user?.name || 'Nguyệt Nguyễn'}</span>
              <span className="text-[9px] text-luxury-gold uppercase tracking-widest font-extrabold mt-0.5">Quản trị viên</span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false); // Đóng sidebar trên di động khi click chọn
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-luxury-gold to-luxury-gold/80 text-luxury-emerald shadow-premium' 
                      : 'text-luxury-sand/70 hover:text-luxury-gold hover:bg-luxury-emerald-light/20'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Nút Đăng xuất ở chân Sidebar */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs md:text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/10 transition-all mt-auto"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          Đăng xuất
        </button>
      </aside>

      {/* Màn mờ che khi mở sidebar di động */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Nội dung chính bên phải */}
      <main className="flex-1 p-5 md:p-8 md:h-screen md:overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
