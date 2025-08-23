import { useState, useEffect, useCallback } from 'react';
import { t, getCurrentLanguage } from '../utils/translations';
import { getTranslator, INDIAN_LANGUAGE_CODES, TranslationResult } from '../services/azureTranslator';
import { realtimeTranslator } from '../services/realtimeTranslator';

interface UseRealtimeTranslationOptions {
  enableRealtime?: boolean;
  fallbackToStatic?: boolean;
  cacheTranslations?: boolean;
  enableDOMTranslation?: boolean; // New option for full DOM translation
}

interface TranslationCache {
  [key: string]: {
    [targetLang: string]: {
      text: string;
      timestamp: number;
    };
  };
}

export const useRealtimeTranslation = (options: UseRealtimeTranslationOptions = {}) => {
  const {
    enableRealtime = false,
    fallbackToStatic = true,
    cacheTranslations = true,
    enableDOMTranslation = false
  } = options;

  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationCache, setTranslationCache] = useState<TranslationCache>({});
  const [error, setError] = useState<string | null>(null);
  const [translatedCount, setTranslatedCount] = useState(0);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
    };

    const handlePageTranslated = (event: CustomEvent) => {
      setTranslatedCount(event.detail.translatedCount || 0);
      setIsTranslating(false);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    window.addEventListener('pageTranslated', handlePageTranslated as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
      window.removeEventListener('pageTranslated', handlePageTranslated as EventListener);
    };
  }, []);

  // Get cached translation
  const getCachedTranslation = useCallback((text: string, targetLang: string): string | null => {
    if (!cacheTranslations) return null;
    
    const cached = translationCache[text]?.[targetLang];
    if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hour cache
      return cached.text;
    }
    return null;
  }, [cacheTranslations, translationCache]);

  // Cache translation
  const cacheTranslation = useCallback((originalText: string, translatedText: string, targetLang: string) => {
    if (!cacheTranslations) return;
    
    setTranslationCache(prev => ({
      ...prev,
      [originalText]: {
        ...prev[originalText],
        [targetLang]: {
          text: translatedText,
          timestamp: Date.now()
        }
      }
    }));
  }, [cacheTranslations]);

  // Real-time translation function
  const translateWithAzure = useCallback(async (text: string, targetLang?: string): Promise<string> => {
    const target = targetLang || currentLanguage;
    
    // Check cache first
    const cached = getCachedTranslation(text, target);
    if (cached) return cached;

    if (!enableRealtime || target === 'en') {
      return text; // Return original text if realtime is disabled or target is English
    }

    try {
      setIsTranslating(true);
      setError(null);

      const translator = getTranslator();
      const azureLangCode = INDIAN_LANGUAGE_CODES[target as keyof typeof INDIAN_LANGUAGE_CODES];
      
      if (!azureLangCode) {
        throw new Error(`Unsupported language: ${target}`);
      }

      const result: TranslationResult = await translator.translateText(text, azureLangCode, 'en');
      
      // Cache the result
      cacheTranslation(text, result.text, target);
      
      return result.text;
    } catch (err) {
      console.error('Real-time translation failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Translation service unavailable';
      setError(`Translation failed: ${errorMessage}`);
      
      // Fallback to static translation if enabled
      if (fallbackToStatic) {
        return t(text, target) || text;
      }
      
      return text;
    } finally {
      setIsTranslating(false);
    }
  }, [currentLanguage, enableRealtime, fallbackToStatic, cacheTranslation, getCachedTranslation]);

  // Translate multiple texts at once
  const translateMultiple = useCallback(async (texts: string[], targetLang?: string): Promise<string[]> => {
    const target = targetLang || currentLanguage;
    
    if (!enableRealtime || target === 'en') {
      return texts;
    }

    try {
      setIsTranslating(true);
      setError(null);

      // Check cache for all texts
      const cachedResults: (string | null)[] = texts.map(text => getCachedTranslation(text, target));
      const uncachedIndices: number[] = [];
      const uncachedTexts: string[] = [];

      cachedResults.forEach((cached, index) => {
        if (cached === null) {
          uncachedIndices.push(index);
          uncachedTexts.push(texts[index]);
        }
      });

      // Translate uncached texts
      if (uncachedTexts.length > 0) {
        const translator = getTranslator();
        const azureLangCode = INDIAN_LANGUAGE_CODES[target as keyof typeof INDIAN_LANGUAGE_CODES];
        
        if (!azureLangCode) {
          throw new Error(`Unsupported language: ${target}`);
        }

        const results = await translator.translateMultiple(uncachedTexts, azureLangCode, 'en');
        
        // Cache results and update cachedResults
        results.forEach((result, i) => {
          const originalIndex = uncachedIndices[i];
          const originalText = texts[originalIndex];
          
          cacheTranslation(originalText, result.text, target);
          cachedResults[originalIndex] = result.text;
        });
      }

      return cachedResults.map((result, index) => result || texts[index]);
    } catch (err) {
      console.error('Multiple translation failed:', err);
      setError('Translation service unavailable');
      
      if (fallbackToStatic) {
        return texts.map(text => t(text, target) || text);
      }
      
      return texts;
    } finally {
      setIsTranslating(false);
    }
  }, [currentLanguage, enableRealtime, fallbackToStatic, cacheTranslation, getCachedTranslation]);

  // Enhanced translate function that combines static and real-time translation
  const translate = useCallback((key: string, targetLang?: string): string => {
    const target = targetLang || currentLanguage;
    
    // First try static translation
    const staticTranslation = t(key, target);
    
    // If static translation exists and is different from the key, use it
    if (staticTranslation && staticTranslation !== key) {
      return staticTranslation;
    }
    
    // If no static translation and realtime is enabled, we'll need async handling
    // For now, return the key as fallback
    return key;
  }, [currentLanguage]);

  // Async translate function for dynamic content
  const translateAsync = useCallback(async (text: string, targetLang?: string): Promise<string> => {
    const target = targetLang || currentLanguage;
    
    // First try static translation
    const staticTranslation = t(text, target);
    if (staticTranslation && staticTranslation !== text) {
      return staticTranslation;
    }
    
    // Then try real-time translation
    return await translateWithAzure(text, target);
  }, [currentLanguage, translateWithAzure]);

  // Detect language of text
  const detectLanguage = useCallback(async (text: string): Promise<{ language: string; confidence: number } | null> => {
    if (!enableRealtime) return null;
    
    try {
      const translator = getTranslator();
      return await translator.detectLanguage(text);
    } catch (err) {
      console.error('Language detection failed:', err);
      return null;
    }
  }, [enableRealtime]);

  // Clear translation cache
  const clearCache = useCallback(() => {
    setTranslationCache({});
  }, []);

  // DOM Translation functions
  const translatePage = useCallback(async (targetLang: string) => {
    if (!enableDOMTranslation) return;
    
    setIsTranslating(true);
    try {
      if (targetLang === 'en') {
        realtimeTranslator.restoreOriginalLanguage();
      } else {
        await realtimeTranslator.translatePage(targetLang);
      }
      localStorage.setItem('cybersafe-language', targetLang);
    } catch (error) {
      console.error('DOM translation failed:', error);
      setError('Translation failed. Please try again.');
      throw error;
    }
  }, [enableDOMTranslation]);

  const restoreOriginal = useCallback(() => {
    if (!enableDOMTranslation) return;
    realtimeTranslator.restoreOriginalLanguage();
    localStorage.setItem('cybersafe-language', 'en');
  }, [enableDOMTranslation]);

  const clearDOMCache = useCallback(() => {
    if (!enableDOMTranslation) return;
    realtimeTranslator.clearCache();
  }, [enableDOMTranslation]);

  const getDOMCacheStats = useCallback(() => {
    if (!enableDOMTranslation) return { languages: 0, totalTranslations: 0 };
    return realtimeTranslator.getCacheStats();
  }, [enableDOMTranslation]);

  return {
    t: translate,
    translateAsync,
    translateMultiple,
    detectLanguage,
    currentLanguage,
    isHindi: currentLanguage === 'hi',
    isEnglish: currentLanguage === 'en',
    isTranslating,
    error,
    clearCache,
    enableRealtime,
    cacheSize: Object.keys(translationCache).length,
    // DOM Translation features
    translatePage,
    restoreOriginal,
    clearDOMCache,
    getDOMCacheStats,
    translatedCount,
    enableDOMTranslation
  };
};
