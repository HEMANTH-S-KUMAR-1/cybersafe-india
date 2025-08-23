import { initializeTranslator, AzureTranslatorConfig } from '../services/azureTranslator';
import { getTranslatorConfig, validateTranslatorConfig, TranslatorConfig } from '../config/translator';

export class TranslatorInitializer {
  private static instance: TranslatorInitializer;
  private isInitialized = false;
  private config: TranslatorConfig | null = null;

  static getInstance(): TranslatorInitializer {
    if (!TranslatorInitializer.instance) {
      TranslatorInitializer.instance = new TranslatorInitializer();
    }
    return TranslatorInitializer.instance;
  }

  async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      return true;
    }

    try {
      this.config = getTranslatorConfig();
      
      if (validateTranslatorConfig(this.config)) {
        const azureConfig: AzureTranslatorConfig = {
          subscriptionKey: this.config.subscriptionKey,
          endpoint: this.config.endpoint,
          region: this.config.region
        };
        initializeTranslator(azureConfig);
        this.isInitialized = true;
        console.log('Azure Translator initialized successfully');
        return true;
      } else {
        console.warn('Azure Translator configuration is incomplete. Real-time translation will be disabled.');
        console.log('To enable real-time translation, set the following environment variables:');
        console.log('- VITE_AZURE_TRANSLATOR_KEY: Your Azure Translator subscription key');
        console.log('- VITE_AZURE_TRANSLATOR_ENDPOINT: Your Azure Translator endpoint (optional)');
        console.log('- VITE_AZURE_TRANSLATOR_REGION: Your Azure Translator region (optional)');
        return false;
      }
    } catch (error) {
      console.error('Failed to initialize Azure Translator:', error);
      return false;
    }
  }

  isConfigured(): boolean {
    return this.isInitialized && this.config !== null;
  }

  getConfig(): TranslatorConfig | null {
    return this.config;
  }
}

// Auto-initialize when module is imported
const translator = TranslatorInitializer.getInstance();
translator.initialize();

export default translator;
