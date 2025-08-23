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
  } catch (error: any) {
    console.error('❌ Azure Translator API connection failed:');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      
      if (error.response.status === 401) {
        console.error('Authentication failed - check your subscription key');
      } else if (error.response.status === 403) {
        console.error('Access denied - check your region and subscription');
      }
    } else if (error.request) {
      console.error('Network error:', error.message);
    } else {
      console.error('Error:', error.message);
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
