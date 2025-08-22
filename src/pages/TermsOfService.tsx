import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Last updated: August 22, 2025
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Agreement to Terms</h2>
            <p className="mb-4">
              These Terms of Service constitute a legally binding agreement made between you and CyberSafe India 
              concerning your access to and use of our website and services. By accessing or using our services, 
              you agree to be bound by these Terms.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Intellectual Property Rights</h2>
            <p className="mb-4">
              Unless otherwise indicated, the website and all source code, databases, functionality, software, 
              website designs, audio, video, text, photographs, and graphics on the website (collectively, the "Content") 
              and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or 
              licensed to us, and are protected by copyright and trademark laws.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">User Representations</h2>
            <p className="mb-4">
              By using our services, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update it as necessary.</li>
              <li>You have the legal capacity to understand and agree to these Terms.</li>
              <li>You will not access the services through automated or non-human means.</li>
              <li>You will not use the services for any illegal or unauthorized purpose.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">User Registration</h2>
            <p className="mb-4">
              You may be required to register to use our services. You agree to keep your password confidential 
              and will be responsible for all use of your account and password. We reserve the right to remove, 
              reclaim, or change a username you select if we determine, in our sole discretion, that such username 
              is inappropriate, obscene, or otherwise objectionable.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Prohibited Activities</h2>
            <p className="mb-4">
              You may not access or use the services for any purpose other than that for which we make them available. 
              The services may not be used in connection with any commercial endeavors except those that are specifically 
              endorsed or approved by us.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, 
              indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, 
              loss of data, or other damages arising from your use of the services, even if we have been advised of the possibility 
              of such damages.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed by and defined following the laws of India. CyberSafe India and yourself 
              irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute 
              which may arise in connection with these terms.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mb-4">
              Email: legal@cybersafeindia.org<br />
              Address: CyberSafe India Headquarters, New Delhi, India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
