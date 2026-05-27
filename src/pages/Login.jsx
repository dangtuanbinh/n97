import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { AuthLayout } from '../layouts/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { User, Lock, Sparkles } from 'lucide-react';

/**
 * Màn hình Đăng nhập (Login.jsx)
 * Thiết kế sang trọng, căn giữa, thích ứng mượt mà trên di động & máy tính.
 */
export const Login = () => {
  const { login, isLoading, error } = useAuthStore();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    // Kiểm tra tính hợp lệ ở client
    if (!username.trim()) {
      setValidationError('Vui lòng điền tài khoản đăng nhập!');
      return;
    }
    if (!password) {
      setValidationError('Vui lòng điền mật khẩu!');
      return;
    }
    if (password.length < 4) {
      setValidationError('Mật khẩu tối thiểu phải từ 4 ký tự!');
      return;
    }

    // Thực hiện đăng nhập bất đồng bộ (chống click đúp được tích hợp trong hàm login của store)
    await login(username.trim(), password);
  };

  return (
    <AuthLayout>
      <div className="bg-white/80 dark:bg-luxury-emerald-dark/85 backdrop-blur-lg border border-luxury-gold/25 p-7 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Điểm sáng tròn mờ luxury tạo chiều sâu nghệ thuật */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-luxury-gold/15 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-luxury-emerald/15 rounded-full blur-xl pointer-events-none"></div>
        
        {/* Header Thương hiệu */}
        <div className="flex flex-col items-center mb-6 relative">
          <div className="w-12 h-12 rounded-full bg-luxury-emerald text-luxury-gold flex items-center justify-center shadow-md mb-2.5">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-black text-luxury-emerald tracking-widest text-center">AURA</h1>
          <p className="text-[10px] uppercase font-extrabold tracking-widest text-luxury-gold mt-1">Spa & Hair Salon Portal</p>
        </div>

        {/* Biểu mẫu đăng nhập */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 relative">
          {/* Khối hiển thị thông báo lỗi */}
          {(validationError || error) && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs px-3.5 py-2.5 rounded-xl font-bold animate-pulse">
              {validationError || error}
            </div>
          )}

          <Input
            label="Tài khoản đăng nhập"
            id="username"
            placeholder="Tên đăng nhập..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={User}
            required
            disabled={isLoading}
          />

          <Input
            label="Mật khẩu"
            id="password"
            type="password"
            placeholder="Mật khẩu bảo mật..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            required
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full mt-2"
          >
            Đăng nhập hệ thống
          </Button>
        </form>

        {/* Khối gợi ý tài khoản demo */}
        <div className="mt-6 pt-5 border-t border-luxury-gold/15 text-center flex flex-col gap-1.5 pointer-events-none">
          <span className="text-[9px] font-extrabold uppercase text-luxury-emerald/40 tracking-wider">Tài khoản trình diễn (Demo)</span>
          <div className="flex flex-col gap-1 text-[10px] text-slate-500 font-bold">
            <div className="flex justify-between bg-luxury-gold/5 px-2.5 py-1.5 rounded-lg border border-luxury-gold/10">
              <span className="text-luxury-emerald/60">Admin:</span>
              <span className="font-mono text-luxury-gold">nguyet1997 / Vantaa@35</span>
            </div>
            <div className="flex justify-between bg-luxury-emerald-light/5 px-2.5 py-1.5 rounded-lg border border-luxury-gold/10">
              <span className="text-luxury-emerald/60">Nhân viên:</span>
              <span className="font-mono text-luxury-gold">nhanvien1 / 12345678</span>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
