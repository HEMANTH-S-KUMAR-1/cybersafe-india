// Simple translation system for CyberSafe India
export interface TranslationKey {
  en: string;
  hi: string;
  kn?: string;
  ta?: string;
  te?: string;
  bn?: string;
  gu?: string;
  mr?: string;
}

export const translations: Record<string, TranslationKey> = {
  // Navigation
  'nav.home': {
    en: 'Home',
    hi: 'होम'
  },
  'nav.learn': {
    en: 'Learn',
    hi: 'सीखें'
  },
  'nav.respond': {
    en: 'Respond',
    hi: 'रिपोर्ट करें'
  },
  'nav.community': {
    en: 'Community',
    hi: 'समुदाय'
  },
  'nav.resources': {
    en: 'Resources',
    hi: 'संसाधन'
  },
  
  // Hero Section
  'hero.title': {
    en: 'Secure India\'s Digital Future',
    hi: 'भारत का डिजिटल भविष्य सुरक्षित करें'
  },
  'hero.subtitle': {
    en: 'Empowering every Indian with cybersecurity knowledge and tools to stay safe online',
    hi: 'हर भारतीय को ऑनलाइन सुरक्षित रहने के लिए साइबर सुरक्षा ज्ञान और उपकरण प्रदान करना'
  },
  'hero.cta.learn': {
    en: 'Start Learning',
    hi: 'सीखना शुरू करें'
  },
  'hero.cta.report': {
    en: 'Report Cybercrime',
    hi: 'साइबर अपराध की रिपोर्ट करें'
  },
  
  // Demographics Section
  'demo.title': {
    en: 'Cybersecurity for Every Indian',
    hi: 'हर भारतीय के लिए साइबर सुरक्षा'
  },
  'demo.subtitle': {
    en: 'Tailored cybersecurity education and resources for different communities across India',
    hi: 'भारत भर के विभिन्न समुदायों के लिए अनुकूलित साइबर सुरक्षा शिक्षा और संसाधन'
  },
  
  // Footer
  'footer.mission': {
    en: 'Empowering every Indian with cyber safety knowledge. Building a secure digital future for all.',
    hi: 'हर भारतीय को साइबर सुरक्षा ज्ञान से सशक्त बनाना। सभी के लिए एक सुरक्षित डिजिटल भविष्य का निर्माण।'
  },
  'footer.emergency': {
    en: 'Emergency Help',
    hi: 'आपातकालीन सहायता'
  },
  'footer.connect': {
    en: 'Connect With Us',
    hi: 'हमसे जुड़ें'
  },
  'footer.supported': {
    en: 'Supported by:',
    hi: 'द्वारा समर्थित:'
  },
  'footer.copyright': {
    en: 'All rights reserved',
    hi: 'सभी अधिकार सुरक्षित'
  },
  
  // Common Terms
  'common.loading': {
    en: 'Loading...',
    hi: 'लोड हो रहा है...'
  },
  'common.error': {
    en: 'An error occurred',
    hi: 'एक त्रुटि हुई'
  },
  'common.success': {
    en: 'Success!',
    hi: 'सफलता!'
  },
  'common.close': {
    en: 'Close',
    hi: 'बंद करें'
  },
  'common.save': {
    en: 'Save',
    hi: 'सहेजें'
  },
  'common.cancel': {
    en: 'Cancel',
    hi: 'रद्द करें'
  }
};

// Simple translation function
export const t = (key: string, language: string = 'en'): string => {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation key "${key}" not found`);
    return key;
  }
  
  return translation[language as keyof TranslationKey] || translation.en || key;
};

// Get current language from localStorage or default to English
export const getCurrentLanguage = (): string => {
  return localStorage.getItem('preferred-language') || 'en';
};

// Check if language is RTL (right-to-left)
export const isRTLLanguage = (language: string): boolean => {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(language);
};

// Get language direction
export const getLanguageDirection = (language: string): 'ltr' | 'rtl' => {
  return isRTLLanguage(language) ? 'rtl' : 'ltr';
};
