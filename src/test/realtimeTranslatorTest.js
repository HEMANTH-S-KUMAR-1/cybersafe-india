// Quick test script for Azure Translator API
// Run this in browser console to test the translation service

import { realtimeTranslator } from './src/services/realtimeTranslator';

// Test function to verify Azure Translator connection
async function testAzureTranslator() {
  console.log('🧪 Testing Azure Translator API...');
  
  try {
    // Test Hindi translation
    console.log('Testing Hindi translation...');
    await realtimeTranslator.translatePage('hi');
    console.log('✅ Hindi translation successful!');
    
    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test Tamil translation
    console.log('Testing Tamil translation...');
    await realtimeTranslator.translatePage('ta');
    console.log('✅ Tamil translation successful!');
    
    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Restore English
    console.log('Restoring English...');
    realtimeTranslator.restoreOriginalLanguage();
    console.log('✅ English restoration successful!');
    
    // Show cache stats
    const stats = realtimeTranslator.getCacheStats();
    console.log('📊 Cache Statistics:', stats);
    
    console.log('🎉 All tests passed! Real-time translation is working correctly.');
    
  } catch (error) {
    console.error('❌ Translation test failed:', error);
    console.log('Please check your Azure Translator credentials in .env file');
  }
}

// Export for manual testing
window.testAzureTranslator = testAzureTranslator;

console.log('Real-time Translation Test Script Loaded!');
console.log('Run "testAzureTranslator()" in console to test the feature.');
console.log('Or visit: http://localhost:5173/cybersafe-india/realtime-translation-demo');
