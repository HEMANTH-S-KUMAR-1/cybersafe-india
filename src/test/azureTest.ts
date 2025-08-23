// Simple test script to validate Azure Translator
export const testAzureTranslator = async () => {
  try {
    // Test basic HTTP connectivity to Azure Translator
    const response = await fetch('https://api.cognitive.microsofttranslator.com/translator/text/v3.0/languages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Azure Translator languages endpoint is accessible');
      console.log('Supported languages count:', Object.keys(data.translation || {}).length);
      
      // Test with our credentials
      const testResponse = await fetch('https://api.cognitive.microsofttranslator.com/translator/text/v3.0/translate?api-version=3.0&to=hi', {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': import.meta.env.VITE_AZURE_TRANSLATOR_KEY,
          'Ocp-Apim-Subscription-Region': import.meta.env.VITE_AZURE_TRANSLATOR_REGION,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{ text: 'Hello' }])
      });
      
      if (testResponse.ok) {
        const result = await testResponse.json();
        console.log('Translation test successful:', result);
        return { success: true, result };
      } else {
        const error = await testResponse.text();
        console.error('Translation test failed:', testResponse.status, error);
        return { success: false, error: `HTTP ${testResponse.status}: ${error}` };
      }
    } else {
      console.error('Azure Translator is not accessible:', response.status);
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }
  } catch (error: unknown) {
    console.error('Connection error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: errorMessage };
  }
};

// Auto-run test
testAzureTranslator().then(result => {
  console.log('Azure Translator test result:', result);
});
