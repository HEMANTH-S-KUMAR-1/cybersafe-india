import React, { useState, useEffect } from 'react';
import { Globe, Languages, Loader2, AlertCircle, Settings } from 'lucide-react';
import { useRealtimeTranslation } from '../../hooks/useRealtimeTranslation';
import { supportedLanguages } from '../../config/translator';

interface RealtimeTranslatorProps {
  className?: string;
  onTranslationChange?: (translation: string) => void;
}

export const RealtimeTranslator: React.FC<RealtimeTranslatorProps> = ({
  className = '',
  onTranslationChange
}) => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [isAutoDetect, setIsAutoDetect] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);

  const {
    translateAsync,
    detectLanguage,
    isTranslating,
    error,
    enableRealtime
  } = useRealtimeTranslation({ enableRealtime: true, cacheTranslations: true });

  // Auto-translate when input changes
  useEffect(() => {
    const translateText = async () => {
      if (inputText.trim() && enableRealtime) {
        try {
          // Detect language if auto-detect is enabled
          if (isAutoDetect) {
            const detected = await detectLanguage(inputText);
            if (detected) {
              setDetectedLanguage(detected.language);
              setSourceLanguage(detected.language);
            }
          }

          const result = await translateAsync(inputText, targetLanguage);
          setTranslatedText(result);
          onTranslationChange?.(result);
        } catch (err) {
          console.error('Translation failed:', err);
        }
      } else if (!inputText.trim()) {
        setTranslatedText('');
        onTranslationChange?.('');
      }
    };

    const debounceTimer = setTimeout(translateText, 500);
    return () => clearTimeout(debounceTimer);
  }, [inputText, targetLanguage, sourceLanguage, isAutoDetect, translateAsync, detectLanguage, onTranslationChange, enableRealtime]);

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  if (!enableRealtime) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-2 text-yellow-800">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">
            Real-time translation is not configured. Please set up Azure Translator credentials.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Real-time Translator</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAutoDetect(!isAutoDetect)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                isAutoDetect
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
              }`}
            >
              Auto-detect
            </button>
            <Settings className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Language Selection */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              disabled={isAutoDetect}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              {Object.entries(supportedLanguages).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
            {isAutoDetect && detectedLanguage && (
              <p className="text-xs text-gray-500 mt-1">
                Detected: {supportedLanguages[detectedLanguage as keyof typeof supportedLanguages]?.nativeName || detectedLanguage}
              </p>
            )}
          </div>

          <button
            onClick={handleSwapLanguages}
            disabled={isAutoDetect}
            className="mx-4 p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <Languages className="h-5 w-5" />
          </button>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(supportedLanguages).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Translation Interface */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Text
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Output */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              Translation
              {isTranslating && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
            </label>
            <div className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 overflow-y-auto">
              {error ? (
                <div className="text-red-600 text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </div>
              ) : (
                <p className="text-gray-900 whitespace-pre-wrap">
                  {translatedText || (inputText ? 'Translating...' : 'Translation will appear here')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Character Count */}
        <div className="mt-2 text-xs text-gray-500 text-right">
          {inputText.length} / 5000 characters
        </div>
      </div>
    </div>
  );
};
