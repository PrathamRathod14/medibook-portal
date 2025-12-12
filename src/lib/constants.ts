import { Department, TimeSlot } from './types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'general',
    name: 'General Medicine',
    icon: 'Stethoscope',
    description: 'Primary care and general health consultations'
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    icon: 'Heart',
    description: 'Heart and cardiovascular system care'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    icon: 'Bone',
    description: 'Bone, joint, and muscle treatment'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    icon: 'Baby',
    description: 'Healthcare for infants and children'
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    icon: 'Sparkles',
    description: 'Skin, hair, and nail conditions'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    icon: 'Brain',
    description: 'Brain and nervous system disorders'
  }
];

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 17 && minute > 0) break;
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        available: true
      });
    }
  }
  return slots;
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'scheduled':
      return 'bg-accent text-accent-foreground';
    case 'completed':
      return 'bg-success/10 text-success';
    case 'cancelled':
      return 'bg-destructive/10 text-destructive';
    default:
      return 'bg-muted text-muted-foreground';
  }
};
