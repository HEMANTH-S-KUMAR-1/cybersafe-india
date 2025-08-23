import React from 'react';

const TranslationDebugPanel: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [testResults, setTestResults] = React.useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message);
    setTestResults(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testAzureConnection = async () => {
    addLog('🧪 Testing Azure Translator connection...');
    try {
      if (window.testAzureTranslator) {
        const result = await window.testAzureTranslator();
        addLog(result ? '✅ Azure connection successful!' : '❌ Azure connection failed!');
      } else {
        addLog('❌ Test function not available');
      }
    } catch (error) {
      addLog(`❌ Test failed: ${error}`);
    }
  };

  const testManualTranslation = async () => {
    addLog('🌐 Testing manual translation to Hindi...');
    try {
      if (window.realtimeTranslator) {
        await window.realtimeTranslator.translatePage('hi');
        addLog('✅ Manual translation completed!');
      } else {
        addLog('❌ Translator not available');
      }
    } catch (error) {
      addLog(`❌ Translation failed: ${error}`);
    }
  };

  const restoreEnglish = () => {
    addLog('🔄 Restoring English...');
    try {
      if (window.realtimeTranslator) {
        window.realtimeTranslator.restoreOriginalLanguage();
        addLog('✅ English restored!');
      } else {
        addLog('❌ Translator not available');
      }
    } catch (error) {
      addLog(`❌ Restore failed: ${error}`);
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
      >
        Debug Translation
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm">Translation Debug</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 mb-3">
        <button
          onClick={testAzureConnection}
          className="w-full bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Test Azure API
        </button>
        <button
          onClick={testManualTranslation}
          className="w-full bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          Test Hindi Translation
        </button>
        <button
          onClick={restoreEnglish}
          className="w-full bg-gray-500 text-white px-3 py-1 rounded text-sm"
        >
          Restore English
        </button>
      </div>
      
      <div className="bg-gray-100 p-2 rounded text-xs max-h-32 overflow-y-auto">
        {testResults.length === 0 ? (
          <div className="text-gray-500">No logs yet...</div>
        ) : (
          testResults.map((result, index) => (
            <div key={index} className="mb-1">{result}</div>
          ))
        )}
      </div>
    </div>
  );
};

export default TranslationDebugPanel;
