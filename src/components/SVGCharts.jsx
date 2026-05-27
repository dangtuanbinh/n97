import React, { useState } from 'react';

// Tiện ích format tiền Việt Nam đồng bộ
const formatCurrency = (val) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
};

/**
 * Biểu đồ Đường (Line Chart) vẽ bằng SVG thuần.
 * Có tương tác rê chuột hiển thị Tooltip động, đường dóng, và điểm sáng nổi bật.
 */
export const SVGLineChart = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  
  if (!data || data.length === 0) return null;

  // Cấu hình kích thước biểu đồ
  const width = 600;
  const height = 280;
  const paddingLeft = 70;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 45;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  
  // Tìm doanh thu lớn nhất để lập thang đo (Y-Axis Scale)
  const revenues = data.map(d => d.revenue);
  const maxRevenue = Math.max(...revenues) * 1.1; // Thêm 10% biên trên cho thoáng
  const minRevenue = 0;
  
  // Tính tọa độ grid Y (5 nấc)
  const gridCount = 5;
  const gridIntervals = Array.from({ length: gridCount }, (_, i) => {
    return minRevenue + (maxRevenue - minRevenue) * (i / (gridCount - 1));
  });
  
  // Tính toán tọa độ (X, Y) của từng điểm dữ liệu
  const points = data.map((d, index) => {
    const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((d.revenue - minRevenue) / (maxRevenue - minRevenue)) * chartHeight;
    return { x, y, ...d, index };
  });
  
  // Tạo chuỗi vẽ đường dẫn Line Path (M: Start, L: Line to)
  const linePath = points.reduce((path, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
  }, "");
  
  // Tạo chuỗi vẽ vùng đổ màu bên dưới Line Path (Area Path)
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`
    : "";

  return (
    <div className="relative w-full overflow-hidden bg-white/60 backdrop-blur-md rounded-2xl border border-luxury-gold/15 p-5 shadow-premium">
      <h3 className="text-sm font-bold text-luxury-emerald tracking-wider uppercase mb-4 font-sans flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-luxury-gold animate-ping"></span>
        Biểu đồ biến động doanh thu (6 Tháng đầu năm)
      </h3>
      
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} className="overflow-visible min-w-[500px]">
          <defs>
            {/* Gradient vàng kim đổ vùng phủ bên dưới */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C5A880" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#C5A880" stopOpacity="0.01" />
            </linearGradient>
            
            {/* Bộ lọc bóng đổ giúp đường vẽ nổi bật lung linh */}
            <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#C5A880" floodOpacity="0.25"/>
            </filter>
          </defs>
          
          {/* 1. Lưới ngang Gridlines & Nhãn trục Y */}
          {gridIntervals.map((val, i) => {
            const y = paddingTop + chartHeight - (i / (gridCount - 1)) * chartHeight;
            return (
              <g key={i}>
                <line 
                  x1={paddingLeft} 
                  y1={y} 
                  x2={width - paddingRight} 
                  y2={y} 
                  stroke="#E5E7EB" 
                  strokeWidth="0.75" 
                  strokeDasharray="4 3"
                />
                <text 
                  x={paddingLeft - 10} 
                  y={y + 4} 
                  textAnchor="end" 
                  className="text-[10px] font-bold text-slate/40 fill-current font-sans"
                >
                  {i === 0 ? "0" : `${(val / 1000000).toFixed(0)} Tr`}
                </text>
              </g>
            );
          })}
          
          {/* 2. Vẽ vùng Gradient bóng đổ dưới đường */}
          <path d={areaPath} fill="url(#areaGradient)" />
          
          {/* 3. Vẽ đường biểu diễn doanh thu chính */}
          <path 
            d={linePath} 
            fill="none" 
            stroke="#C5A880" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#lineGlow)"
          />
          
          {/* 4. Nhãn trục X (Các tháng) */}
          {points.map((p, i) => (
            <text 
              key={i} 
              x={p.x} 
              y={height - paddingBottom + 18} 
              textAnchor="middle" 
              className="text-[11px] font-bold text-slate/50 fill-current font-sans"
            >
              {p.month}
            </text>
          ))}
          
          {/* 5. Đường dóng đứng khi rê chuột */}
          {hoveredIdx !== null && (
            <line 
              x1={points[hoveredIdx].x} 
              y1={paddingTop} 
              x2={points[hoveredIdx].x} 
              y2={paddingTop + chartHeight} 
              stroke="#C5A880" 
              strokeWidth="1.25" 
              strokeDasharray="3 3"
            />
          )}
          
          {/* 6. Các điểm chấm dữ liệu tròn (Data Nodes) */}
          {points.map((p, i) => (
            <g key={i}>
              {/* Khối tròn ẩn to để bắt sự kiện hover cực nhạy */}
              <circle 
                cx={p.x} 
                cy={p.y} 
                r="16" 
                fill="transparent" 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              {/* Khối tròn hiển thị nhỏ xinh động */}
              <circle 
                cx={p.x} 
                cy={p.y} 
                r={hoveredIdx === i ? "6" : "4.5"} 
                fill={hoveredIdx === i ? "#D4AF37" : "#0F2C23"} 
                stroke="#C5A880" 
                strokeWidth={hoveredIdx === i ? "2.5" : "1.5"}
                className="transition-all duration-200 pointer-events-none"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Tooltip động hiển thị HTML sang xịn */}
      {hoveredIdx !== null && (
        <div 
          className="absolute z-10 glass-light glow-gold px-3 py-2 rounded-xl shadow-lg border border-luxury-gold/30 text-xs pointer-events-none transition-all duration-150"
          style={{ 
            left: `${Math.min(points[hoveredIdx].x - 10, width - 180)}px`,
            top: `${Math.max(points[hoveredIdx].y - 85, 10)}px`
          }}
        >
          <p className="font-bold text-luxury-emerald">{data[hoveredIdx].month}</p>
          <div className="flex justify-between gap-4 mt-0.5">
            <span className="text-slate-400">Doanh thu:</span>
            <span className="font-bold text-luxury-gold">{formatCurrency(data[hoveredIdx].revenue)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Giao dịch:</span>
            <span className="font-semibold text-luxury-emerald">{data[hoveredIdx].transactions} lượt</span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Biểu đồ Tròn Donut vẽ bằng SVG thuần.
 * Phân chia tỷ trọng giữa Spa và Hair Salon.
 */
export const SVGPieChart = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  
  if (!data || data.length === 0) return null;
  
  // Cấu hình vẽ vòng Donut khép kín bằng stroke-dasharray
  const size = 220;
  const center = size / 2;
  const radius = 65;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius; // 2 * 3.14159 * 65 ~ 408.4
  
  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/60 backdrop-blur-md rounded-2xl border border-luxury-gold/15 p-5 shadow-premium w-full h-full">
      {/* Vòng tròn Donut SVG */}
      <div className="relative w-[150px] h-[150px] flex-shrink-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90 w-full h-full overflow-visible">
          {/* Đường lót nền rỗng */}
          <circle 
            cx={center} 
            cy={center} 
            r={radius} 
            fill="transparent" 
            stroke="#FAF3EC" 
            strokeWidth={strokeWidth} 
          />
          {/* Vẽ các phân đoạn */}
          {data.map((item, idx) => {
            const strokeLength = (item.percent / 100) * circumference;
            const strokeOffset = circumference - (accumulatedPercent / 100) * circumference;
            accumulatedPercent += item.percent;
            
            const isHovered = hoveredIdx === idx;
            
            return (
              <circle
                key={idx}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${strokeLength} ${circumference}`}
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  filter: isHovered ? 'drop-shadow(0px 0px 6px rgba(197, 168, 128, 0.4))' : 'none'
                }}
              />
            );
          })}
        </svg>
        
        {/* Nhãn trung tâm Donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-extrabold text-luxury-emerald">100%</span>
          <span className="text-[9px] uppercase font-bold tracking-wider text-slate/40">Dịch vụ</span>
        </div>
      </div>

      {/* Chú giải thông tin biểu đồ */}
      <div className="flex flex-col gap-2.5 flex-1 w-full">
        <h3 className="text-xs font-bold text-luxury-emerald/60 uppercase tracking-wider font-sans">
          Tỷ trọng danh mục
        </h3>
        <div className="flex flex-col gap-2">
          {data.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div 
                key={idx}
                className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  isHovered ? 'bg-luxury-gold/10 border-luxury-gold/30 shadow-sm' : 'bg-transparent border-transparent'
                }`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-md flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">{item.name}</span>
                    <span className="text-[10px] font-bold text-luxury-gold uppercase">{item.percent}% sản lượng</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-luxury-emerald">
                  {formatCurrency(item.value)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
