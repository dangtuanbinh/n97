import React from 'react';

/**
 * Component ô nhập liệu dùng chung với thiết kế viền mờ và hiển thị lỗi trực quan.
 */
export const Input = ({
  label,
  type = 'text',
  id,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-luxury-emerald/70 dark:text-luxury-sand/70 tracking-wider uppercase font-sans">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-luxury-gold">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full px-4 py-3 rounded-xl border transition-all duration-300 text-sm md:text-base bg-white/60 focus:bg-white backdrop-blur-md
            ${Icon ? 'pl-11' : ''}
            ${error 
              ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:shadow-red-100/50' 
              : 'border-luxury-gold/30 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/50 focus:shadow-premium/20'
            }
            placeholder-slate-400 text-luxury-emerald focus:outline-none shadow-sm
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1 font-semibold">{error}</p>
      )}
    </div>
  );
};
