import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export interface RealtimeTranslatorConfig {
  subscriptionKey: string;
  endpoint: string;
  region: string;
}

export interface TextNode {
  element: Text;
  originalText: string;
  translatedText?: string;
}

export interface TranslationBatch {
  textNodes: TextNode[];
  targetLanguage: string;
}

class RealtimeTranslatorService {
  private config: RealtimeTranslatorConfig;
  private translationCache: Map<string, Map<string, string>> = new Map(); // language -> text -> translation
  private originalTexts: Map<Text, string> = new Map(); // Store original texts for reverting

  constructor(config: RealtimeTranslatorConfig) {
    this.config = config;
    
    // Validate configuration
    if (!config.subscriptionKey || config.subscriptionKey.trim() === '') {
      console.error('❌ Azure Translator subscription key is missing!');
      console.error('Please check your .env file contains VITE_AZURE_TRANSLATOR_KEY');
    } else {
      console.log('✅ Azure Translator configured with key:', config.subscriptionKey.substring(0, 10) + '...');
      console.log('📍 Region:', config.region);
      console.log('🌐 Endpoint:', config.endpoint);
    }
  }

  /**
   * Get all visible text nodes from the DOM
   */
  private getAllTextNodes(root: Node = document.body): TextNode[] {
    const textNodes: TextNode[] = [];
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip script and style elements
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          
          const tagName = parent.tagName.toLowerCase();
          if (['script', 'style', 'noscript', 'svg', 'code'].includes(tagName)) {
            return NodeFilter.FILTER_REJECT;
          }

          // Skip empty or whitespace-only text
          const text = node.textContent?.trim();
          if (!text || text.length === 0) {
            return NodeFilter.FILTER_REJECT;
          }

          // Skip very short text (likely single characters or symbols)
          if (text.length < 2) {
            return NodeFilter.FILTER_REJECT;
          }

          // Skip if parent is hidden
          const computed = window.getComputedStyle(parent);
          if (computed.display === 'none' || computed.visibility === 'hidden') {
            return NodeFilter.FILTER_REJECT;
          }

          // Skip if it's inside a translation loading indicator
          if (parent.closest('#translation-loading')) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while ((node = walker.nextNode())) {
      const textNode = node as Text;
      const originalText = textNode.textContent?.trim();
      
      if (originalText) {
        // Store original text if not already stored
        if (!this.originalTexts.has(textNode)) {
          this.originalTexts.set(textNode, originalText);
        }

        textNodes.push({
          element: textNode,
          originalText: this.originalTexts.get(textNode) || originalText
        });
      }
    }

    return textNodes;
  }

  /**
   * Translate multiple texts using Azure Translator API
   */
  private async translateTexts(texts: string[], targetLanguage: string): Promise<string[]> {
    console.log(`📤 Sending ${texts.length} texts to Azure Translator for ${targetLanguage}`);
    console.log('📤 Texts to translate:', texts);
    
    try {
      // Construct the correct Azure Translator API URL
      const url = `${this.config.endpoint}/translator/text/v3.0/translate?api-version=3.0&from=en&to=${targetLanguage}`;
      console.log('📍 Request URL:', url);
      
      const headers = {
        'Ocp-Apim-Subscription-Key': this.config.subscriptionKey,
        'Ocp-Apim-Subscription-Region': this.config.region,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString(),
      };
      console.log('📋 Request Headers:', { 
        ...headers, 
        'Ocp-Apim-Subscription-Key': `${headers['Ocp-Apim-Subscription-Key'].substring(0, 10)}...` 
      });
      
      const requestData = texts.map((text) => ({ text }));
      console.log('📦 Request Data:', requestData);
      
      const response = await axios({
        url: url,
        method: 'post',
        headers: headers,
        data: requestData,
        responseType: 'json',
      });

      console.log(`📥 Response Status:`, response.status);
      console.log(`📥 Received translations from Azure:`, response.data);
      const translations = response.data.map((item: any) => item.translations[0].text);
      console.log(`✅ Successfully translated ${translations.length} texts:`, translations);
      
      return translations;
    } catch (error: any) {
      console.error('❌ Translation API error details:');
      console.error('Error message:', error.message);
      
      if (error.response) {
        console.error('❌ API Response Status:', error.response.status);
        console.error('❌ API Response Status Text:', error.response.statusText);
        console.error('❌ API Response Data:', error.response.data);
        console.error('❌ API Response Headers:', error.response.headers);
      } else if (error.request) {
        console.error('❌ No response received:', error.request);
      } else {
        console.error('❌ Error setting up request:', error.message);
      }
      
      // Return original texts as fallback
      console.log('⚠️ Using original texts as fallback');
      return texts;
    }
  }

