// Test Azure Translator Configuration
console.log('🧪 Testing Azure Translator Configuration...');

// Check environment variables
const config = {
  key: import.meta.env.VITE_AZURE_TRANSLATOR_KEY,
  endpoint: import.meta.env.VITE_AZURE_TRANSLATOR_ENDPOINT,
  region: import.meta.env.VITE_AZURE_TRANSLATOR_REGION
};

console.log('Environment Variables:', {
  keyExists: !!config.key,
  endpoint: config.endpoint,
  region: config.region,
  keyLength: config.key ? config.key.length : 0
});

// Test import of realtime translator
try {
  import('./src/services/realtimeTranslator.js').then(module => {
    console.log('✅ Realtime translator module loaded successfully');
    console.log('Available exports:', Object.keys(module));
  }).catch(error => {
    console.error('❌ Failed to load realtime translator:', error);
  });
} catch (error) {
  console.error('❌ Error importing realtime translator:', error);
}

// Test if DOM translation is available
window.testTranslation = async () => {
  try {
    const { realtimeTranslator } = await import('./src/services/realtimeTranslator.js');      
    console.log('🎯 Testing Hindi translation...');
    await realtimeTranslator.translatePage('hi');
    console.log('✅ Translation test successful!');
  } catch (error) {
    console.error('❌ Translation test failed:', error);
  }
};

console.log('Run window.testTranslation() to test translation functionality');
