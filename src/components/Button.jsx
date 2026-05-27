import React from 'react';

/**
 * Component nút bấm dùng chung với giao diện luxury và cơ chế loading thông minh.
 */
export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'danger', 'outline'
  isLoading = false,
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-luxury-gold to-luxury-amber text-luxury-dark hover:brightness-105 active:scale-95 shadow-premium hover:shadow-premium-hover focus:ring-luxury-gold',
    secondary: 'bg-luxury-emerald text-luxury-sand hover:bg-luxury-emerald-light active:scale-95 shadow-emerald focus:ring-luxury-emerald',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-95 focus:ring-red-500',
    outline: 'border border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold/10 active:scale-95 focus:ring-luxury-gold'
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed transform-none active:scale-100 shadow-none filter-none' : ''}
        px-5 py-3 text-sm md:text-base font-semibold
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Đang xử lý...
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 mr-2" />}
          {children}
        </>
      )}
    </button>
  );
};
