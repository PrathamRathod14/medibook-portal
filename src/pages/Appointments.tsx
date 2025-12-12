import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppointmentCard from '@/components/appointments/AppointmentCard';
import { useAuth } from '@/contexts/AuthContext';
import { getPatientAppointments, cancelAppointment } from '@/lib/storage';
import { Appointment } from '@/lib/types';
import { toast } from 'sonner';
import { 
  Plus, 
  CalendarDays,
  Filter
} from 'lucide-react';

type FilterStatus = 'all' | 'scheduled' | 'completed' | 'cancelled';

const Appointments = () => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    if (!isLoading && !session) {
      navigate('/login');
      return;
    }

    if (session) {
      loadAppointments();
    }
  }, [session, isLoading, navigate]);

  const loadAppointments = () => {
    if (session) {
      const patientAppointments = getPatientAppointments(session.patientId);
      setAppointments(patientAppointments);
    }
  };

  const handleCancelAppointment = (id: string) => {
    cancelAppointment(id);
    loadAppointments();
    toast.success('Appointment cancelled successfully');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Filter appointments
  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(a => a.status === filter);

  const filterOptions: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="animate-slide-up">
              <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
              <p className="mt-1 text-muted-foreground">
                View and manage all your appointments
              </p>
            </div>
            <Button size="lg" asChild className="animate-slide-up" style={{ animationDelay: '50ms' }}>
              <Link to="/book">
                <Plus className="mr-2 h-5 w-5" />
                Book New Appointment
              </Link>
            </Button>
          </div>

          {/* Filter */}
          <div className="mb-6 flex items-center gap-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter:</span>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                    filter === option.value
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {option.label}
                  {option.value !== 'all' && (
                    <span className="ml-1.5 opacity-70">
                      ({appointments.filter(a => a.status === option.value).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Appointments List */}
          {filteredAppointments.length > 0 ? (
            <div className="space-y-4">
              {filteredAppointments.map((appointment, index) => (
                <div 
                  key={appointment.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${150 + index * 50}ms` }}
                >
                  <AppointmentCard
                    appointment={appointment}
                    onCancel={handleCancelAppointment}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-12 text-center animate-fade-in">
              <CalendarDays className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {filter === 'all' ? 'No Appointments Yet' : `No ${filter.charAt(0).toUpperCase() + filter.slice(1)} Appointments`}
              </h3>
              <p className="mb-6 text-muted-foreground">
                {filter === 'all' 
                  ? "You haven't booked any appointments yet. Schedule your first visit today!"
                  : `You don't have any ${filter} appointments.`
                }
              </p>
              {filter === 'all' && (
                <Button asChild>
                  <Link to="/book">
                    <Plus className="mr-2 h-4 w-4" />
                    Book Your First Appointment
                  </Link>
                </Button>
              )}
            </div>
          )}

          {/* Summary */}
          {appointments.length > 0 && (
            <div className="mt-8 rounded-xl bg-muted/30 p-4 text-center text-sm text-muted-foreground animate-fade-in">
              Showing {filteredAppointments.length} of {appointments.length} appointments
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Appointments;
