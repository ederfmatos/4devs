import { useState } from 'react';
import type { CopyToClipboardButtonProps } from '@/types';
import Icons from '@/components/Icons';

const CopyToClipboardButton = ({
  text,
  onCopy,
  onError,
  className = '',
  size = 'md',
  variant = 'default',
  children,
  showFeedback = true,
  feedbackMessage = 'Copiado!',
  errorMessage = 'Erro ao copiar',
}: CopyToClipboardButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      onCopy?.();

      if (showFeedback) {
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-sm';
      case 'lg':
        return 'px-4 py-2 text-lg';
      default:
        return 'px-3 py-2 text-base';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100';
      case 'outline':
        return 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
    }
  };

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

  return (
    <>
      <button
        onClick={handleCopy}
        disabled={isLoading || !text.trim()}
        className={`
                    ${getSizeClasses()}
                    ${getVariantClasses()}
                    rounded-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
                    ${className}
                `}
      >
        {isLoading ? (
          <Icons.RefreshCw className={`${getIconSize()} animate-spin`} />
        ) : isCopied ? (
          <Icons.CheckCircle className={getIconSize()} />
        ) : (
          <Icons.Copy className={getIconSize()} />
        )}
        {children || (isCopied ? 'Copiado!' : 'Copiar')}
      </button>

      {showFeedback && isCopied && (
        <div className='fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 z-50'>
          {feedbackMessage}
        </div>
      )}
    </>
  );
};

export default CopyToClipboardButton;
