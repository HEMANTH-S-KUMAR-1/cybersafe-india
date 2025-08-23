import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../contexts/TranslationContext';

export const RouteTranslationWatcher: React.FC = () => {
  const location = useLocation();
  const { currentLanguage, isTranslating } = useTranslation();

  useEffect(() => {
    // Only auto-translate if not already translating and language is not English
    if (!isTranslating && currentLanguage !== 'en') {
      console.log(`🔄 Route changed to ${location.pathname}, auto-translating to ${currentLanguage}`);
      
      // Small delay to allow page content to fully load
      const timer = setTimeout(async () => {
        try {
          const { realtimeTranslator } = await import('../../services/realtimeTranslator');
          await realtimeTranslator.translatePage(currentLanguage);
        } catch (error) {
          console.error('Auto-translation after route change failed:', error);
        }
      }, 800); // Increased delay for better content loading

      return () => clearTimeout(timer);
    }
  }, [location.pathname, currentLanguage, isTranslating]);

  return null; // This component doesn't render anything
};

export default RouteTranslationWatcher;
