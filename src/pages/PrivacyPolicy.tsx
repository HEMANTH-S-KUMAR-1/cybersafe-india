import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Last updated: August 22, 2025
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Introduction</h2>
            <p className="mb-4">
              CyberSafe India ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              and use our services.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
            <p className="mb-4">
              <strong>Personal Information:</strong> We may collect personal information that you voluntarily provide to us when you 
              register on our platform, express interest in obtaining information about us or our products and services, or otherwise 
              contact us.
            </p>
            <p className="mb-4">
              <strong>Usage Data:</strong> We may automatically collect certain information when you visit, use or navigate our platform. 
              This information does not reveal your specific identity but may include device and usage information such as your IP address, 
              browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, 
              and information about how and when you use our platform.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Providing, personalizing, and improving our services</li>
              <li>Communicating with you, including for customer service</li>
              <li>Processing your transactions</li>
              <li>Sending you marketing and promotional communications</li>
              <li>Responding to legal requests and preventing harm</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information Sharing</h2>
            <p className="mb-4">
              We do not share your personal information with third parties except as described in this Privacy Policy. 
              We may share information with:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Service providers who perform services for us</li>
              <li>Legal authorities when required by law</li>
              <li>Professional advisors, such as lawyers, auditors, and insurers</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>The right to access the personal information we have about you</li>
              <li>The right to rectify inaccurate personal information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to object to processing of your personal information</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mb-4">
              Email: privacy@cybersafeindia.org<br />
              Address: CyberSafe India Headquarters, New Delhi, India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
