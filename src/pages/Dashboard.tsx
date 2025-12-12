import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProfileCard from '@/components/dashboard/ProfileCard';
import StatsCard from '@/components/dashboard/StatsCard';
import AppointmentCard from '@/components/appointments/AppointmentCard';
import { useAuth } from '@/contexts/AuthContext';
import { getPatientAppointments, cancelAppointment } from '@/lib/storage';
import { Appointment } from '@/lib/types';
import { toast } from 'sonner';
import {
  Calendar,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  CalendarDays,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const { session, patient, isLoading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

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

  if (!patient) {
    return null;
  }

  // Calculate stats
  const scheduledCount = appointments.filter(a => a.status === 'scheduled').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;
  const upcomingAppointments = appointments
    .filter(a => a.status === 'scheduled' && new Date(a.date) >= new Date(new Date().setHours(0, 0, 0, 0)))
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Header />

      <main className="relative flex-1 py-8 sm:py-12">
        {/* Background blobs */}
        <div className="absolute left-0 top-0 -ml-20 -mt-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-1/3 -mr-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

        <div className="container relative mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Activity className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Patient Dashboard</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
                Welcome back, <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">{patient.firstName}</span>
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Here's your health overview and upcoming schedule. You're doing great!
              </p>
            </div>
            <Button size="lg" className="h-12 shadow-lg hover:shadow-primary/25" asChild>
              <Link to="/book">
                <Plus className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
            </Button>
          </div>

          {/* Profile Section */}
          <div className="mb-10 animate-slide-up">
            <ProfileCard patient={patient} />
          </div>

          {/* Stats Grid */}
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="animate-slide-up" style={{ animationDelay: '50ms' }}>
              <StatsCard
                icon={Calendar}
                label="Total Appointments"
                value={appointments.length}
                description="Lifetime records"
                variant="primary"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <StatsCard
                icon={Clock}
                label="Scheduled"
                value={scheduledCount}
                description="Upcoming visits"
                variant="primary"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '150ms' }}>
              <StatsCard
                icon={CheckCircle}
                label="Completed"
                value={completedCount}
                description="Past appointments"
                variant="success"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <StatsCard
                icon={XCircle}
                label="Cancelled"
                value={cancelledCount}
                description="Missed or cancelled"
                variant="warning"
              />
            </div>
          </div>

          {/* Upcoming Appointments */}
          <section className="animate-slide-up" style={{ animationDelay: '250ms' }}>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Upcoming Appointments
                </h2>
                <p className="text-muted-foreground">Your schedule for the next few days</p>
              </div>
              {appointments.length > 0 && (
                <Button variant="outline" asChild>
                  <Link to="/appointments">View All &rarr;</Link>
                </Button>
              )}
            </div>

            {upcomingAppointments.length > 0 ? (
              <div className="grid gap-4">
                {upcomingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={handleCancelAppointment}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/50 px-4 py-16 text-center backdrop-blur-sm">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <CalendarDays className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  No Upcoming Appointments
                </h3>
                <p className="mb-6 max-w-sm text-muted-foreground">
                  You don't have any scheduled appointments. Book your first appointment today to stay on top of your health!
                </p>
                <Button size="lg" asChild>
                  <Link to="/book">
                    <Plus className="mr-2 h-5 w-5" />
                    Book Your First Appointment
                  </Link>
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
