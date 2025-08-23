import React, { useState } from 'react';

export const DirectAzureTest: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testDirect = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.cognitive.microsofttranslator.com/translator/text/v3.0/translate?api-version=3.0&to=hi', {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': import.meta.env.VITE_AZURE_TRANSLATOR_KEY || '',
          'Ocp-Apim-Subscription-Region': import.meta.env.VITE_AZURE_TRANSLATOR_REGION || '',
          'Content-Type': 'application/json',
          'X-ClientTraceId': crypto.randomUUID()
        },
        body: JSON.stringify([{ text: 'Hello World' }])
      });

      if (response.ok) {
        const data = await response.json();
        setResult(`SUCCESS: ${JSON.stringify(data, null, 2)}`);
      } else {
        const errorText = await response.text();
        setResult(`ERROR ${response.status}: ${errorText}`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setResult(`NETWORK ERROR: ${errorMessage}`);
    }
    setLoading(false);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">Azure Translator Direct Test</h3>
      <button 
        onClick={testDirect}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Azure API'}
      </button>
      <pre className="mt-4 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-60">
        {result || 'Click the button to test Azure Translator API directly'}
      </pre>
      <div className="mt-2 text-sm text-gray-600">
        <p>Key: {import.meta.env.VITE_AZURE_TRANSLATOR_KEY ? '[SET]' : '[NOT SET]'}</p>
        <p>Region: {import.meta.env.VITE_AZURE_TRANSLATOR_REGION || '[NOT SET]'}</p>
        <p>Endpoint: {import.meta.env.VITE_AZURE_TRANSLATOR_ENDPOINT || '[DEFAULT]'}</p>
      </div>
    </div>
  );
};
