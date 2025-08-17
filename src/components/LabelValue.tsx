interface LabelValueProps {
    label: string
    value: string | number
    className?: string
    valueClassName?: string
}

export default function LabelValue({ label, value, className = '', valueClassName = 'text-gray-900' }: LabelValueProps) {
    return (
        <div className={`flex justify-between items-center ${className}`}>
            <span className="text-gray-600 text-sm">{label}:</span>
            <span className={valueClassName}>{value}</span>
        </div>
    )
} 