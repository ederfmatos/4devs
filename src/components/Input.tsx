import { Icons, Text } from '@/components';
import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

type InputVariant = 'default' | 'success' | 'error' | 'warning';
type InputSize = 'sm' | 'md' | 'lg';
type InputIconPosition = 'left' | 'right' | 'none';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  variant?: InputVariant;
  size?: InputSize;
  icon?: keyof typeof Icons;
  iconPosition?: InputIconPosition;
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  required?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      icon,
      iconPosition = 'left',
      label,
      helperText,
      error,
      fullWidth = false,
      leftAddon,
      rightAddon,
      required = false,
      className = '',
      id,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400';

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    const variantClasses = {
      default:
        'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500',
      success:
        'border-green-300 dark:border-green-600 focus:border-green-500 focus:ring-green-500',
      error:
        'border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500',
      warning:
        'border-yellow-300 dark:border-yellow-600 focus:border-yellow-500 focus:ring-yellow-500',
    };

    const widthClasses = fullWidth ? 'w-full' : '';

    const IconComponent = icon ? Icons[icon] : null;

    const getIconSize = () => {
      switch (size) {
        case 'sm':
          return 'w-4 h-4';
        case 'lg':
          return 'w-6 h-6';
        default:
          return 'w-5 h-5';
      }
    };

    const getIconColor = () => {
      switch (variant) {
        case 'success':
          return 'text-green-500';
        case 'error':
          return 'text-red-500';
        case 'warning':
          return 'text-yellow-500';
        default:
          return 'text-gray-400 dark:text-gray-500';
      }
    };

    const inputClasses = [
      baseClasses,
      sizeClasses[size as keyof typeof sizeClasses],
      variantClasses[variant],
      widthClasses,
      leftAddon ? 'rounded-l-none' : '',
      rightAddon ? 'rounded-r-none' : '',
      icon && iconPosition === 'left' ? 'pl-10' : '',
      icon && iconPosition === 'right' ? 'pr-10' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const renderIcon = () => {
      if (!IconComponent || iconPosition === 'none') return null;

      return (
        <div
          className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0' : 'right-0'} flex items-center ${iconPosition === 'left' ? 'pl-3' : 'pr-3'}`}
        >
          <IconComponent className={`${getIconSize()} ${getIconColor()}`} />
        </div>
      );
    };

    const renderInput = () => (
      <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
        {renderIcon()}
        <input ref={ref} id={inputId} className={inputClasses} {...props} />
      </div>
    );

    const renderInputWithAddons = () => (
      <div className={`flex ${fullWidth ? 'w-full' : ''}`}>
        {leftAddon && (
          <div className='inline-flex items-center px-3 py-2 text-sm border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-l-lg'>
            {leftAddon}
          </div>
        )}
        {renderInput()}
        {rightAddon && (
          <div className='inline-flex items-center px-3 py-2 text-sm border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-r-lg'>
            {rightAddon}
          </div>
        )}
      </div>
    );

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={inputId}
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'
          >
            {label}
            {required && <span className='text-red-500 ml-1'>*</span>}
          </label>
        )}

        {leftAddon || rightAddon ? renderInputWithAddons() : renderInput()}

        {error && (
          <Text
            variant='body-sm'
            color='error'
            className='mt-1 flex items-center gap-1'
          >
            <Icons.AlertCircle className='w-4 h-4' />
            {error}
          </Text>
        )}

        {helperText && !error && (
          <Text variant='body-sm' color='muted' className='mt-1'>
            {helperText}
          </Text>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
