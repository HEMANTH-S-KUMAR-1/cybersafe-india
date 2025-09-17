import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { voiceNarrationService } from '../../services/voiceNarration';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  // Debug: Log Azure credentials on component mount
  useEffect(() => {
    const key = import.meta.env.VITE_AZURE_TRANSLATOR_KEY;
    const endpoint = import.meta.env.VITE_AZURE_TRANSLATOR_ENDPOINT;
    const region = import.meta.env.VITE_AZURE_TRANSLATOR_REGION;
    
    console.log('🔑 Azure Translator Config Check:');
    console.log('Key exists:', !!key);
    console.log('Key length:', key?.length || 0);
    console.log('Endpoint:', endpoint);
    console.log('Region:', region);
    
    if (!key) {
      console.error('❌ VITE_AZURE_TRANSLATOR_KEY is missing from environment variables!');
    }
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/learn', label: 'Learn' },
    { path: '/threats', label: 'Threats' },
    { path: '/respond', label: 'Respond' },
    { path: '/community', label: 'Community' },
    { path: '/resources', label: 'Resources' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleVoice = () => {
    const newState = voiceNarrationService.toggle();
    setIsVoiceEnabled(newState);
    
    // Optionally read page content when voice is enabled
    if (newState) {
      setTimeout(() => {
        voiceNarrationService.readPageContent();
      }, 1500); // Wait for the "enabled" message to finish
    }
  };

  return (
    <header 
      className={`bg-surface sticky top-0 z-50 backdrop-blur-light transition-shadow duration-300 border-b border-border ${
        isScrolled ? 'shadow-lg' : ''
      }`}
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity" aria-label="CyberSafe India Home">
            <Shield className="h-8 w-8 text-cyber-blue" aria-hidden="true" />
            <div>
              <span className="text-xl font-bold text-cyber-blue">CyberSafe</span>
              <span className="text-xl font-bold text-saffron ml-1">India</span>
              <div className="text-xs text-gray-600">
                CyberSafe India
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-200 hover:text-cyber-blue ${
                  location.pathname === item.path
                    ? 'text-cyber-blue border-b-2 border-cyber-blue pb-1'
                    : 'text-gray-700'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Accessibility Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-lg transition-colors ${
                isVoiceEnabled
                  ? 'bg-primary text-white'
                  : 'bg-surface-hover text-text-secondary hover:bg-surface'
              }`}
              title={isVoiceEnabled ? "Disable voice narration" : "Enable voice narration"}
              aria-label="Toggle voice narration"
              aria-pressed={isVoiceEnabled}
            >
              {isVoiceEnabled ? (
                <Volume2 className="h-5 w-5" aria-hidden="true" />
              ) : (
                <VolumeX className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-surface-hover"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden border-t animate-slide-up"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)'
          }}
          aria-label="Mobile Navigation"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'text-cyber-blue bg-blue-50'
                    : 'text-text-secondary hover:text-primary hover:bg-surface-hover'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleVoice}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                    isVoiceEnabled
                      ? 'bg-primary text-white'
                      : 'bg-surface-hover text-text-secondary'
                  }`}
                  aria-pressed={isVoiceEnabled}
                  aria-label="Toggle voice narration"
                >
                  <Volume2 className="h-5 w-5" aria-hidden="true" />
                  <span>Voice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;