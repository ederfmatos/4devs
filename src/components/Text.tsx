import { ReactNode, HTMLAttributes } from 'react';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body-sm'
  | 'body-lg'
  | 'caption'
  | 'label'
  | 'muted'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

type TextColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'white';

type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: TextColor;
  weight?: TextWeight;
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';
  className?: string;
}

const Text = ({
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  children,
  as,
  className = '',
  ...props
}: TextProps) => {
  const getVariantClasses = (): string => {
    const baseClasses = 'transition-colors duration-200';

    const variantClasses = {
      h1: 'text-4xl font-bold',
      h2: 'text-2xl font-bold',
      h3: 'text-xl font-semibold',
      h4: 'text-lg font-semibold',
      h5: 'text-base font-semibold',
      h6: 'text-sm font-semibold',
      body: 'text-base',
      'body-sm': 'text-sm',
      'body-lg': 'text-lg',
      caption: 'text-xs',
      label: 'text-sm font-medium',
      muted: 'text-sm',
      success: 'text-sm',
      error: 'text-sm',
      warning: 'text-sm',
      info: 'text-sm',
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  };

  const getColorClasses = (): string => {
    const colorClasses = {
      primary: 'text-gray-900 dark:text-white',
      secondary: 'text-gray-600 dark:text-gray-400',
      muted: 'text-gray-500 dark:text-gray-400',
      success: 'text-green-700 dark:text-green-300',
      error: 'text-red-600 dark:text-red-400',
      warning: 'text-yellow-700 dark:text-yellow-300',
      info: 'text-blue-700 dark:text-blue-300',
      white: 'text-white',
    };

    return colorClasses[color];
  };

  const getWeightClasses = (): string => {
    const weightClasses = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    return weightClasses[weight];
  };

  const getElement = ():
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'div'
    | 'label' => {
    if (as) return as;

    if (variant.startsWith('h')) {
      return variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    }

    if (variant === 'label') return 'label';

    return 'span';
  };

  const Element = getElement();
  const classes = [
    getVariantClasses(),
    getColorClasses(),
    getWeightClasses(),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Element className={classes} {...props}>
      {children}
    </Element>
  );
};

export default Text;
