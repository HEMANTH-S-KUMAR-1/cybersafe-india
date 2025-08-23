import React from 'react';
import { AutoTranslate } from '../components/Translation/AutoTranslate';
import { useTranslation } from '../contexts/TranslationContext';

const TranslationTestPage: React.FC = () => {
  const { currentLanguage, changeLanguage } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Translation System Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Language: {currentLanguage}</h2>
          
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => changeLanguage('en')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              English
            </button>
            <button 
              onClick={() => changeLanguage('hi')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Hindi
            </button>
            <button 
              onClick={() => changeLanguage('ta')}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Tamil
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-4 border rounded">
              <strong>Site Title:</strong> <AutoTranslate text="CyberSafe India" translationKey="site.title" />
            </div>
            
            <div className="p-4 border rounded">
              <strong>Hero Title:</strong> <AutoTranslate text="Secure India's Digital Future" translationKey="hero.title" />
            </div>
            
            <div className="p-4 border rounded">
              <strong>Hero Subtitle:</strong> <AutoTranslate text="Empowering every Indian with cybersecurity knowledge and tools to stay safe online" translationKey="hero.subtitle" />
            </div>
            
            <div className="p-4 border rounded">
              <strong>Students:</strong> <AutoTranslate text="Students" translationKey="demographic.students" />
            </div>
            
            <div className="p-4 border rounded">
              <strong>Students Description:</strong> <AutoTranslate text="Safe online learning and social media practices" translationKey="demographic.students.desc" />
            </div>
            
            <div className="p-4 border rounded">
              <strong>Footer Tagline:</strong> <AutoTranslate text="Building a safer digital India, one citizen at a time." translationKey="footer.tagline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationTestPage;
