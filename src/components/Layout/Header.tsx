import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Volume2 } from 'lucide-react';
import LanguageSelector from '../Common/LanguageSelector';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', hindi: 'होम' },
    { path: '/learn', label: 'Learn', hindi: 'सीखें' },
    { path: '/respond', label: 'Respond', hindi: 'प्रतिक्रिया' },
    { path: '/community', label: 'Community', hindi: 'समुदाय' },
    { path: '/resources', label: 'Resources', hindi: 'संसाधन' },
  ];

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    // Voice narration toggle logic would be implemented here
    console.log('Voice narration:', !isVoiceEnabled ? 'enabled' : 'disabled');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Shield className="h-8 w-8 text-cyber-blue" />
            <div>
              <span className="text-xl font-bold text-cyber-blue">CyberSafe</span>
              <span className="text-xl font-bold text-saffron ml-1">India</span>
              <div className="text-xs text-gray-600 hindi">साइबर सुरक्षित भारत</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-200 hover:text-cyber-blue ${
                  location.pathname === item.path
                    ? 'text-cyber-blue border-b-2 border-cyber-blue pb-1'
                    : 'text-gray-700'
                }`}
              >
                <span className="block">{item.label}</span>
                <span className="block text-xs hindi opacity-75">{item.hindi}</span>
              </Link>
            ))}
          </nav>

          {/* Accessibility Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-lg transition-colors ${
                isVoiceEnabled
                  ? 'bg-cyber-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Voice narration"
              aria-label="Toggle voice narration"
            >
              <Volume2 className="h-5 w-5" />
            </button>
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-slide-up">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'text-cyber-blue bg-blue-50'
                    : 'text-gray-700 hover:text-cyber-blue hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block">{item.label}</span>
                <span className="block text-sm hindi opacity-75">{item.hindi}</span>
              </Link>
            ))}
            <div className="flex items-center justify-between px-3 py-2">
              <button
                onClick={toggleVoice}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  isVoiceEnabled
                    ? 'bg-cyber-blue text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Volume2 className="h-5 w-5" />
                <span>Voice</span>
              </button>
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;