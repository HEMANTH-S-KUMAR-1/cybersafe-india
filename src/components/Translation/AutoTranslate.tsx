import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../contexts/TranslationContext';

interface AutoTranslateProps {
  text: string;
  translationKey?: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

export const AutoTranslate: React.FC<AutoTranslateProps> = ({ 
  text, 
  translationKey, 
  className = '', 
  tag: Tag = 'span' 
}) => {
  const { translate, currentLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState(text);
  
  useEffect(() => {
    // Use translation key if provided, otherwise use the text as key
    const keyToUse = translationKey || text;
    const newTranslatedText = translate(keyToUse);
    
    // If no translation found, return original text
    const displayText = newTranslatedText === keyToUse && !translationKey ? text : newTranslatedText;
    setTranslatedText(displayText);
  }, [currentLanguage, text, translationKey, translate]);
  
  return <Tag className={className}>{translatedText}</Tag>;
};
