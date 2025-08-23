// Azure Translator Service Integration
import axios from 'axios';

export interface AzureTranslatorConfig {
  subscriptionKey: string;
  endpoint: string;
  region: string;
}

export interface TranslationResult {
  text: string;
  detectedLanguage?: string;
  confidence?: number;
}

export interface TranslationResponse {
  translations: Array<{
    text: string;
    to: string;
  }>;
  detectedLanguage?: {
    language: string;
    score: number;
  };
}

class AzureTranslatorService {
  private config: AzureTranslatorConfig;
  private baseUrl: string;

  constructor(config: AzureTranslatorConfig) {
    this.config = config;
    this.baseUrl = `${config.endpoint}/translator/text/v3.0`;
  }

  /**
   * Translate text to target language
   */
  async translateText(
    text: string,
    targetLanguage: string,
    sourceLanguage?: string
  ): Promise<TranslationResult> {
    try {
      const params = new URLSearchParams({
        'api-version': '3.0',
        'to': targetLanguage
      });

      if (sourceLanguage) {
        params.append('from', sourceLanguage);
      }

      const response = await axios.post(
        `${this.baseUrl}/translate?${params}`,
        [{ text }],
        {
          headers: {
            'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
            'Ocp-Apim-Subscription-Region': this.config.region,
            'Content-Type': 'application/json',
            'X-ClientTraceId': this.generateTraceId()
          }
        }
      );

      const result = response.data[0] as TranslationResponse;
      
      return {
        text: result.translations[0].text,
        detectedLanguage: result.detectedLanguage?.language,
        confidence: result.detectedLanguage?.score
      };
    } catch (error: any) {
      console.error('Translation error:', error);
      
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.error?.message || error.response.statusText;
        throw new Error(`Azure Translator API error (${status}): ${message}`);
      } else if (error.request) {
        // Network error
        throw new Error('Network error: Unable to reach Azure Translator service');
      } else {
        // Other error
        throw new Error(`Translation error: ${error.message || 'Unknown error'}`);
      }
    }
  }

  /**
   * Translate multiple texts at once
   */
  async translateMultiple(
    texts: string[],
    targetLanguage: string,
    sourceLanguage?: string
  ): Promise<TranslationResult[]> {
    try {
      const params = new URLSearchParams({
        'api-version': '3.0',
        'to': targetLanguage
      });

      if (sourceLanguage) {
        params.append('from', sourceLanguage);
      }

      const body = texts.map(text => ({ text }));

      const response = await axios.post(
        `${this.baseUrl}/translate?${params}`,
        body,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
            'Ocp-Apim-Subscription-Region': this.config.region,
            'Content-Type': 'application/json',
            'X-ClientTraceId': this.generateTraceId()
          }
        }
      );

      return response.data.map((result: TranslationResponse) => ({
        text: result.translations[0].text,
        detectedLanguage: result.detectedLanguage?.language,
        confidence: result.detectedLanguage?.score
      }));
    } catch (error: any) {
      console.error('Multiple translation error:', error);
      
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.error?.message || error.response.statusText;
        throw new Error(`Azure Translator API error (${status}): ${message}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to reach Azure Translator service');
      } else {
        throw new Error(`Translation error: ${error.message || 'Unknown error'}`);
      }
    }
  }

  /**
   * Detect language of text
   */
  async detectLanguage(text: string): Promise<{ language: string; confidence: number }> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/detect?api-version=3.0`,
        [{ text }],
        {
          headers: {
            'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
            'Ocp-Apim-Subscription-Region': this.config.region,
            'Content-Type': 'application/json',
            'X-ClientTraceId': this.generateTraceId()
          }
        }
      );

      const result = response.data[0];
      return {
        language: result.language,
        confidence: result.score
      };
    } catch (error) {
      console.error('Language detection error:', error);
      throw new Error('Failed to detect language');
    }
  }

  /**
   * Get supported languages
   */
  async getSupportedLanguages(): Promise<Record<string, any>> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/languages?api-version=3.0&scope=translation`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
            'Ocp-Apim-Subscription-Region': this.config.region
          }
        }
      );

      return response.data.translation;
    } catch (error) {
      console.error('Error fetching supported languages:', error);
      throw new Error('Failed to fetch supported languages');
    }
  }

  private generateTraceId(): string {
    return 'cybersafe-' + Math.random().toString(36).substring(2, 15);
  }
}

// Language mappings for Indian languages
export const INDIAN_LANGUAGE_CODES = {
  'en': 'en', // English
  'hi': 'hi', // Hindi
  'kn': 'kn', // Kannada
  'ta': 'ta', // Tamil
  'te': 'te', // Telugu
  'bn': 'bn', // Bengali
  'gu': 'gu', // Gujarati
  'mr': 'mr', // Marathi
  'ml': 'ml', // Malayalam
  'pa': 'pa', // Punjabi
  'as': 'as', // Assamese
  'or': 'or', // Odia
  'ur': 'ur'  // Urdu
};

// Create a singleton instance (will be configured later)
let translatorInstance: AzureTranslatorService | null = null;

export const initializeTranslator = (config: AzureTranslatorConfig) => {
  translatorInstance = new AzureTranslatorService(config);
  return translatorInstance;
};

export const getTranslator = (): AzureTranslatorService => {
  if (!translatorInstance) {
    throw new Error('Translator not initialized. Call initializeTranslator first.');
  }
  return translatorInstance;
};

export default AzureTranslatorService;
