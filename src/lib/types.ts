// Patient / User Profile Schema
export interface Patient {
  id: string;
  email: string;
  password: string; // In real app, this would be hashed
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO format: YYYY-MM-DD
  phone?: string;
  address?: string;
  emergencyContact?: string;
  createdAt: string; // ISO timestamp
}

// Appointment Schema
export interface Appointment {
  id: string;
  patientId: string;
  date: string; // ISO format: YYYY-MM-DD
  time: string; // HH:MM format (24-hour)
  department: string;
  doctor?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string; // ISO timestamp
}

// Session data
export interface Session {
  patientId: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Available time slots
export interface TimeSlot {
  time: string;
  available: boolean;
}

// Department info
export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
}
