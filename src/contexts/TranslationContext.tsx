import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentLanguage, setLanguage, t } from '../utils/translationsNew';
import { realtimeTranslator } from '../services/realtimeTranslator';

interface TranslationContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
  isTranslating: boolean;
  translate: (text: string) => string;
  translatedElementsCount: number;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedElementsCount, setTranslatedElementsCount] = useState(0);
  const [, forceUpdate] = useState({});

  const changeLanguage = async (language: string): Promise<void> => {
    if (language === currentLanguage) return;
    
    console.log(`🌍 Translation Context: Starting website translation to: ${language}`);
    setIsTranslating(true);
    
    try {
      // Set the language in the translation system first
      setLanguage(language);
      setCurrentLanguage(language);
      
      // Save to localStorage for persistence
      localStorage.setItem('cybersafe-language', language);
      
      // Small delay to ensure React state updates are complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Perform real-time DOM translation for the entire website
      if (language === 'en') {
        console.log('🔄 Restoring original English content');
        realtimeTranslator.restoreOriginalLanguage();
      } else {
        console.log(`🌐 Translating entire website DOM to: ${language}`);
        await realtimeTranslator.translatePage(language);
      }
      
      // Force re-render to update all React components
      forceUpdate({});
      
      // Dispatch global language change event
      const event = new CustomEvent('languageChanged', {
        detail: { language, previousLanguage: currentLanguage }
      });
      window.dispatchEvent(event);
      
      console.log(`✅ Translation Context: Website successfully translated to: ${language}`);
    } catch (error) {
      console.error('❌ Translation Context: Failed to change language:', error);
      throw error;
    } finally {
      setIsTranslating(false);
    }
  };

  const translate = (text: string): string => {
    // Import t function from translations
    return t(text, currentLanguage);
  };

  // Listen for page translation events to update element count
  useEffect(() => {
    const handlePageTranslated = (event: CustomEvent) => {
      setTranslatedElementsCount(event.detail.translatedCount || 0);
      setIsTranslating(false);
    };

    window.addEventListener('pageTranslated', handlePageTranslated as EventListener);
    
    return () => {
      window.removeEventListener('pageTranslated', handlePageTranslated as EventListener);
    };
  }, []);

  // Initialize language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('cybersafe-language');
    if (savedLanguage && savedLanguage !== currentLanguage) {
      // Apply saved language without triggering full translation on initial load
      setCurrentLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [currentLanguage]);

  // Auto-translate on route changes to ensure new content is translated
  useEffect(() => {
    if (currentLanguage !== 'en') {
      const timer = setTimeout(() => {
        realtimeTranslator.translatePage(currentLanguage).catch(error => {
          console.error('Failed to auto-translate new content:', error);
        });
      }, 500); // Small delay to allow page content to load

      return () => clearTimeout(timer);
    }
  }, [currentLanguage, location.pathname]);

  const value: TranslationContextType = {
    currentLanguage,
    changeLanguage,
    isTranslating,
    translate,
    translatedElementsCount
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
