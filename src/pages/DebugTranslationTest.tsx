import React from 'react';

const DebugTranslationTest: React.FC = () => {
  const [logs, setLogs] = React.useState<string[]>([]);
  
  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testBasicImport = async () => {
    try {
      addLog('Testing basic import...');
      const module = await import('../services/realtimeTranslator');
      addLog('✅ Realtime translator imported successfully');
      addLog(`Available exports: ${Object.keys(module).join(', ')}`);
    } catch (error) {
      addLog(`❌ Import failed: ${error}`);
    }
  };

  const testEnvVars = () => {
    addLog('Testing environment variables...');
    const key = import.meta.env.VITE_AZURE_TRANSLATOR_KEY;
    const endpoint = import.meta.env.VITE_AZURE_TRANSLATOR_ENDPOINT;
    const region = import.meta.env.VITE_AZURE_TRANSLATOR_REGION;
    
    addLog(`Key exists: ${!!key} (length: ${key?.length || 0})`);
    addLog(`Endpoint: ${endpoint}`);
    addLog(`Region: ${region}`);
  };

  const testSimpleTranslation = async () => {
    try {
      addLog('Testing simple translation...');
      const { realtimeTranslator } = await import('../services/realtimeTranslator');
      
      // Create a test element
      const testDiv = document.createElement('div');
      testDiv.textContent = 'Hello World Test';
      document.body.appendChild(testDiv);
      
      await realtimeTranslator.translatePage('hi');
      addLog('✅ Translation completed successfully');
      
      // Clean up
      document.body.removeChild(testDiv);
    } catch (error) {
      addLog(`❌ Translation failed: ${error}`);
    }
  };

  React.useEffect(() => {
    addLog('Debug component mounted');
    testEnvVars();
    testBasicImport();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Translation Debug Console</h1>
      
      <div className="mb-4 space-x-2">
        <button 
          onClick={testEnvVars}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Env Vars
        </button>
        <button 
          onClick={testBasicImport}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Import
        </button>
        <button 
          onClick={testSimpleTranslation}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Test Translation
        </button>
        <button 
          onClick={() => setLogs([])}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Logs
        </button>
      </div>

      <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
        {logs.length === 0 ? (
          <div>No logs yet...</div>
        ) : (
          logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))
        )}
      </div>
    </div>
  );
};

export default DebugTranslationTest;
