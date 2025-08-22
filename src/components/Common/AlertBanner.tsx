import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const AlertBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="alert-banner relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5" />
            <div>
              <span className="font-semibold">URGENT ALERT:</span>
              <span className="ml-2">New cryptocurrency investment scams targeting Indian users. Stay vigilant!</span>
              <span className="block text-sm hindi opacity-90 mt-1">
                नई क्रिप्टोकरेंसी निवेश धोखाधड़ी - सावधान रहें!
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-red-200 transition-colors p-1"
            aria-label="Close alert"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;