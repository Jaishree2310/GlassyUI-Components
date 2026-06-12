import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  ariaControls?: string;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles: Record<string, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-500 text-white',
  danger: 'bg-red-500 hover:bg-red-600 focus:ring-red-500 text-white',
  success: 'bg-green-500 hover:bg-green-600 focus:ring-green-500 text-white',
  warning: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-white',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      children,
      fullWidth = false,
      className = '',
      ariaLabel,
      ariaPressed,
      ariaExpanded,
      ariaControls,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';
    const variantClass = variantStyles[variant] || variantStyles.primary;
    const sizeClass = sizeStyles[size] || sizeStyles.md;
    const widthClass = fullWidth ? 'w-full' : '';
    const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    const finalClassName = `${baseClasses} ${variantClass} ${sizeClass} ${widthClass} ${disabledClass} ${className}`.trim();

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={finalClassName}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span
              className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            />
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;
