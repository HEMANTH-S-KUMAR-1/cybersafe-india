// Simple Azure Translator API Test
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const config = {
  subscriptionKey: import.meta.env.VITE_AZURE_TRANSLATOR_KEY,
  endpoint: import.meta.env.VITE_AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com',
  region: import.meta.env.VITE_AZURE_TRANSLATOR_REGION || 'centralindia'
};

export async function testAzureConnection() {
  console.log('🔍 Testing Azure Translator API connection...');
  
  if (!config.subscriptionKey) {
    console.error('❌ Missing Azure Translator subscription key!');
    console.log('Please check your .env file contains VITE_AZURE_TRANSLATOR_KEY');
    return false;
  }

  try {
    const response = await axios({
      baseURL: config.endpoint,
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': config.subscriptionKey,
        'Ocp-Apim-Subscription-Region': config.region,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString(),
      },
      params: {
        'api-version': '3.0',
        from: 'en',
        to: ['hi'],
      },
      data: [{ text: 'Hello, this is a test.' }],
      responseType: 'json',
    });

    console.log('✅ Azure Translator API connection successful!');
    console.log('Response:', response.data);
    return true;
  } catch (error: unknown) {
    console.error('❌ Azure Translator API connection failed:');
    
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { status: number; data: unknown } };
      console.error('Status:', axiosError.response.status);
      console.error('Data:', axiosError.response.data);
      
      if (axiosError.response.status === 401) {
        console.error('Authentication failed - check your subscription key');
      } else if (axiosError.response.status === 403) {
        console.error('Access denied - check your region and subscription');
      }
    } else if (error && typeof error === 'object' && 'request' in error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error';
      console.error('Network error:', errorMessage);
    } else {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error:', errorMessage);
    }
    
    return false;
  }
}

// Make it available globally for testing
declare global {
  interface Window {
    testAzureConnection: () => Promise<boolean>;
  }
}

window.testAzureConnection = testAzureConnection;
