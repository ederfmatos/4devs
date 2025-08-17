import Text from '@/components/Text';

interface LabelValueProps {
  label: string;
  value: string | number;
  className?: string;
  valueClassName?: string;
}

export default function LabelValue({
  label,
  value,
  className = '',
  valueClassName = '',
}: LabelValueProps) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <Text variant='body-sm' color='secondary'>
        {label}:
      </Text>
      <Text variant='body' className={valueClassName}>
        {value}
      </Text>
    </div>
  );
}
