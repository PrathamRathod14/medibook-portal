import { Appointment } from '@/lib/types';
import { formatDate, formatTime, getStatusColor, DEPARTMENTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Building2, X, FileText } from 'lucide-react';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
}

const AppointmentCard = ({ appointment, onCancel }: AppointmentCardProps) => {
  const department = DEPARTMENTS.find(d => d.id === appointment.department);
  const isPast = new Date(appointment.date) < new Date(new Date().setHours(0, 0, 0, 0));
  const canCancel = appointment.status === 'scheduled' && !isPast;

  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          {/* Department */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {department?.name || appointment.department}
              </h3>
              {appointment.doctor && (
                <p className="text-sm text-muted-foreground">Dr. {appointment.doctor}</p>
              )}
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatTime(appointment.time)}</span>
            </div>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <FileText className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="line-clamp-2">{appointment.notes}</p>
            </div>
          )}
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(appointment.status)}`}>
            {appointment.status}
          </span>
          
          {canCancel && onCancel && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onCancel(appointment.id)}
            >
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
