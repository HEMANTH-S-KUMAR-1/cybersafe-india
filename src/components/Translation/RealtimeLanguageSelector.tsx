import React, { useState } from 'react';
import { Globe, ChevronDown, Check, Loader2 } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' }
];

interface RealtimeLanguageSelectorProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'default' | 'compact' | 'minimal';
}

const RealtimeLanguageSelector: React.FC<RealtimeLanguageSelectorProps> = ({
  className = '',
  showLabel = true,
  variant = 'default'
}) => {
  const { currentLanguage, changeLanguage, isTranslating, translatedElementsCount } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = async (languageCode: string) => {
    console.log(`🔄 Language change requested: ${currentLanguage} → ${languageCode}`);
    
    if (languageCode === currentLanguage) {
      console.log('⚠️ Same language selected, closing dropdown');
      setIsOpen(false);
      return;
    }

    setIsOpen(false);

    try {
      console.log(`🌐 Starting website translation to: ${languageCode}`);
      
      // Use the translation context which handles the real translation
      await changeLanguage(languageCode);
      
      console.log(`✅ Website successfully translated to: ${languageCode}`);
      
      // Show success notification
      showNotification(
        `Website translated to ${SUPPORTED_LANGUAGES.find(l => l.code === languageCode)?.nativeName}`, 
        'success'
      );
    } catch (error) {
      console.error('❌ Failed to change language:', error);
      showNotification('Translation failed. Please try again.', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#ef4444' : '#10b981'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10001;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      ">
        ${message}
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const getCurrentLanguageName = () => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
    return lang ? lang.nativeName : 'English';
  };

  const getCurrentLanguageFlag = () => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
    return lang ? lang.flag : '🇺🇸';
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'px-2 py-1 text-sm';
      case 'minimal':
        return 'px-1 py-1 text-xs';
      default:
        return 'px-3 py-2';
    }
  };

  const getDropdownClasses = () => {
    switch (variant) {
      case 'compact':
        return 'right-0 mt-1 w-48';
      case 'minimal':
        return 'right-0 mt-1 w-40';
      default:
        return 'right-0 mt-2 w-56';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Language Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isTranslating}
        className={`
          flex items-center gap-2 bg-white border border-gray-300 rounded-lg
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-all duration-200 ${getVariantClasses()}
          ${isTranslating ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}
        `}
        title={isTranslating ? 'Translating...' : 'Select Language'}
      >
        {isTranslating ? (
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
        ) : (
          <Globe className="w-4 h-4 text-gray-600" />
        )}
        
        <span className="flex items-center gap-1">
          <span className="text-lg">{getCurrentLanguageFlag()}</span>
          {showLabel && (
            <span className="font-medium text-gray-900">
              {getCurrentLanguageName()}
            </span>
          )}
        </span>
        
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {/* Translation Status */}
      {isTranslating && (
        <div className="absolute top-full left-0 mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded border">
          Translating page...
        </div>
      )}

      {/* Language Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className={`
            absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg
            max-h-96 overflow-y-auto ${getDropdownClasses()}
          `}>
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                Select Language
              </div>
              
              {SUPPORTED_LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  disabled={isTranslating}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-md text-left
                    hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                    transition-colors duration-150
                    ${currentLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
                    ${isTranslating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-xs text-gray-500">{language.name}</div>
                  </div>
                  {currentLanguage === language.code && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Footer with stats */}
            {translatedElementsCount > 0 && (
              <div className="border-t border-gray-100 p-2 bg-gray-50">
                <div className="text-xs text-gray-500 text-center">
                  Last translated: {translatedElementsCount} text elements
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RealtimeLanguageSelector;
