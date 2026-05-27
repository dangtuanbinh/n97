import React from 'react';

/**
 * Layout cho trang đăng nhập, tạo không gian Spa huyền ảo, sang trọng.
 */
export const AuthLayout = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop')`,
      }}
    >
      {/* Vòng che mờ xanh ngọc lục bảo sâu đậm */}
      <div className="absolute inset-0 bg-gradient-to-tr from-luxury-emerald-dark/95 via-luxury-emerald/90 to-luxury-dark/95 z-0"></div>
      
      {/* Hộp nội dung trung tâm có hoạt ảnh mượt */}
      <div className="w-full max-w-md z-10 animate-gold-pulse relative">
        {children}
      </div>
    </div>
  );
};
