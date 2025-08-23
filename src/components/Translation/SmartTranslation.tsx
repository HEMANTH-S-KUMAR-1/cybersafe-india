import React, { useState, useEffect } from 'react';
import { useRealtimeTranslation } from '../../hooks/useRealtimeTranslation';

interface SmartTranslationProps {
  text: string;
  translationKey?: string;
  targetLanguage?: string;
  className?: string;
  enableRealtime?: boolean;
  children?: React.ReactNode;
}

export const SmartTranslation: React.FC<SmartTranslationProps> = ({
  text,
  translationKey,
  targetLanguage,
  className = '',
  enableRealtime = true,
  children
}) => {
  const [translatedText, setTranslatedText] = useState(text);
  const [isLoading, setIsLoading] = useState(false);

  const {
    t,
    translateAsync,
    currentLanguage,
    isTranslating,
    enableRealtime: isRealtimeEnabled
  } = useRealtimeTranslation({ 
    enableRealtime, 
    fallbackToStatic: true,
    cacheTranslations: true 
  });

  useEffect(() => {
    const performTranslation = async () => {
      const target = targetLanguage || currentLanguage;
      
      // If target is English, show original text
      if (target === 'en') {
        setTranslatedText(text);
        return;
      }

      // First try static translation if translationKey is provided
      if (translationKey) {
        const staticTranslation = t(translationKey, target);
        if (staticTranslation && staticTranslation !== translationKey) {
          setTranslatedText(staticTranslation);
          return;
        }
      }

      // If real-time is enabled and available, use it
      if (isRealtimeEnabled && enableRealtime) {
        setIsLoading(true);
        try {
          const result = await translateAsync(text, target);
          setTranslatedText(result);
        } catch (error) {
          console.error('Translation failed:', error);
          setTranslatedText(text); // Fallback to original
        } finally {
          setIsLoading(false);
        }
      } else {
        // Fallback to original text
        setTranslatedText(text);
      }
    };

    performTranslation();
  }, [text, translationKey, targetLanguage, currentLanguage, t, translateAsync, isRealtimeEnabled, enableRealtime]);

  if (children) {
    return (
      <span className={`${className} ${(isLoading || isTranslating) ? 'opacity-70' : ''}`}>
        {React.cloneElement(children as React.ReactElement, {
          children: translatedText
        })}
      </span>
    );
  }

  return (
    <span className={`${className} ${(isLoading || isTranslating) ? 'opacity-70' : ''}`}>
      {translatedText}
    </span>
  );
};

// HOC for wrapping components with translation
export const withTranslation = <P extends object>(
  Component: React.ComponentType<P>,
  translationKey?: string
) => {
  return React.forwardRef<HTMLElement, P & SmartTranslationProps>((props, ref) => {
    const { text, ...restProps } = props;
    
    return (
      <SmartTranslation text={text} translationKey={translationKey} {...restProps}>
        <Component ref={ref} {...(restProps as P)} />
      </SmartTranslation>
    );
  });
};
