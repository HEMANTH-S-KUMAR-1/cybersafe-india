// Debug script to test Azure Translator configuration
import { getTranslatorConfig, validateTranslatorConfig } from '../config/translator';
import { initializeTranslator } from '../services/azureTranslator';

export const debugTranslator = async () => {
  console.log('=== Azure Translator Debug ===');
  
  // Check environment variables
  console.log('Environment variables:');
  console.log('VITE_AZURE_TRANSLATOR_KEY:', import.meta.env.VITE_AZURE_TRANSLATOR_KEY ? '[SET]' : '[NOT SET]');
  console.log('VITE_AZURE_TRANSLATOR_ENDPOINT:', import.meta.env.VITE_AZURE_TRANSLATOR_ENDPOINT);
  console.log('VITE_AZURE_TRANSLATOR_REGION:', import.meta.env.VITE_AZURE_TRANSLATOR_REGION);
  
  // Get config
  const config = getTranslatorConfig();
  console.log('Translator config:', {
    subscriptionKey: config.subscriptionKey ? '[SET]' : '[NOT SET]',
    endpoint: config.endpoint,
    region: config.region,
    enableRealtime: config.enableRealtime
  });
  
  // Validate config
  const isValid = validateTranslatorConfig(config);
  console.log('Config is valid:', isValid);
  
  if (isValid) {
    try {
      const translator = initializeTranslator({
        subscriptionKey: config.subscriptionKey,
        endpoint: config.endpoint,
        region: config.region
      });
      
      console.log('Translator initialized successfully');
      
      // Test translation
      const result = await translator.translateText('Hello', 'hi');
      console.log('Test translation result:', result);
      
    } catch (error) {
      console.error('Translation test failed:', error);
    }
  }
  
  console.log('=== End Debug ===');
};

// Run debug on module load
debugTranslator();
