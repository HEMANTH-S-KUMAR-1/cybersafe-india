import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  AlertTriangle, 
  FileText, 
  ExternalLink, 
  Clock, 
  CheckCircle,
  Shield,
  MessageSquare,
  Copy,
  MapPin
} from 'lucide-react';

const RespondPage: React.FC = () => {
  const [reportType, setReportType] = useState('');
  const [copied, setCopied] = useState('');

  const emergencyContacts = [
    {
      id: 'cyber-helpline',
      name: 'Cyber Crime Helpline',
      number: '155260',
      description: 'National cybercrime reporting and assistance',
      available: '24/7',
    },
    {
      id: 'banking-fraud',
      name: 'Banking Fraud Helpline',
      number: '1930',
      description: 'Report banking and financial frauds',
      available: '24/7',
    },
    {
      id: 'cert-in',
      name: 'CERT-In',
      email: 'incident@cert-in.org.in',
      description: 'Computer Emergency Response Team',
      available: 'Business Hours',
    },
  ];

  const reportingSteps = [
    {
      step: 1,
      title: 'Stay Calm & Document',
      description: 'Take screenshots, save emails, note down details',
      icon: FileText,
    },
    {
      step: 2,
      title: 'Secure Your Accounts',
      description: 'Change passwords, enable 2FA, log out of devices',
      icon: Shield,
    },
    {
      step: 3,
      title: 'Report to Authorities',
      description: 'File complaint on cybercrime.gov.in or call helpline',
      icon: Phone,
    },
    {
      step: 4,
      title: 'Monitor & Follow Up',
      description: 'Keep checking account statements and complaint status',
      icon: Clock,
    },
  ];

  const scamTypes = [
    { id: 'upi-fraud', label: 'UPI/Payment Fraud' },
    { id: 'phishing', label: 'Phishing/Fake Emails' },
    { id: 'identity-theft', label: 'Identity Theft' },
    { id: 'investment-scam', label: 'Investment Scams' },
    { id: 'job-fraud', label: 'Job/Employment Fraud' },
    { id: 'social-media', label: 'Social Media Scams' },
    { id: 'other', label: 'Other' },
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <AlertTriangle className="h-16 w-16 text-warning-red mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Respond to Cyber Threats
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Been scammed or suspect fraudulent activity? Get immediate help and learn how to respond effectively.
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-8 w-8 text-warning-red flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-2">
                🚨 Immediate Action Required?
              </h2>
              <p className="text-red-800 mb-4">
                If you've lost money or shared sensitive information (bank details, passwords, OTP), 
                <strong> call the Cyber Crime Helpline immediately: 155260</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:155260" 
                  className="btn-primary bg-warning-red hover:bg-red-700 text-center"
                >
                  <Phone className="h-4 w-4 mr-2 inline" />
                  Call 155260 Now
                </a>
                <a 
                  href="https://cybercrime.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary border-red-500 text-red-600 hover:bg-red-50 text-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2 inline" />
                  Report Online
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Response Steps */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What to Do If You're Scammed
            </h2>
            
            <div className="space-y-6">
              {reportingSteps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.step} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg">
                    <div className="bg-cyber-blue text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <IconComponent className="h-6 w-6 text-cyber-blue mr-3" />
                        <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Emergency Contacts
            </h2>
            
            <div className="space-y-4 mb-8">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="card p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {contact.available}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{contact.description}</p>
                  
                  <div className="flex items-center space-x-4">
                    {contact.number && (
                      <div className="flex items-center space-x-2">
                        <a 
                          href={`tel:${contact.number}`}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          {contact.number}
                        </a>
                        <button
                          onClick={() => copyToClipboard(contact.number, contact.id)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                          title="Copy number"
                        >
                          {copied === contact.id ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    )}
                    
                    {contact.email && (
                      <div className="flex items-center space-x-2">
                        <a 
                          href={`mailto:${contact.email}`}
                          className="btn-secondary text-sm px-4 py-2"
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </a>
                        <button
                          onClick={() => copyToClipboard(contact.email, `${contact.id}-email`)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                          title="Copy email"
                        >
                          {copied === `${contact.id}-email` ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Report Form */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Incident Report</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Incident
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <option value="">Select incident type</option>
                    {scamTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brief Description
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                    placeholder="Describe what happened..."
                  />
                </div>
                
                <button type="submit" className="w-full btn-primary">
                  <FileText className="h-4 w-4 mr-2 inline" />
                  Submit Report
                </button>
              </form>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This is a preliminary report. For official complaints, 
                  please visit <a href="https://cybercrime.gov.in" className="underline">cybercrime.gov.in</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Additional Support Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-cyber-blue mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Connect with others who have faced similar situations
              </p>
              <a href="/community" className="btn-secondary text-sm">
                Join Community
              </a>
            </div>
            
            <div className="text-center">
              <MapPin className="h-12 w-12 text-cyber-blue mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Police Stations</h3>
              <p className="text-gray-600 text-sm mb-4">
                Find cyber crime units near you
              </p>
              <button className="btn-secondary text-sm">
                Find Near Me
              </button>
            </div>
            
            <div className="text-center">
              <Shield className="h-12 w-12 text-cyber-blue mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Prevention Tips</h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn how to protect yourself in the future
              </p>
              <a href="/learn" className="btn-secondary text-sm">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RespondPage;