import { Patient, Appointment, Session } from './types';

const PATIENTS_KEY = 'medicare_patients';
const APPOINTMENTS_KEY = 'medicare_appointments';
const SESSION_KEY = 'medicare_session';

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Patient Operations
export const getPatients = (): Patient[] => {
  const data = localStorage.getItem(PATIENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const savePatient = (patient: Patient): void => {
  const patients = getPatients();
  patients.push(patient);
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
};

export const findPatientByEmail = (email: string): Patient | undefined => {
  const patients = getPatients();
  return patients.find(p => p.email.toLowerCase() === email.toLowerCase());
};

export const findPatientById = (id: string): Patient | undefined => {
  const patients = getPatients();
  return patients.find(p => p.id === id);
};

export const updatePatient = (id: string, updates: Partial<Patient>): void => {
  const patients = getPatients();
  const index = patients.findIndex(p => p.id === id);
  if (index !== -1) {
    patients[index] = { ...patients[index], ...updates };
    localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));
  }
};

// Appointment Operations
export const getAppointments = (): Appointment[] => {
  const data = localStorage.getItem(APPOINTMENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getPatientAppointments = (patientId: string): Appointment[] => {
  const appointments = getAppointments();
  return appointments
    .filter(a => a.patientId === patientId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const saveAppointment = (appointment: Appointment): void => {
  const appointments = getAppointments();
  appointments.push(appointment);
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
};

export const updateAppointment = (id: string, updates: Partial<Appointment>): void => {
  const appointments = getAppointments();
  const index = appointments.findIndex(a => a.id === id);
  if (index !== -1) {
    appointments[index] = { ...appointments[index], ...updates };
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  }
};

export const cancelAppointment = (id: string): void => {
  updateAppointment(id, { status: 'cancelled' });
};

export const isTimeSlotTaken = (date: string, time: string): boolean => {
  const appointments = getAppointments();
  return appointments.some(
    a => a.date === date && a.time === time && a.status !== 'cancelled'
  );
};

// Session Operations
export const getSession = (): Session | null => {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveSession = (session: Session): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

// Reset all data (for testing)
export const resetAllData = (): void => {
  localStorage.removeItem(PATIENTS_KEY);
  localStorage.removeItem(APPOINTMENTS_KEY);
  localStorage.removeItem(SESSION_KEY);
};
