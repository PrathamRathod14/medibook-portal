import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { saveAppointment, generateId, isTimeSlotTaken } from '@/lib/storage';
import { DEPARTMENTS, generateTimeSlots, formatTime } from '@/lib/constants';
import { Appointment } from '@/lib/types';
import { toast } from 'sonner';
import { Calendar, Clock, Building2, CheckCircle } from 'lucide-react';

const BookingForm = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = generateTimeSlots();
  
  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Get maximum date (3 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }

    if (!selectedDepartment || !selectedDate || !selectedTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Check if time slot is already taken
    if (isTimeSlotTaken(selectedDate, selectedTime)) {
      toast.error('This time slot is already booked. Please select another time.');
      return;
    }

    setIsSubmitting(true);

    const appointment: Appointment = {
      id: generateId(),
      patientId: session.patientId,
      department: selectedDepartment,
      date: selectedDate,
      time: selectedTime,
      status: 'scheduled',
      notes: notes.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    saveAppointment(appointment);
    
    toast.success('Appointment booked successfully!', {
      description: `Your appointment has been scheduled for ${new Date(selectedDate).toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      })} at ${formatTime(selectedTime)}.`
    });

    setIsSubmitting(false);
    navigate('/appointments');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Department Selection */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-base font-semibold">
          <Building2 className="h-5 w-5 text-primary" />
          Select Department
        </Label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              type="button"
              onClick={() => setSelectedDepartment(dept.id)}
              className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                selectedDepartment === dept.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border bg-card hover:border-primary/30 hover:bg-secondary/50'
              }`}
            >
              <span className="font-semibold text-foreground">{dept.name}</span>
              <span className="text-xs text-muted-foreground">{dept.description}</span>
              {selectedDepartment === dept.id && (
                <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div className="space-y-3">
        <Label htmlFor="date" className="flex items-center gap-2 text-base font-semibold">
          <Calendar className="h-5 w-5 text-primary" />
          Select Date
        </Label>
        <Input
          id="date"
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedTime(''); // Reset time when date changes
          }}
          min={today}
          max={maxDateStr}
          className="max-w-xs"
          required
        />
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="space-y-4 animate-fade-in">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Clock className="h-5 w-5 text-primary" />
            Select Time
          </Label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => {
              const isTaken = isTimeSlotTaken(selectedDate, slot.time);
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={isTaken}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isTaken
                      ? 'cursor-not-allowed bg-muted text-muted-foreground line-through opacity-50'
                      : selectedTime === slot.time
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                  }`}
                >
                  {formatTime(slot.time)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="space-y-3">
        <Label htmlFor="notes" className="text-base font-semibold">
          Additional Notes <span className="font-normal text-muted-foreground">(Optional)</span>
        </Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Describe your symptoms or reason for visit..."
          className="min-h-[100px] resize-none"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground">{notes.length}/500 characters</p>
      </div>

      {/* Submit */}
      <div className="flex flex-col gap-4 pt-4 sm:flex-row">
        <Button
          type="submit"
          size="lg"
          disabled={!selectedDepartment || !selectedDate || !selectedTime || isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Booking...' : 'Confirm Booking'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => navigate('/dashboard')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
