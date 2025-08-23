import React from 'react';
import { RealtimeTranslator } from '../components/Translation/RealtimeTranslator';
import { SmartTranslation } from '../components/Translation/SmartTranslation';
import { Globe, Zap, Shield, Users } from 'lucide-react';

export const TranslationDemoPage: React.FC = () => {

  const demoContent = [
    {
      title: "Cybersecurity Best Practices",
      content: "Always use strong, unique passwords for each of your accounts. Enable two-factor authentication whenever possible to add an extra layer of security."
    },
    {
      title: "Phishing Awareness",
      content: "Be cautious of suspicious emails asking for personal information. Verify the sender's identity before clicking any links or downloading attachments."
    },
    {
      title: "Safe Online Shopping",
      content: "Only shop on secure websites (look for HTTPS). Use trusted payment methods and avoid saving payment information on unfamiliar sites."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              <SmartTranslation text="Real-time Translation Demo" />
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            <SmartTranslation text="Experience the power of Azure Translator integrated into CyberSafe India. Translate cybersecurity content instantly into multiple Indian languages." />
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold">
                <SmartTranslation text="Real-time Translation" />
              </h3>
            </div>
            <p className="text-gray-600">
              <SmartTranslation text="Instant translation powered by Azure AI with support for 13+ Indian languages including Hindi, Tamil, Telugu, and more." />
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-500" />
              <h3 className="text-lg font-semibold">
                <SmartTranslation text="Smart Fallback" />
              </h3>
            </div>
            <p className="text-gray-600">
              <SmartTranslation text="Automatically falls back to static translations when real-time service is unavailable, ensuring continuous user experience." />
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-blue-500" />
              <h3 className="text-lg font-semibold">
                <SmartTranslation text="Cultural Context" />
              </h3>
            </div>
            <p className="text-gray-600">
              <SmartTranslation text="Translations are optimized for Indian context with regional language support and cultural sensitivity." />
            </p>
          </div>
        </div>

        {/* Interactive Translator */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <SmartTranslation text="Try Real-time Translation" />
          </h2>
          
          <RealtimeTranslator className="w-full" />
        </div>

        {/* Demo Content */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <SmartTranslation text="Cybersecurity Content Examples" />
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {demoContent.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  <SmartTranslation text={item.title} />
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <SmartTranslation text={item.content} />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            <SmartTranslation text="Setting Up Azure Translator" />
          </h3>
          <div className="space-y-3 text-blue-800">
            <p>
              <SmartTranslation text="To enable real-time translation, follow these steps:" />
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>
                <SmartTranslation text="Create an Azure Translator resource in the Azure portal" />
              </li>
              <li>
                <SmartTranslation text="Copy your subscription key and endpoint URL" />
              </li>
              <li>
                <SmartTranslation text="Set environment variables in your .env file:" />
              </li>
            </ol>
            <div className="bg-blue-100 rounded p-3 mt-4 font-mono text-sm">
              <div>VITE_AZURE_TRANSLATOR_KEY=your_subscription_key</div>
              <div>VITE_AZURE_TRANSLATOR_ENDPOINT=your_endpoint</div>
              <div>VITE_AZURE_TRANSLATOR_REGION=your_region</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
