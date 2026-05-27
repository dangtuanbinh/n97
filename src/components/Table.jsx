import React from 'react';

/**
 * Component Bảng dữ liệu dùng chung với thiết kế cao cấp, thích ứng tốt trên di động.
 */
export const Table = ({ headers, children, className = '' }) => {
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-luxury-gold/15 shadow-premium bg-white/50 backdrop-blur-md ${className}`}>
      <table className="w-full text-left border-collapse min-w-[650px]">
        <thead>
          <tr className="bg-luxury-emerald text-luxury-sand uppercase text-[10px] md:text-[11px] font-extrabold tracking-widest border-b border-luxury-gold/20">
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4.5 font-sans">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-luxury-gold/10 text-xs md:text-sm text-slate-600 font-medium">
          {children}
        </tbody>
      </table>
    </div>
  );
};
