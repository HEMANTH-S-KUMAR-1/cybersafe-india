import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Home, 
  Sprout, 
  Heart, 
  AlertTriangle, 
  BookOpen,
  MessageSquare,
  Download,
  ArrowRight,
  CheckCircle,
  Phone
} from 'lucide-react';
import AlertBanner from '../components/Common/AlertBanner';

const HomePage: React.FC = () => {
  const demographics = [
    {
      id: 'students',
      icon: BookOpen,
      title: 'Students',
      hindi: 'छात्र',
      description: 'Safe online learning and social media practices',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      id: 'professionals',
      icon: Briefcase,
      title: 'Professionals',
      hindi: 'पेशेवर',
      description: 'Workplace cybersecurity and data protection',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
    },
    {
      id: 'homemakers',
      icon: Home,
      title: 'Homemakers',
      hindi: 'गृहिणी',
      description: 'Online shopping and family safety tips',
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
    },
    {
      id: 'rural-users',
      icon: Sprout,
      title: 'Rural Users',
      hindi: 'ग्रामीण उपयोगकर्ता',
      description: 'Simple cyber safety for new internet users',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
    },
    {
      id: 'senior-citizens',
      icon: Heart,
      title: 'Senior Citizens',
      hindi: 'वरिष्ठ नागरिक',
      description: 'Easy-to-understand security guidance',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
  ];

  const quickStats = [
    { number: '10M+', label: 'Users Protected', hindi: 'सुरक्षित उपयोगकर्ता' },
    { number: '500K+', label: 'Scams Prevented', hindi: 'धोखाधड़ी रोकी गई' },
    { number: '15+', label: 'Languages', hindi: 'भाषाएं' },
    { number: '24/7', label: 'Support', hindi: 'सहायता' },
  ];

  const latestAlerts = [
    {
      id: 1,
      type: 'high',
      title: 'New UPI Scam Alert',
      description: 'Fraudsters posing as bank officials requesting UPI PIN verification',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'medium',
      title: 'Fake Job Offer Emails',
      description: 'Phishing emails promising high-paying remote jobs',
      time: '6 hours ago',
    },
    {
      id: 3,
      type: 'low',
      title: 'WhatsApp Privacy Update',
      description: 'New privacy settings available - review your preferences',
      time: '1 day ago',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Alert Banner */}
      <AlertBanner />

      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-shadow animate-slide-up">
              Stay Safe Online
              <span className="block text-cyber-blue mt-2">Cyber Awareness for All</span>
            </h1>
            <p className="hindi text-2xl md:text-3xl font-semibold text-gray-700 mb-8 animate-slide-up">
              साइबर सुरक्षा सभी के लिए
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed animate-slide-up">
              Empowering every Indian with the knowledge and tools to navigate the digital world safely. 
              From students to seniors, rural to urban - cyber safety made simple and accessible.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
              <Link to="/learn" className="btn-primary text-lg px-8 py-4">
                Start Learning
                <span className="block text-sm hindi">सीखना शुरू करें</span>
              </Link>
              <Link to="/respond" className="btn-secondary text-lg px-8 py-4">
                Report Scam
                <span className="block text-sm hindi">शिकायत करें</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up">
                <div className="text-3xl md:text-4xl font-bold text-cyber-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
                <div className="text-sm hindi text-gray-500">{stat.hindi}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demographics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tailored Cyber Safety for Everyone
            </h2>
            <p className="hindi text-xl text-gray-600 mb-2">हर किसी के लिए अनुकूलित साइबर सुरक्षा</p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose your category to get personalized cyber safety guidance and protection strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {demographics.map((demo) => {
              const IconComponent = demo.icon;
              return (
                <Link
                  key={demo.id}
                  to={`/demographic/${demo.id}`}
                  className="demographic-card group"
                >
                  <div className={`${demo.color} ${demo.hoverColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{demo.title}</h3>
                  <p className="hindi text-sm text-gray-600 mb-3">{demo.hindi}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{demo.description}</p>
                  <ArrowRight className="h-5 w-5 text-cyber-blue mx-auto mt-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Alerts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Cyber Alerts</h2>
              <p className="hindi text-lg text-gray-600">नवीनतम साइबर अलर्ट</p>
            </div>
            <Link to="/respond" className="btn-primary">
              View All Alerts
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestAlerts.map((alert) => (
              <div key={alert.id} className="card p-6 border-l-4 border-l-warning-red">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="h-5 w-5 text-warning-red mr-2" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.type === 'high' ? 'bg-red-100 text-red-800' :
                    alert.type === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.type.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500 ml-auto">{alert.time}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{alert.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{alert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-cyber-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Access</h2>
            <p className="hindi text-xl mb-2">त्वरित पहुंच</p>
            <p className="text-xl opacity-90">Get help immediately when you need it most</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/learn" className="bg-white bg-opacity-10 backdrop-blur-light rounded-lg p-6 text-center hover:bg-opacity-20 transition-all group">
              <BookOpen className="h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Learn</h3>
              <p className="hindi text-sm opacity-75">सीखें</p>
            </Link>
            
            <Link to="/respond" className="bg-white bg-opacity-10 backdrop-blur-light rounded-lg p-6 text-center hover:bg-opacity-20 transition-all group">
              <Phone className="h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Get Help</h3>
              <p className="hindi text-sm opacity-75">सहायता</p>
            </Link>
            
            <Link to="/community" className="bg-white bg-opacity-10 backdrop-blur-light rounded-lg p-6 text-center hover:bg-opacity-20 transition-all group">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="hindi text-sm opacity-75">समुदाय</p>
            </Link>
            
            <Link to="/resources" className="bg-white bg-opacity-10 backdrop-blur-light rounded-lg p-6 text-center hover:bg-opacity-20 transition-all group">
              <Download className="h-12 w-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">Resources</h3>
              <p className="hindi text-sm opacity-75">संसाधन</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Trusted by Government & Experts</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-success-green" />
              <span className="font-medium">CERT-In Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-success-green" />
              <span className="font-medium">RBI Guidelines</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-success-green" />
              <span className="font-medium">Digital India Initiative</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-success-green" />
              <span className="font-medium">Cybercrime.gov.in</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;