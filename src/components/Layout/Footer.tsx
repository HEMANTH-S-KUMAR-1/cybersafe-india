import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import { AutoTranslate } from '../Translation/AutoTranslate';

const Footer: React.FC = () => {
  return (
    <footer className="footer-gradient border-t border-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Logo and Mission */}
          <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-3">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-accent drop-shadow-lg" />
              <div>
                <span className="text-xl sm:text-2xl font-bold text-heading">CyberSafe</span>
                <span className="text-xl sm:text-2xl font-bold text-accent ml-1">India</span>
              </div>
            </div>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-sm mx-auto sm:mx-0">
              <AutoTranslate text="Building a safer digital India, one citizen at a time." translationKey="footer.tagline" />
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-accent drop-shadow-sm">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/learn" className="text-text-secondary hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base">
                  Learning Modules
                </Link>
              </li>
              <li>
                <Link to="/respond" className="text-text-secondary hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base">
                  Report Cybercrime
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-text-secondary hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-text-secondary hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base">
                  Download Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-accent drop-shadow-sm">Emergency Help</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-sm sm:text-base text-text-secondary hover:text-text transition-colors duration-300">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-danger flex-shrink-0" />
                <span>Cyber Helpline: 155260</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-sm sm:text-base text-text-secondary hover:text-text transition-colors duration-300">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-danger flex-shrink-0" />
                <span>cert-in@gov.in</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-sm sm:text-base text-text-secondary hover:text-text transition-colors duration-300">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-danger flex-shrink-0" />
                <span>cybercrime.gov.in</span>
              </div>
            </div>
          </div>

          {/* Partners and Social */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-accent drop-shadow-sm">Connect With Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4 sm:space-x-5 mb-4 sm:mb-6">
              <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Youtube className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
            <div className="text-sm sm:text-base text-text-secondary">
              <p className="font-semibold mb-2 sm:mb-3 text-text">Supported by:</p>
              <p className="leading-relaxed">CERT-In • RBI • Digital India</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 sm:mt-12 pt-6 sm:pt-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 gap-4">
            <div className="text-sm sm:text-base text-text-secondary text-center sm:text-left">
              © 2025 CyberSafe India. All rights reserved. | <Link to="/privacy-policy" className="hover:text-primary transition-colors duration-300 underline decoration-transparent hover:decoration-current">Privacy Policy</Link> | <Link to="/terms-of-service" className="hover:text-primary transition-colors duration-300 underline decoration-transparent hover:decoration-current">Terms of Service</Link>
            </div>
          </div>
          
          {/* Educational Disclaimer */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/50">
            <p className="text-xs sm:text-sm text-text-secondary text-center leading-relaxed opacity-80 px-4 sm:px-0">
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