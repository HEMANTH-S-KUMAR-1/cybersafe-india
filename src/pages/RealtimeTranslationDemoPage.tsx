import React, { useState } from 'react';
import RealtimeLanguageSelector from '../components/Translation/RealtimeLanguageSelector';
import { useRealtimeTranslation } from '../hooks/useRealtimeTranslation';
import { Globe, Zap, Shield, Users, BookOpen, AlertTriangle } from 'lucide-react';

const RealtimeTranslationDemoPage: React.FC = () => {
  const {
    currentLanguage,
    isTranslating,
    translatedCount,
    translatePage,
    restoreOriginal,
    clearDOMCache,
    getDOMCacheStats
  } = useRealtimeTranslation({ enableDOMTranslation: true });

  const [cacheStats, setCacheStats] = useState(getDOMCacheStats());

  const handleClearCache = () => {
    clearDOMCache();
    setCacheStats(getDOMCacheStats());
  };

  const refreshCacheStats = React.useCallback(() => {
    setCacheStats(getDOMCacheStats());
  }, [getDOMCacheStats]);

  React.useEffect(() => {
    const timer = setInterval(refreshCacheStats, 2000);
    return () => clearInterval(timer);
  }, [refreshCacheStats]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Real-Time Translation Demo
              </h1>
              <p className="text-lg text-gray-600">
                Experience instant website translation powered by Azure Translator API
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-blue-700">
                  Current Language: {currentLanguage.toUpperCase()}
                </span>
              </div>
              <RealtimeLanguageSelector variant="default" showLabel={true} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Translation Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Translation Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500">Status</div>
              <div className={`text-lg font-bold ${isTranslating ? 'text-blue-600' : 'text-green-600'}`}>
                {isTranslating ? 'Translating...' : 'Ready'}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500">Elements Translated</div>
              <div className="text-lg font-bold text-blue-600">{translatedCount}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500">Cached Languages</div>
              <div className="text-lg font-bold text-purple-600">{cacheStats.languages}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-500">Total Translations</div>
              <div className="text-lg font-bold text-indigo-600">{cacheStats.totalTranslations}</div>
            </div>
          </div>
        </div>

        {/* Demo Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Cybersecurity Tips */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-500" />
              Cybersecurity Best Practices
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Strong Password Management</h3>
                <p className="text-blue-800">
                  Use unique, complex passwords for each account. Consider using a password manager
                  to generate and store secure passwords safely.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Two-Factor Authentication</h3>
                <p className="text-green-800">
                  Enable 2FA on all important accounts. This adds an extra layer of security
                  even if your password is compromised.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Regular Software Updates</h3>
                <p className="text-purple-800">
                  Keep your operating system, applications, and antivirus software up to date
                  to protect against the latest security threats.
                </p>
              </div>
            </div>
          </div>

          {/* Common Threats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Common Cyber Threats
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                <h3 className="font-semibold text-red-900 mb-2">Phishing Attacks</h3>
                <p className="text-red-800">
                  Fraudulent emails or websites designed to steal personal information.
                  Always verify sender identity before clicking links or downloading attachments.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                <h3 className="font-semibold text-orange-900 mb-2">Malware & Ransomware</h3>
                <p className="text-orange-800">
                  Malicious software that can damage your system or encrypt your files for ransom.
                  Use reputable antivirus software and backup your data regularly.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <h3 className="font-semibold text-yellow-900 mb-2">Social Engineering</h3>
                <p className="text-yellow-800">
                  Psychological manipulation to trick people into revealing confidential information.
                  Be cautious of unsolicited calls or messages requesting personal details.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Demo Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-500" />
            Digital Literacy & Safety Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe Browsing</h3>
              <p className="text-gray-600">
                Always check URLs for HTTPS encryption, avoid suspicious downloads, 
                and use trusted websites for online transactions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Media Privacy</h3>
              <p className="text-gray-600">
                Review privacy settings regularly, be cautious about sharing personal information,
                and verify friend requests from unknown contacts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Protection</h3>
              <p className="text-gray-600">
                Regularly backup important files, use encryption for sensitive data,
                and be careful when using public Wi-Fi networks.
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">How to Test Real-Time Translation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-blue-100">
                <li>Select a language from the dropdown above (Hindi, Tamil, etc.)</li>
                <li>Watch as all visible text on this page gets translated instantly</li>
                <li>Try different languages to see the translation in action</li>
                <li>Switch back to English to restore original text</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Features:</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-100">
                <li>Real-time DOM text node translation</li>
                <li>Smart caching for improved performance</li>
                <li>Support for 12 Indian languages</li>
                <li>Automatic translation status tracking</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => translatePage('hi')}
              disabled={isTranslating}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
            >
              Try Hindi
            </button>
            <button
              onClick={() => translatePage('ta')}
              disabled={isTranslating}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
            >
              Try Tamil
            </button>
            <button
              onClick={restoreOriginal}
              disabled={isTranslating}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
            >
              Back to English
            </button>
            <button
              onClick={handleClearCache}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Clear Cache
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeTranslationDemoPage;
