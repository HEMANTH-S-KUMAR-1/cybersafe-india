// Azure Translator Configuration
// Environment variables for Azure Translator service

export interface TranslatorConfig {
  subscriptionKey: string;
  endpoint: string;
  region: string;
  enableRealtime: boolean;
}

// Default configuration
export const defaultTranslatorConfig: Partial<TranslatorConfig> = {
  endpoint: 'https://api.cognitive.microsofttranslator.com',
  enableRealtime: false, // Disabled by default until credentials are provided
};

// Get configuration from environment variables
export const getTranslatorConfig = (): TranslatorConfig => {
  // In production, these should come from environment variables
  const config: TranslatorConfig = {
    subscriptionKey: import.meta.env.VITE_AZURE_TRANSLATOR_KEY || '',
    endpoint: import.meta.env.VITE_AZURE_TRANSLATOR_ENDPOINT || defaultTranslatorConfig.endpoint!,
    region: import.meta.env.VITE_AZURE_TRANSLATOR_REGION || 'global',
    enableRealtime: !!(import.meta.env.VITE_AZURE_TRANSLATOR_KEY && import.meta.env.VITE_AZURE_TRANSLATOR_ENDPOINT)
  };

  return config;
};

// Validate configuration
export const validateTranslatorConfig = (config: TranslatorConfig): boolean => {
  return !!(config.subscriptionKey && config.endpoint && config.region);
};

// Language configuration for Indian context
export const supportedLanguages = {
  en: { name: 'English', nativeName: 'English', flag: '🇬🇧' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  te: { name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  bn: { name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  gu: { name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  mr: { name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  ml: { name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  pa: { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  as: { name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  or: { name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  ur: { name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' }
};

export type SupportedLanguage = keyof typeof supportedLanguages;
