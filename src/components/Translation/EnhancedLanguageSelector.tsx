import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Wifi, Loader2 } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
import { supportedLanguages, SupportedLanguage } from '../../config/translator';

interface EnhancedLanguageSelectorProps {
  className?: string;
  showStatus?: boolean;
}

export const EnhancedLanguageSelector: React.FC<EnhancedLanguageSelectorProps> = ({
  className = '',
  showStatus = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const { currentLanguage, changeLanguage, isTranslating } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    // Use the translation context to change language site-wide
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  const getTranslationStatus = () => {
    if (isTranslating) return { icon: Loader2, color: 'text-blue-500', text: 'Translating...', animate: true };
    return { icon: Wifi, color: 'text-green-500', text: 'Translation Active' };
  };

  const status = getTranslationStatus();
  const currentLang = supportedLanguages[currentLanguage as SupportedLanguage];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-surface-hover hover:bg-surface rounded-lg transition-all duration-300 border border-border hover:border-primary"
      >
        <Globe className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">
          {currentLang?.flag} {currentLang?.name || 'English'}
        </span>
        {showStatus && (
          <div className="flex items-center space-x-1">
            <status.icon className={`h-3 w-3 ${status.color} ${status.animate ? 'animate-spin' : ''}`} />
          </div>
        )}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* Translation Status */}
          {showStatus && (
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <status.icon className={`h-3 w-3 ${status.color} ${status.animate ? 'animate-spin' : ''}`} />
                  <span className={status.color}>{status.text}</span>
                </div>
                <span className="text-gray-500">Website Translation</span>
              </div>
            </div>
          )}

          {/* Language Options */}
          <div className="py-2 max-h-64 overflow-y-auto">
            {Object.entries(supportedLanguages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-hover transition-all duration-300 flex items-center justify-between ${
                  currentLanguage === code
                    ? 'bg-primary-light text-primary font-medium border-l-2 border-primary'
                    : 'text-text-secondary hover:text-text'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{lang.flag}</span>
                  <div>
                    <div className="font-medium">{lang.name}</div>
                    <div className="text-xs text-gray-500">{lang.nativeName}</div>
                  </div>
                </div>
                {currentLanguage === code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
            <div className="text-xs text-gray-500 flex items-center justify-between">
              <span>CyberSafe India Translation</span>
              <span className="text-green-600">● Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
