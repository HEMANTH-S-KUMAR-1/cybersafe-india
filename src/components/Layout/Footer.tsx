import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-gradient border-t border-border relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Logo and Mission */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-10 w-10 text-accent drop-shadow-lg" />
              <div>
                <span className="text-2xl font-bold text-heading">CyberSafe</span>
                <span className="text-2xl font-bold text-accent ml-1">India</span>
              </div>
            </div>
            <p className="text-text-secondary text-base leading-relaxed max-w-sm">
              Empowering every Indian with cyber safety knowledge. Building a secure digital future for all.
            </p>
            <p className="hindi text-text-secondary text-base opacity-90">
              हर भारतीय को साइबर सुरक्षा ज्ञान से सशक्त बनाना।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-accent drop-shadow-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/learn" className="text-text-secondary hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block text-base">
                  Learning Modules
                </Link>
              </li>
              <li>
                <Link to="/respond" className="text-text-secondary hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block text-base">
                  Report Cybercrime
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-text-secondary hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block text-base">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-text-secondary hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block text-base">
                  Download Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-accent drop-shadow-sm">Emergency Help</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-base text-text-secondary hover:text-text transition-colors duration-300">
                <Phone className="h-5 w-5 text-danger flex-shrink-0" />
                <span>Cyber Helpline: 155260</span>
              </div>
              <div className="flex items-center space-x-3 text-base text-text-secondary hover:text-text transition-colors duration-300">
                <Mail className="h-5 w-5 text-danger flex-shrink-0" />
                <span>cert-in@gov.in</span>
              </div>
              <div className="flex items-center space-x-3 text-base text-text-secondary hover:text-text transition-colors duration-300">
                <MapPin className="h-5 w-5 text-danger flex-shrink-0" />
                <span>cybercrime.gov.in</span>
              </div>
            </div>
          </div>

          {/* Partners and Social */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-accent drop-shadow-sm">Connect With Us</h3>
            <div className="flex space-x-5 mb-6">
              <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <div className="text-base text-text-secondary">
              <p className="font-semibold mb-3 text-text">Supported by:</p>
              <p className="leading-relaxed">CERT-In • RBI • Digital India</p>
              <p className="hindi mt-2 opacity-90">डिजिटल इंडिया पहल का समर्थन</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-base text-text-secondary">
              © 2025 CyberSafe India. All rights reserved. | <Link to="/privacy-policy" className="hover:text-primary transition-colors duration-300 underline decoration-transparent hover:decoration-current">Privacy Policy</Link> | <Link to="/terms-of-service" className="hover:text-primary transition-colors duration-300 underline decoration-transparent hover:decoration-current">Terms of Service</Link>
            </div>
            <div className="text-base text-text-secondary hindi opacity-90">
              साइबर सुरक्षित भारत - सुरक्षित डिजिटल भविष्य
            </div>
          </div>
          
          {/* Educational Disclaimer */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-sm text-text-secondary text-center leading-relaxed opacity-80">
              <strong>Educational Disclaimer:</strong> This information is provided for educational purposes only and has not been verified for accuracy or completeness. 
              This website is created for educational demonstration purposes and should not be used as a substitute for professional cybersecurity advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;