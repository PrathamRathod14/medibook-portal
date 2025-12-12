import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, Patient } from '@/lib/types';
import { 
  getSession, 
  saveSession, 
  clearSession, 
  findPatientByEmail, 
  findPatientById,
  savePatient,
  generateId 
} from '@/lib/storage';

interface AuthContextType {
  session: Session | null;
  patient: Patient | null;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: Omit<Patient, 'id' | 'createdAt'>) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const existingSession = getSession();
    if (existingSession) {
      setSession(existingSession);
      const patientData = findPatientById(existingSession.patientId);
      if (patientData) {
        setPatient(patientData);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const patientData = findPatientByEmail(email);
    
    if (!patientData) {
      return { success: false, error: 'No account found with this email address.' };
    }
    
    if (patientData.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const newSession: Session = {
      patientId: patientData.id,
      email: patientData.email,
      firstName: patientData.firstName,
      lastName: patientData.lastName
    };

    saveSession(newSession);
    setSession(newSession);
    setPatient(patientData);
    
    return { success: true };
  };

  const register = (data: Omit<Patient, 'id' | 'createdAt'>): { success: boolean; error?: string } => {
    // Check if email already exists
    const existingPatient = findPatientByEmail(data.email);
    if (existingPatient) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newPatient: Patient = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString()
    };

    savePatient(newPatient);
    
    return { success: true };
  };

  const logout = (): void => {
    clearSession();
    setSession(null);
    setPatient(null);
  };

  return (
    <AuthContext.Provider value={{ session, patient, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
