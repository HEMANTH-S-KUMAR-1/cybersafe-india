import React from 'react';
import RealtimeLanguageSelector from '../components/Translation/RealtimeLanguageSelector';

const SimpleLanguageSelectorTest: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Language Selector Test</h1>
      
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Default Variant</h2>
          <RealtimeLanguageSelector />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Compact Variant</h2>
          <RealtimeLanguageSelector variant="compact" />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Minimal Variant</h2>
          <RealtimeLanguageSelector variant="minimal" showLabel={false} />
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Test Content for Translation</h2>
        <p className="mb-4">
          This is some test content that should be translated when you change the language.
        </p>
        <p className="mb-4">
          CyberSafe India helps protect users from cyber threats and scams.
        </p>
        <div className="space-y-2">
          <h3 className="font-semibold">Important Security Tips:</h3>
          <ul className="list-disc pl-6">
            <li>Never share your passwords with anyone</li>
            <li>Be cautious of suspicious emails and links</li>
            <li>Keep your software updated</li>
            <li>Use strong, unique passwords</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SimpleLanguageSelectorTest;
