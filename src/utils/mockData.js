// Dữ liệu giả lập cao cấp cho Spa & Hair Salon

// 1. Dữ liệu doanh số theo tháng (để vẽ biểu đồ Line Chart)
export const monthlyRevenueData = [
  { month: 'Tháng 1', revenue: 95000000, transactions: 380 },
  { month: 'Tháng 2', revenue: 110000000, transactions: 420 },
  { month: 'Tháng 3', revenue: 135000000, transactions: 510 },
  { month: 'Tháng 4', revenue: 120000000, transactions: 460 },
  { month: 'Tháng 5', revenue: 158000000, transactions: 620 },
  { month: 'Tháng 6', revenue: 175000000, transactions: 680 },
];

// Dữ liệu tỷ trọng loại dịch vụ (để vẽ biểu đồ Pie Chart)
export const serviceCategoryData = [
  { name: 'Xoa bóp Bấm huyệt', value: 98000000, percent: 56, color: '#0F2C23' }, // Emerald
  { name: 'Dịch vụ Cắt tóc', value: 77000000, percent: 44, color: '#C5A880' },   // Gold
];

// 2. Dữ liệu giao dịch chi tiết
export const transactionData = [
  {
    id: 'TX1009',
    serviceName: 'Massage Đá Nóng Tây Tạng & Trị Liệu Cổ Vai Gáy',
    date: '2026-05-27 11:30',
    providerName: 'Nguyễn Thị Hồng',
    price: 850000,
    notes: 'Khách yêu cầu lực mạnh, đá nóng vừa phải.'
  },
  {
    id: 'TX1008',
    serviceName: 'Nhuộm Phủ Bóng Keratin Nano & Cắt Tạo Kiểu',
    date: '2026-05-27 10:15',
    providerName: 'Trần Văn Hoàng',
    price: 1550000,
    notes: 'Màu nhuộm nâu lạnh hạt dẻ, dùng phục hồi Keratin bảo vệ tóc.'
  },
  {
    id: 'TX1007',
    serviceName: 'Trị Liệu Thụy Điển Thư Giãn',
    date: '2026-05-27 09:00',
    providerName: 'Lê Minh Anh',
    price: 680000,
    notes: 'Sử dụng tinh dầu sả chanh dịu nhẹ.'
  },
  {
    id: 'TX1006',
    serviceName: 'Gội Đầu Dưỡng Sinh & Chăm Sóc Da Mặt Thảo Dược',
    date: '2026-05-26 18:20',
    providerName: 'Phạm Thảo Linh',
    price: 350000,
    notes: 'Xông mặt thảo dược kết hợp đắp mặt nạ ngũ hoa.'
  },
  {
    id: 'TX1005',
    serviceName: 'Uốn Lạnh Phục Hồi Amino Acid',
    date: '2026-05-26 16:45',
    providerName: 'Trần Văn Hoàng',
    price: 1200000,
    notes: 'Uốn phồng chân tóc nhẹ nhàng kiểu Hàn Quốc.'
  },
  {
    id: 'TX1004',
    serviceName: 'Ngâm Chân Thảo Dược & Bấm Huyệt Chuyên Sâu',
    date: '2026-05-26 14:10',
    providerName: 'Lê Minh Anh',
    price: 450000,
    notes: 'Hỗ trợ lưu thông khí huyết trị liệu mất ngủ.'
  },
  {
    id: 'TX1003',
    serviceName: 'Cắt & Tạo Kiểu Cao Cấp (Barber Edition)',
    date: '2026-05-26 11:00',
    providerName: 'Trần Văn Hoàng',
    price: 250000,
    notes: 'Vuốt sáp pomade, cạo viền sắc nét.'
  },
  {
    id: 'TX1002',
    serviceName: 'Massage Đá Nóng Tây Tạng',
    date: '2026-05-25 15:30',
    providerName: 'Nguyễn Thị Hồng',
    price: 650000,
    notes: 'Khách đau mỏi thắt lưng.'
  },
  {
    id: 'TX1001',
    serviceName: 'Gội Đầu Dưỡng Sinh & Trị Liệu Cổ Vai Gáy',
    date: '2026-05-25 10:00',
    providerName: 'Phạm Thảo Linh',
    price: 550000,
    notes: 'Liệu trình 75 phút thảo dược chuẩn Đông Y.'
  }
];

