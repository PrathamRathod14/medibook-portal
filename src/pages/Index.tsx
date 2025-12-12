import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Calendar,
  Shield,
  Clock,
  Users,
  Heart,
  Stethoscope,
  Activity,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book appointments with just a few clicks. Choose your preferred date, time, and department.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is protected with industry-standard security measures.'
    },
    {
      icon: Clock,
      title: '24/7 Access',
      description: 'Manage your appointments anytime, anywhere from any device.'
    },
    {
      icon: Users,
      title: 'Expert Doctors',
      description: 'Connect with experienced healthcare professionals across all specialties.'
    }
  ];

  const departments = [
    { name: 'General Medicine', icon: Stethoscope },
    { name: 'Cardiology', icon: Heart },
    { name: 'Orthopedics', icon: Activity },
    { name: 'Pediatrics', icon: Users }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden gradient-hero">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
          <div className="container relative mx-auto px-4 py-20 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm animate-fade-in">
                <Heart className="h-4 w-4" />
                Trusted by 10,000+ patients
              </div>

              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl animate-slide-up">
                Your Health,{' '}
                <span className="block">Our Priority</span>
              </h1>

              <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl animate-slide-up" style={{ animationDelay: '100ms' }}>
                Book appointments with top healthcare professionals in minutes.
                Access your health records, manage appointments, and take control of your wellness journey.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row animate-slide-up" style={{ animationDelay: '200ms' }}>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/register">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/login">
                    Already have an account?
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Why Choose MediCare?
              </h2>
              <p className="text-lg text-muted-foreground">
                We make healthcare accessible, convenient, and personalized for everyone.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Departments Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Our Departments
              </h2>
              <p className="text-lg text-muted-foreground">
                Specialized care across multiple medical disciplines
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {departments.map((dept, index) => (
                <div
                  key={dept.name}
                  className="flex items-center gap-4 rounded-xl bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <dept.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">{dept.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-16">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />

              <div className="relative mx-auto max-w-2xl text-center">
                <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
                  Ready to Take Control of Your Health?
                </h2>
                <p className="mb-8 text-lg text-primary-foreground/90">
                  Join thousands of patients who trust MediCare for their healthcare needs.
                </p>

                <div className="mb-8 flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/80">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" /> Free to sign up
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" /> No credit card required
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" /> Book in minutes
                  </span>
                </div>

                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/register">
                    Create Your Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
