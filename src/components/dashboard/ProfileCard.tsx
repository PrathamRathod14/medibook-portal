import { Patient } from '@/lib/types';
import { User, Mail, Phone, Calendar, MapPin, AlertCircle } from 'lucide-react';

interface ProfileCardProps {
  patient: Patient;
}

const ProfileCard = ({ patient }: ProfileCardProps) => {
  const formatBirthDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Avatar */}
        <div className="group relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 ring-1 ring-primary/20 transition-all hover:scale-105 hover:shadow-lg">
          <User className="h-10 w-10 text-primary transition-transform group-hover:scale-110" />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-5">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {patient.firstName} {patient.lastName}
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                Patient
              </span>
              <span className="text-sm text-muted-foreground">
                ID: {patient.id.split('-')[0].toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-transparent bg-background/50 p-2 transition-colors hover:border-border hover:bg-background/80">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                <Mail className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{patient.email}</span>
            </div>

            {patient.phone && (
              <div className="flex items-center gap-3 rounded-lg border border-transparent bg-background/50 p-2 transition-colors hover:border-border hover:bg-background/80">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-600">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{patient.phone}</span>
              </div>
            )}

            <div className="flex items-center gap-3 rounded-lg border border-transparent bg-background/50 p-2 transition-colors hover:border-border hover:bg-background/80">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">
                <Calendar className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {formatBirthDate(patient.dateOfBirth)} ({calculateAge(patient.dateOfBirth)} years)
              </span>
            </div>

            {patient.address && (
              <div className="flex items-center gap-3 rounded-lg border border-transparent bg-background/50 p-2 transition-colors hover:border-border hover:bg-background/80">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{patient.address}</span>
              </div>
            )}
          </div>

          {patient.emergencyContact && (
            <div className="mt-2 flex items-center gap-3 rounded-xl bg-orange-50/50 p-3 text-sm text-orange-900 ring-1 ring-orange-200 backdrop-blur-sm dark:bg-orange-900/10 dark:text-orange-100 dark:ring-orange-900/30">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span className="font-medium">
                Emergency Contact: {patient.emergencyContact}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
