import {
    SelectHTMLAttributes, forwardRef, useState, useRef, useEffect
} from 'react'
import { Icons } from '@/components/Icons'

type SelectVariant = 'default' | 'success' | 'error' | 'warning'
type SelectSize = 'sm' | 'md' | 'lg'
type SelectOption = {
    value: string | number
    label: string
    disabled?: boolean
}

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
    variant?: SelectVariant
    size?: SelectSize
    label?: string
    helperText?: string
    error?: string
    fullWidth?: boolean
    required?: boolean
    options: SelectOption[]
    placeholder?: string
    leftIcon?: keyof typeof Icons
    rightIcon?: keyof typeof Icons
    searchable?: boolean
    multiple?: boolean
    maxHeight?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    variant = 'default',
    size = 'md',
    label,
    helperText,
    error,
    fullWidth = false,
    required = false,
    options = [],
    placeholder = 'Selecione uma opção',
    leftIcon,
    rightIcon,
    searchable = false,
    multiple = false,
    maxHeight = '200px',
    className = '',
    id,
    value,
    onChange,
    disabled,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const baseClasses = 'border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-white'

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-4 py-3 text-lg'
    }

    const variantClasses = {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        success: 'border-green-300 focus:border-green-500 focus:ring-green-500',
        error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
        warning: 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500'
    }

    const widthClasses = fullWidth ? 'w-full' : ''

    const LeftIconComponent = leftIcon ? Icons[leftIcon] : null
    const RightIconComponent = rightIcon ? Icons[rightIcon] : null

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

    const getIconColor = () => {
        switch (variant) {
            case 'success':
                return 'text-green-500'
            case 'error':
                return 'text-red-500'
            case 'warning':
                return 'text-yellow-500'
            default:
                return 'text-gray-400'
        }
    }

    const selectClasses = [
        baseClasses,
        sizeClasses[size as keyof typeof sizeClasses],
        variantClasses[variant],
        widthClasses,
        leftIcon ? 'pl-10' : '',
        rightIcon ? 'pr-10' : '',
        className
    ].filter(Boolean).join(' ')

    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`

    const filteredOptions = searchable
        ? options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : options



    const handleOptionClick = (optionValue: string | number) => {
        if (multiple) {
            const newSelected = selectedOptions.includes(String(optionValue))
                ? selectedOptions.filter(v => v !== String(optionValue))
                : [...selectedOptions, String(optionValue)]
            setSelectedOptions(newSelected)

            // const event = {
            //     target: {
            //         value: newSelected,
            //         name: props.name
            //     }
            // } as React.ChangeEvent<HTMLSelectElement>

            // if (onChange) {
            //     onChange(event)
            // }
        } else {
            const event = {
                target: {
                    value: String(optionValue),
                    name: props.name
                }
            } as React.ChangeEvent<HTMLSelectElement>

            if (onChange) {
                onChange(event)
            }
            setIsOpen(false)
            setSearchTerm('')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(!isOpen)
            if (isOpen && searchable) {
                searchInputRef.current?.focus()
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false)
            setSearchTerm('')
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (!isOpen) {
                setIsOpen(true)
            } else {
                setFocusedIndex(prev =>
                    prev < filteredOptions.length - 1 ? prev + 1 : 0
                )
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setFocusedIndex(prev =>
                prev > 0 ? prev - 1 : filteredOptions.length - 1
            )
        }
    }

    const getDisplayValue = () => {
        if (multiple) {
            if (selectedOptions.length === 0) return placeholder
            if (selectedOptions.length === 1) {
                const option = options.find(opt => String(opt.value) === selectedOptions[0])
                return option?.label || placeholder
            }
            return `${selectedOptions.length} itens selecionados`
        }

        if (!value) return placeholder
        const option = options.find(opt => String(opt.value) === String(value))
        return option?.label || placeholder
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setSearchTerm('')
                setFocusedIndex(-1)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (isOpen && searchable) {
            searchInputRef.current?.focus()
        }
    }, [isOpen, searchable])

    return (
        <div className={`${fullWidth ? 'w-full' : ''}`}>
            {label && (
                <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div ref={containerRef} className="relative">
                {LeftIconComponent && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <LeftIconComponent className={`${getIconSize()} ${getIconColor()}`} />
                    </div>
                )}

                {RightIconComponent && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <RightIconComponent className={`${getIconSize()} ${getIconColor()}`} />
                    </div>
                )}

                <div
                    className={`${selectClasses} cursor-pointer flex items-center justify-between`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                >
                    <span className={`${!value && !selectedOptions.length ? 'text-gray-500' : 'text-gray-900'}`}>
                        {getDisplayValue()}
                    </span>
                    <Icons.ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {isOpen && (
                    <div
                        className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden"
                        style={{ maxHeight }}
                    >
                        {searchable && (
                            <div className="p-2 border-b border-gray-200">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar..."
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onKeyDown={(e) => {
                                        if (e.key === 'ArrowDown') {
                                            e.preventDefault()
                                            setFocusedIndex(0)
                                        }
                                    }}
                                />
                            </div>
                        )}

                        <div className="max-h-48 overflow-y-auto">
                            {filteredOptions.length === 0 ? (
                                <div className="px-4 py-2 text-sm text-gray-500">
                                    Nenhuma opção encontrada
                                </div>
                            ) : (
                                filteredOptions.map((option, index) => (
                                    <div
                                        key={option.value}
                                        className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ${index === focusedIndex ? 'bg-blue-50 text-blue-900' : 'hover:bg-gray-50'
                                            } ${multiple && selectedOptions.includes(String(option.value)) ? 'bg-blue-100 text-blue-900' : ''
                                            } ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        onClick={() => !option.disabled && handleOptionClick(option.value)}
                                        onMouseEnter={() => setFocusedIndex(index)}
                                    >
                                        {multiple && (
                                            <input
                                                type="checkbox"
                                                checked={selectedOptions.includes(String(option.value))}
                                                readOnly
                                                className="mr-2"
                                            />
                                        )}
                                        {option.label}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <Icons.AlertCircle className="w-4 h-4" />
                    {error}
                </p>
            )}

            {helperText && !error && (
                <p className="mt-1 text-sm text-gray-500">
                    {helperText}
                </p>
            )}
        </div>
    )
})

Select.displayName = 'Select'

export default Select 