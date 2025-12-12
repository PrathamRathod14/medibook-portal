import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MediCare</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in healthcare. Book appointments, manage your health records, 
              and connect with top medical professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/register" className="text-muted-foreground transition-colors hover:text-primary">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground transition-colors hover:text-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground transition-colors hover:text-primary">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Departments</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">General Medicine</li>
              <li className="text-muted-foreground">Cardiology</li>
              <li className="text-muted-foreground">Orthopedics</li>
              <li className="text-muted-foreground">Pediatrics</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                contact@medicare.com
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                123 Medical Center Drive, Health City, HC 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MediCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
