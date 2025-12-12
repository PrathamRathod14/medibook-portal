import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  description?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

const StatsCard = ({ icon: Icon, label, value, description, variant = 'default' }: StatsCardProps) => {
  const variantStyles = {
    default: 'bg-card/50 backdrop-blur-sm border-border hover:border-primary/50',
    primary: 'bg-primary/5 backdrop-blur-sm border-primary/20 hover:border-primary/50 hover:bg-primary/10',
    success: 'bg-success/5 backdrop-blur-sm border-success/20 hover:border-success/50 hover:bg-success/10',
    warning: 'bg-warning/5 backdrop-blur-sm border-warning/20 hover:border-warning/50 hover:bg-warning/10'
  };

  const iconStyles = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary group-hover:bg-primary/20',
    success: 'bg-success/10 text-success group-hover:bg-success/20',
    warning: 'bg-warning/10 text-warning group-hover:bg-warning/20'
  };

  return (
    <div className={`group relative overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${variantStyles[variant]}`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${iconStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{value}</p>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      
      {/* Decorative gradient blob */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-white/10 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />
    </div>
  );
};

export default StatsCard;
