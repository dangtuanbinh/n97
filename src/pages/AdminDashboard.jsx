import React, { useState } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { SVGLineChart, SVGPieChart } from '../components/SVGCharts';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { 
  monthlyRevenueData, 
  serviceCategoryData, 
  transactionData, 
  employeeData 
} from '../utils/mockData';
import { exportTransactionsToCSV } from '../utils/exportExcel';
import { DollarSign, RefreshCw, Calendar, Users, TrendingUp, Download, CheckCircle } from 'lucide-react';

// Định dạng tiền tệ VND chuyên nghiệp
const formatCurrency = (val) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
};

/**
 * Trang Admin Dashboard chính.
 * Cho phép chuyển đổi linh hoạt qua 3 Tab: Tổng quan, Chi tiết, Nhân viên.
 */
export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);

  // Tính toán nhanh số liệu dựa trên mockData thực tế
  const totalRevenue = transactionData.reduce((sum, tx) => sum + tx.price, 0);
  const totalTransactions = transactionData.length;
  const totalEmployees = employeeData.length;

  // Thực hiện tải file CSV báo cáo giao dịch (Chống bấm liên tục bằng Loading)
  const handleExport = async () => {
    setIsExporting(true);
    
    // Giả lập thời gian chuẩn bị file ngắn 800ms
    await new Promise((resolve) => setTimeout(resolve, 800));
    exportTransactionsToCSV(transactionData);
    
    setIsExporting(false);
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      
      {/* ----------------- TAB 1: TỔNG QUAN ----------------- */}
      {activeTab === 'overview' && (
        <div className="flex flex-col gap-6 animate-fade-in">
          
          {/* Tiêu đề Tab */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-black text-luxury-emerald uppercase tracking-wide">Tổng quan kinh doanh</h2>
            <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest mt-1">Dữ liệu hiệu suất Aura Spa cập nhật tức thời</p>
          </div>

          {/* Hộp chỉ số nhanh (Metrics Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {/* Card 1: Tổng doanh thu */}
            <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-luxury-gold/15 p-4.5 shadow-premium flex items-center justify-between hover:shadow-premium-hover transition-all duration-300">
              <div className="flex flex-col">
                <span className="text-[9px] font-extrabold uppercase text-slate/40 tracking-wider">Doanh thu hiện tại</span>
                <span className="text-lg md:text-xl font-extrabold text-luxury-emerald mt-1">{formatCurrency(totalRevenue)}</span>
                <span className="text-[10px] text-green-600 font-bold flex items-center gap-0.5 mt-2">
                  <TrendingUp className="w-3 h-3" /> +15.2% so với tháng trước
                </span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                <DollarSign className="w-5.5 h-5.5" />
              </div>
            </div>

            {/* Card 2: Lượt giao dịch */}
            <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-luxury-gold/15 p-4.5 shadow-premium flex items-center justify-between hover:shadow-premium-hover transition-all duration-300">
              <div className="flex flex-col">
                <span className="text-[9px] font-extrabold uppercase text-slate/40 tracking-wider">Lượt phục vụ</span>
                <span className="text-lg md:text-xl font-extrabold text-luxury-emerald mt-1">{totalTransactions} giao dịch</span>
                <span className="text-[10px] text-green-600 font-bold flex items-center gap-0.5 mt-2">
                  <TrendingUp className="w-3 h-3" /> +6.8% tuần này
                </span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-luxury-emerald/10 border border-luxury-emerald/20 flex items-center justify-center text-luxury-emerald">
                <RefreshCw className="w-5 h-5" />
              </div>
            </div>

            {/* Card 3: Số nhân sự */}
            <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-luxury-gold/15 p-4.5 shadow-premium flex items-center justify-between hover:shadow-premium-hover transition-all duration-300">
              <div className="flex flex-col">
                <span className="text-[9px] font-extrabold uppercase text-slate/40 tracking-wider">Nhân viên chi nhánh</span>
                <span className="text-lg md:text-xl font-extrabold text-luxury-emerald mt-1">{totalEmployees} nhân sự</span>
                <span className="text-[10px] text-luxury-gold font-bold flex items-center gap-1 mt-2">
                  <CheckCircle className="w-3 h-3" /> 100% đang trực sẵn sàng
                </span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                <Users className="w-5 h-5" />
              </div>
            </div>

            {/* Card 4: Kế hoạch Tháng 6 */}
            <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-luxury-gold/15 p-4.5 shadow-premium flex items-center justify-between hover:shadow-premium-hover transition-all duration-300">
              <div className="flex flex-col">
                <span className="text-[9px] font-extrabold uppercase text-slate/40 tracking-wider">Mục tiêu quý</span>
                <span className="text-lg md:text-xl font-extrabold text-luxury-emerald mt-1">{formatCurrency(175000000)}</span>
                <span className="text-[10px] text-slate/50 font-bold flex items-center gap-0.5 mt-2">
                  <Calendar className="w-3 h-3" /> Dự kiến Tháng 6
                </span>
              </div>
              <div className="w-11 h-11 rounded-xl bg-luxury-emerald/10 border border-luxury-emerald/20 flex items-center justify-center text-luxury-emerald">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Grid hiển thị 2 Biểu đồ SVG thông minh */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            <div className="lg:col-span-2">
              <SVGLineChart data={monthlyRevenueData} />
            </div>
            <div>
              <SVGPieChart data={serviceCategoryData} />
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB 2: CHI TIẾT ----------------- */}
      {activeTab === 'details' && (
        <div className="flex flex-col gap-5 animate-fade-in">
          
          {/* Header Tab */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-black text-luxury-emerald uppercase tracking-wide">Chi tiết hóa đơn</h2>
              <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest mt-1">Danh sách toàn bộ các giao dịch thực hiện thành công</p>
            </div>
            
            <Button
              onClick={handleExport}
              isLoading={isExporting}
              icon={Download}
              variant="primary"
              className="sm:self-end"
            >
              Xuất file Excel
            </Button>
          </div>

          {/* Tổng cộng doanh thu nổi bật trên bảng */}
          <div className="bg-gradient-to-r from-luxury-emerald to-luxury-emerald-light text-luxury-sand p-5 md:p-6 rounded-2xl border border-luxury-gold/25 shadow-emerald flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-extrabold uppercase text-luxury-gold tracking-widest leading-none">Tổng cộng doanh thu thực nhận</span>
              <span className="text-2xl md:text-3xl font-serif font-black text-luxury-gold mt-2">
                {formatCurrency(totalRevenue)}
              </span>
            </div>
            <div className="text-[11px] text-luxury-sand/80 font-bold bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 self-start sm:self-auto">
              Sản lượng: <strong className="text-luxury-gold font-extrabold">{totalTransactions} giao dịch thành công</strong>
            </div>
          </div>

          {/* Bảng Chi tiết Giao dịch */}
          <Table headers={['STT', 'Mã GD', 'Tên Gói Dịch Vụ', 'Ngày Thực Hiện', 'Nhân Viên Thực Hiện', 'Giá Tiền', 'Ghi Chú']}>
            {transactionData.map((tx, idx) => (
              <tr key={tx.id} className="hover:bg-luxury-gold/5 transition-colors">
                <td className="px-6 py-4 font-bold text-slate/40">{idx + 1}</td>
                <td className="px-6 py-4 font-bold text-luxury-emerald font-mono text-[13px]">{tx.id}</td>
                <td className="px-6 py-4 font-bold text-slate-700 max-w-[200px] truncate">{tx.serviceName}</td>
                <td className="px-6 py-4 font-semibold text-slate-400 text-xs">{tx.date}</td>
                <td className="px-6 py-4 font-extrabold text-luxury-emerald">{tx.providerName}</td>
                <td className="px-6 py-4 font-extrabold text-luxury-emerald">{formatCurrency(tx.price)}</td>
                <td className="px-6 py-4 text-xs text-slate-400 italic font-normal max-w-[150px] truncate" title={tx.notes}>
                  {tx.notes || '—'}
                </td>
              </tr>
            ))}
          </Table>
        </div>
      )}

      {/* ----------------- TAB 3: NHÂN VIÊN ----------------- */}
      {activeTab === 'employees' && (
        <div className="flex flex-col gap-5 animate-fade-in">
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-black text-luxury-emerald uppercase tracking-wide">Hồ sơ kỹ thuật viên</h2>
            <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest mt-1">Thông tin nhân sự trực thuộc chi nhánh hiện tại</p>
          </div>

          {/* Bảng Nhân viên */}
          <Table headers={['Họ và Tên', 'Số CCCD', 'Ngày Bắt Đầu', 'Chuyên môn & Ghi chú nghiệp vụ']}>
            {employeeData.map((emp, idx) => (
              <tr key={idx} className="hover:bg-luxury-gold/5 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8.5 h-8.5 rounded-full bg-luxury-gold/15 border border-luxury-gold/25 text-luxury-gold flex items-center justify-center font-bold text-xs shadow-inner">
                      {emp.name.split(' ').pop()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700 text-sm leading-tight">{emp.name}</span>
                      <span className="text-[9px] uppercase font-bold text-green-600 tracking-wider mt-0.5 flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-ping"></span> Đang trực
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 font-bold text-slate-500 font-mono tracking-wider text-xs">{emp.cccd}</td>
                <td className="px-6 py-5 font-semibold text-slate-400 text-xs">{emp.startDate}</td>
                <td className="px-6 py-5 text-xs text-slate-500 leading-relaxed font-normal max-w-sm">
                  {emp.notes}
                </td>
              </tr>
            ))}
          </Table>
        </div>
      )}

    </AdminLayout>
  );
};
