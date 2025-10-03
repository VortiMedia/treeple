import { Check, Clock, Lock } from 'lucide-react';
import { TileStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STATUS_CONFIG: Record<TileStatus, StatusConfig> = {
  available: {
    label: 'Available',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    borderColor: 'border-emerald-200',
    icon: Check
  },
  reserved: {
    label: 'Reserved',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-200',
    icon: Clock
  },
  sold: {
    label: 'Sold',
    color: 'text-slate-700',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-200',
    icon: Lock
  }
};

interface TileStatusBadgeProps {
  status: TileStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function TileStatusBadge({ status, size = 'md' }: TileStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border',
        config.bgColor,
        config.color,
        config.borderColor,
        sizeClasses[size]
      )}
    >
      <Icon className={cn('w-4 h-4', size === 'sm' && 'w-3 h-3', size === 'lg' && 'w-5 h-5')} />
      <span className="font-medium">{config.label}</span>
    </div>
  );
}
