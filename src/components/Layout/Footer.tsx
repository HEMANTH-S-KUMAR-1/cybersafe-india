import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-saffron" />
              <div>
                <span className="text-xl font-bold">CyberSafe</span>
                <span className="text-xl font-bold text-saffron ml-1">India</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering every Indian with cyber safety knowledge. Building a secure digital future for all.
            </p>
            <p className="hindi text-gray-300 text-sm">
              हर भारतीय को साइबर सुरक्षा ज्ञान से सशक्त बनाना।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-saffron">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/learn" className="text-gray-300 hover:text-white transition-colors">
                  Learning Modules
                </Link>
              </li>
              <li>
                <Link to="/respond" className="text-gray-300 hover:text-white transition-colors">
                  Report Cybercrime
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-white transition-colors">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-white transition-colors">
                  Download Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-saffron">Emergency Help</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-warning-red" />
                <span>Cyber Helpline: 155260</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-warning-red" />
                <span>cert-in@gov.in</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-warning-red" />
                <span>cybercrime.gov.in</span>
              </div>
            </div>
          </div>

          {/* Partners and Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-saffron">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="text-sm text-gray-300">
              <p className="font-semibold mb-2">Supported by:</p>
              <p>CERT-In • RBI • Digital India</p>
              <p className="hindi">डिजिटल इंडिया पहल का समर्थन</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-sm text-gray-300">
              © 2025 CyberSafe India. All rights reserved. | <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link> | <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            <div className="text-sm text-gray-300 hindi">
              साइबर सुरक्षित भारत - सुरक्षित डिजिटल भविष्य
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;