import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const AlertBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="alert-banner relative" role="alert" aria-live="assertive">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <div>
              <span className="font-semibold">URGENT ALERT:</span>
              <span className="ml-2">New cryptocurrency investment scams targeting Indian users. Stay vigilant!</span>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-red-200 transition-colors p-1 ml-auto sm:ml-0"
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