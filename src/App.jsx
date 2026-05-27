import React, { useEffect, useState } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { EmployeeDashboard } from './pages/EmployeeDashboard';

/**
 * Component chính của ứng dụng App.jsx.
 * Triển khai Bộ định tuyến (Client-side Router) gọn nhẹ, đáng tin cậy tích hợp Route Guard bảo mật tuyệt đối.
 */
export default function App() {
  const { isAuthenticated, role, initializeSession } = useAuthStore();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Khôi phục phiên làm việc (Session) từ localStorage khi ứng dụng khởi chạy lần đầu
  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  // Theo dõi sự kiện thay đổi lịch sử trình duyệt (URL thay đổi) để đồng bộ view
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Hàm tiện ích hỗ trợ chuyển hướng lịch sử trình duyệt mượt mà
  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Route Guard - Bảo vệ định tuyến chặt chẽ phân biệt vai trò (Role-based security)
  useEffect(() => {
    if (!isAuthenticated) {
      // Nếu chưa đăng nhập, bắt buộc quay về trang Login
      if (currentPath !== '/login') {
        navigateTo('/login');
      }
    } else {
      // Đã đăng nhập -> phân quyền chi tiết
      if (role === 'admin') {
        // Admin chỉ được truy cập màn hình quản trị /admin
        if (currentPath !== '/admin') {
          navigateTo('/admin');
        }
      } else if (role === 'employee') {
        // Nhân viên chỉ được truy cập màn hình nghiệp vụ /employee
        if (currentPath !== '/employee') {
          navigateTo('/employee');
        }
      }
    }
  }, [isAuthenticated, role, currentPath]);

  // Bộ điều hướng kết xuất (Router switch)
  const renderContent = () => {
    if (!isAuthenticated) {
      return <Login />;
    }

    if (role === 'admin') {
      return <AdminDashboard />;
    }

    if (role === 'employee') {
      return <EmployeeDashboard />;
    }

    // Màn hình chờ chuyển giao diện sang trọng
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-emerald text-luxury-sand">
        <div className="flex flex-col items-center gap-4.5">
          <svg className="animate-spin h-9 w-9 text-luxury-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="font-serif text-sm tracking-widest animate-pulse uppercase text-luxury-gold font-bold">N97 Spa loading...</span>
        </div>
      </div>
    );
  };

  return <>{renderContent()}</>;
}