  /**
   * Get translation from cache or translate if not cached
   */
  private async getTranslations(texts: string[], targetLanguage: string): Promise<string[]> {
    if (targetLanguage === 'en') {
      return texts; // No translation needed for English
    }

    const languageCache = this.translationCache.get(targetLanguage) || new Map();
    const results: string[] = [];
    const textsToTranslate: string[] = [];
    const indicesToTranslate: number[] = [];

    // Check cache first
    texts.forEach((text, index) => {
      const cached = languageCache.get(text);
      if (cached) {
        results[index] = cached;
      } else {
        textsToTranslate.push(text);
        indicesToTranslate.push(index);
      }
    });

    // Translate uncached texts
    if (textsToTranslate.length > 0) {
      try {
        const translations = await this.translateTexts(textsToTranslate, targetLanguage);
        
        // Store in cache and results
        translations.forEach((translation, i) => {
          const originalIndex = indicesToTranslate[i];
          const originalText = textsToTranslate[i];
          
          languageCache.set(originalText, translation);
          results[originalIndex] = translation;
        });

        this.translationCache.set(targetLanguage, languageCache);
      } catch (error) {
        console.error('Failed to translate texts:', error);
        
        // Use original texts as fallback
        indicesToTranslate.forEach((index, i) => {
          results[index] = textsToTranslate[i];
        });
      }
    }

    return results;
  }

  /**
   * Translate all visible text on the page to target language
   */
  async translatePage(targetLanguage: string): Promise<void> {
    try {
      console.log(`🌐 Starting translation to ${targetLanguage}`);
      
      // Show loading indicator
      this.showTranslationLoading(true);

      // Get all text nodes
      const textNodes = this.getAllTextNodes();
      
      if (textNodes.length === 0) {
        console.log('⚠️ No text nodes found to translate');
        return;
      }

      console.log(`📝 Found ${textNodes.length} text nodes to translate to ${targetLanguage}`);

      // Batch translate texts
      const texts = textNodes.map(node => node.originalText);
      console.log(`📤 Sending ${texts.length} texts for translation...`);
      
      const translations = await this.getTranslations(texts, targetLanguage);
      console.log(`📥 Received ${translations.length} translations`);

      // Apply translations to DOM
      textNodes.forEach((textNode, index) => {
        if (textNode.element.parentNode) {
          textNode.element.textContent = translations[index];
        }
      });

      console.log(`✅ Successfully translated page to ${targetLanguage}`);
      
      // Dispatch translation complete event
      const event = new CustomEvent('pageTranslated', {
        detail: { 
          language: targetLanguage, 
          translatedCount: textNodes.length 
        }
      });
      window.dispatchEvent(event);

    } catch (error) {
      console.error('❌ Failed to translate page:', error);
      throw error;
    } finally {
      this.showTranslationLoading(false);
    }
  }

