import { ReactNode, ButtonHTMLAttributes } from 'react'
import { Icons } from '@/components/Icons'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonIconPosition = 'left' | 'right' | 'none'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    size?: ButtonSize
    icon?: keyof typeof Icons
    iconPosition?: ButtonIconPosition
    loading?: boolean
    children?: ReactNode
    fullWidth?: boolean
}

const Button = ({
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    children,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm gap-1.5',
        md: 'px-4 py-2 text-base gap-2',
        lg: 'px-6 py-3 text-lg gap-2.5'
    }

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
        success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:ring-gray-500',
        outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-500'
    }

    const widthClasses = fullWidth ? 'w-full' : ''

    const IconComponent = icon ? Icons[icon] : null
    const LoadingIcon = Icons.RefreshCw

    const renderIcon = () => {
        if (loading) {
            return <LoadingIcon className={`${getIconSize()} animate-spin`} />
        }

        if (IconComponent && iconPosition !== 'none') {
            return <IconComponent className={getIconSize()} />
        }

        return null
    }

    const getIconSize = () => {
        switch (size) {
            case 'sm':
                return 'w-4 h-4'
            case 'lg':
                return 'w-6 h-6'
            default:
                return 'w-5 h-5'
        }
    }

    const classes = [
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        widthClasses,
        className
    ].filter(Boolean).join(' ')

    return (
        <button
            className={classes}
            disabled={disabled || loading}
            {...props}
        >
            {iconPosition === 'left' && renderIcon()}
            {children}
            {iconPosition === 'right' && renderIcon()}
        </button>
    )
}

export default Button 