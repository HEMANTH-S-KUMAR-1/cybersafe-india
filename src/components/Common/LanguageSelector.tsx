import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    setIsOpen(false);
    // Language change logic would be implemented here
    console.log('Language changed to:', langCode);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, langCode?: string) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (langCode) {
        handleLanguageChange(langCode);
      } else {
        setIsOpen(!isOpen);
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-2 px-3 py-2 bg-surface-hover hover:bg-surface rounded-lg transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4 text-gray-600" aria-hidden="true" />
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage?.native}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-600" aria-hidden="true" />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 animate-fade-in"
          role="listbox"
          aria-labelledby="language-selector-label"
        >
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                onKeyDown={(e) => handleKeyDown(e, language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  selectedLanguage === language.code
                    ? 'bg-blue-50 text-cyber-blue font-medium'
                    : 'text-gray-700'
                }`}
                role="option"
                aria-selected={selectedLanguage === language.code}
              >
                <span className="block">{language.name}</span>
                <span className="block text-xs opacity-75">{language.native}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;