  /**
   * Restore original language (English) for all text nodes
   */
  restoreOriginalLanguage(): void {
    try {
      this.originalTexts.forEach((originalText, textNode) => {
        if (textNode.parentNode) {
          textNode.textContent = originalText;
        }
      });

      console.log('Restored original language');
      
      // Dispatch event
      const event = new CustomEvent('pageTranslated', {
        detail: { 
          language: 'en', 
          translatedCount: this.originalTexts.size 
        }
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Failed to restore original language:', error);
    }
  }

  /**
   * Show/hide translation loading indicator
   */
  private showTranslationLoading(show: boolean): void {
    const existingIndicator = document.getElementById('translation-loading');
    
    if (show && !existingIndicator) {
      const indicator = document.createElement('div');
      indicator.id = 'translation-loading';
      indicator.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(59, 130, 246, 0.9);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          z-index: 10000;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        ">
          <div style="
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          "></div>
          Translating page...
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      `;
      document.body.appendChild(indicator);
    } else if (!show && existingIndicator) {
      existingIndicator.remove();
    }
  }

  /**
   * Clear translation cache
   */
  clearCache(): void {
    this.translationCache.clear();
    console.log('Translation cache cleared');
  }

  /**
   * Test Azure Translator API connection
   */
  async testConnection(): Promise<boolean> {
    console.log('🧪 Testing Azure Translator API connection...');
    console.log('🔑 Subscription Key:', this.config.subscriptionKey ? `${this.config.subscriptionKey.substring(0, 10)}...` : 'MISSING');
    console.log('🌐 Endpoint:', this.config.endpoint);
    console.log('📍 Region:', this.config.region);
    
    if (!this.config.subscriptionKey) {
      console.error('❌ No subscription key provided for testing');
      return false;
    }
    
    try {
      // Test with a simple single text first
      console.log('📤 Testing with single text: "Hello"');
      const testTexts = ['Hello'];
      const translations = await this.translateTexts(testTexts, 'hi');
      
      console.log('📥 Received translations:', translations);
      
      if (translations.length === testTexts.length && translations[0] !== 'Hello') {
        console.log('✅ Azure Translator API connection successful!');
        console.log('✅ Translation result: "Hello" → "' + translations[0] + '"');
        return true;
      } else {
        console.error('❌ Azure Translator API test failed - no translation occurred');
        console.error('Expected translation but got:', translations);
        return false;
      }
    } catch (error) {
      console.error('❌ Azure Translator API connection test failed:', error);
      return false;
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { languages: number; totalTranslations: number } {
    let totalTranslations = 0;
    this.translationCache.forEach(languageCache => {
      totalTranslations += languageCache.size;
    });

    return {
      languages: this.translationCache.size,
      totalTranslations
    };
  }
}

// Create singleton instance
const config: RealtimeTranslatorConfig = {
  subscriptionKey: import.meta.env.VITE_AZURE_TRANSLATOR_KEY || '',
  endpoint: import.meta.env.VITE_AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com',
  region: import.meta.env.VITE_AZURE_TRANSLATOR_REGION || 'global'
};

export const realtimeTranslator = new RealtimeTranslatorService(config);

// Make test function available globally for debugging
declare global {
  interface Window {
    testAzureTranslator: () => Promise<boolean>;
    testAzureDirectly: () => Promise<void>;
    realtimeTranslator: RealtimeTranslatorService;
  }
}

// Global test functions
if (typeof window !== 'undefined') {
  window.testAzureTranslator = async () => {
    console.log('🧪 Global test function called');
    return await realtimeTranslator.testConnection();
  };

  window.testAzureDirectly = async () => {
    console.log('🧪 Testing Azure API directly...');
    
    const url = 'https://api.cognitive.microsofttranslator.com/translator/text/v3.0/translate?api-version=3.0&from=en&to=hi';
    const headers = {
      'Ocp-Apim-Subscription-Key': 'your_azure_translator_key_here',
      'Ocp-Apim-Subscription-Region': 'your_azure_region_here',
      'Content-Type': 'application/json',
    };
    const data = [{ text: 'Hello' }];
    
    console.log('📍 Direct test URL:', url);
    console.log('📋 Direct test headers:', headers);
    console.log('📦 Direct test data:', data);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
      
      console.log('📥 Direct response status:', response.status);
      console.log('📥 Direct response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Direct API error response:', errorText);
        return;
      }
      
      const result = await response.json();
      console.log('✅ Direct API success:', result);
    } catch (error) {
      console.error('❌ Direct API error:', error);
    }
  };

  window.realtimeTranslator = realtimeTranslator;
}

if (typeof window !== 'undefined') {
  window.testAzureTranslator = () => realtimeTranslator.testConnection();
  window.realtimeTranslator = realtimeTranslator;
}