// 3. Dữ liệu nhân viên chi tiết
export const employeeData = [
  {
    name: 'Nguyễn Thị Hồng',
    cccd: '038197001234',
    startDate: '2024-03-15',
    notes: 'Kỹ thuật viên Trị liệu Spa xuất sắc, 5 năm kinh nghiệm, kỹ năng bấm huyệt lực tốt.'
  },
  {
    name: 'Trần Văn Hoàng',
    cccd: '024194005678',
    startDate: '2024-06-01',
    notes: 'Stylist Tóc chính, chuyên gia uốn nhuộm phục hồi và tạo kiểu xu hướng Hàn Quốc.'
  },
  {
    name: 'Lê Minh Anh',
    cccd: '031198009876',
    startDate: '2025-01-10',
    notes: 'Kỹ thuật viên Massage body, đá nóng và chăm sóc foot reflexology chu đáo.'
  },
  {
    name: 'Phạm Thảo Linh',
    cccd: '035201004321',
    startDate: '2025-02-15',
    notes: 'Chuyên viên Gội đầu dưỡng sinh Đông Y, chăm sóc da mặt chuyên sâu, thái độ nhiệt tình.'
  }
];

// 4. Danh sách các gói dịch vụ phân theo Tab
export const spaServices = {
  massage: [
    {
      id: 'MSG-01',
      name: 'Trị Liệu Thụy Điển Thư Giãn',
      duration: '60 phút',
      price: 680000,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop',
      description: 'Liệu trình massage kết hợp tinh dầu cao cấp Thụy Điển giúp cơ thể xua tan mệt mỏi, tái tạo năng lượng hiệu quả.'
    },
    {
      id: 'MSG-02',
      name: 'Massage Đá Nóng Tây Tạng',
      duration: '75 phút',
      price: 850000,
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=600&auto=format&fit=crop',
      description: 'Sử dụng đá núi lửa bazan hấp nóng kết hợp bấm huyệt chuyên sâu giải độc tố, xoa dịu đau nhức cơ khớp xương.'
    },
    {
      id: 'MSG-03',
      name: 'Trị Liệu Cổ Vai Gáy Chuyên Sâu',
      duration: '45 phút',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92834909?q=80&w=600&auto=format&fit=crop',
      description: 'Tập trung bấm huyệt giải cơ cổ, vai, gáy bị xơ cứng thích hợp cho dân văn phòng nhức mỏi lâu ngày.'
    },
    {
      id: 'MSG-04',
      name: 'Foot Acupressure & Thảo Dược',
      duration: '60 phút',
      price: 380000,
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop',
      description: 'Ngâm chân thảo dược độc quyền Dao Đỏ kết hợp bấm huyệt lòng bàn chân kích hoạt lục phủ ngũ tạng lưu thông.'
    }
  ],
  hair: [
    {
      id: 'HAR-01',
      name: 'Cắt & Tạo Kiểu Cao Cấp Stylist',
      duration: '40 phút',
      price: 250000,
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop',
      description: 'Được tư vấn kiểu tóc phù hợp khuôn mặt, cắt tạo kiểu bởi Stylist giàu kinh nghiệm, gội massage nhẹ nhàng.'
    },
    {
      id: 'HAR-02',
      name: 'Gội Đầu Dưỡng Sinh Đông Y',
      duration: '60 phút',
      price: 350000,
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
      description: 'Liệu trình gội đầu bằng thảo dược tự nấu kết hợp massage mặt, đắp mặt nạ, bấm huyệt đầu cổ vai gáy giảm căng thẳng.'
    },
    {
      id: 'HAR-03',
      name: 'Uốn Lạnh Phục Hồi Amino Acid',
      duration: '120 phút',
      price: 1200000,
      image: 'https://images.unsplash.com/photo-1595894154568-095244723a41?q=80&w=600&auto=format&fit=crop',
      description: 'Uốn tạo sóng tự nhiên mềm mại với sản phẩm chứa Amino Acid cao cấp bảo vệ cấu trúc sợi tóc từ sâu bên trong.'
    },
    {
      id: 'HAR-04',
      name: 'Nhuộm Phủ Bóng Keratin Nano',
      duration: '90 phút',
      price: 1550000,
      image: 'https://images.unsplash.com/photo-1620331789556-993e897586a5?q=80&w=600&auto=format&fit=crop',
      description: 'Công nghệ hạt màu nano siêu nhỏ cho màu sắc rực rỡ bền màu, kết hợp hấp phủ bóng Keratin đem lại độ suôn mượt.'
    }
  ]
};
