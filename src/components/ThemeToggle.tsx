import { useTheme } from '@/hooks/useTheme';
import Icons from './Icons';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThemeToggle({
  className = '',
  size = 'md',
}: ThemeToggleProps) {
  const { toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  };

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        bg-white dark:bg-gray-800 
        text-gray-600 dark:text-gray-300
        hover:bg-gray-100 dark:hover:bg-gray-700
        rounded-lg shadow-lg 
        transition-all duration-200
        border border-gray-200 dark:border-gray-600
        ${className}
      `}
      aria-label={`Alternar para tema ${isDark ? 'claro' : 'escuro'}`}
    >
      {isDark ? (
        <Icons.Sun className={iconSize[size]} />
      ) : (
        <Icons.Moon className={iconSize[size]} />
      )}
    </button>
  );
}
