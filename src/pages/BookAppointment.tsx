import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/appointments/BookingForm';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BookAppointment = () => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !session) {
      navigate('/login');
    }
  }, [session, isLoading, navigate]);

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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-3xl font-bold text-foreground">Book an Appointment</h1>
            <p className="mt-2 text-muted-foreground">
              Select your preferred department, date, and time slot to schedule your visit.
            </p>
          </div>

          {/* Booking Form */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <BookingForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookAppointment;
