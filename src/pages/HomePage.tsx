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
import DemographicPersonalizationEngine from '../components/Common/DemographicPersonalizationEngine';
import MiniThreatFeed from '../components/ThreatFeed/MiniThreatFeed';
import { AutoTranslate } from '../components/Translation/AutoTranslate';

const HomePage: React.FC = () => {
  const demographics = [
    {
      id: 'students',
      icon: BookOpen,
      title: 'demographic.students',
      description: 'demographic.students.desc',
      color: 'bg-peacock-blue',
      hoverColor: 'hover:bg-indigo-blue',
    },
    {
      id: 'professionals',
      icon: Briefcase,
      title: 'demographic.professionals',
      description: 'demographic.professionals.desc',
      color: 'bg-forest-green',
      hoverColor: 'hover:bg-safe-green',
    },
    {
      id: 'homemakers',
      icon: Home,
      title: 'demographic.homemakers',
      description: 'demographic.homemakers.desc',
      color: 'bg-lotus-pink',
      hoverColor: 'hover:bg-rose-gold',
    },
    {
      id: 'rural-users',
      icon: Sprout,
      title: 'demographic.rural',
      description: 'demographic.rural.desc',
      color: 'bg-terracotta',
      hoverColor: 'hover:bg-henna',
    },
    {
      id: 'senior-citizens',
      icon: Heart,
      title: 'demographic.seniors',
      description: 'demographic.seniors.desc',
      color: 'bg-royal-purple',
      hoverColor: 'hover:bg-indigo-blue',
    },
  ];

  const quickStats = [
    { number: '10M+', label: 'stats.protected' },
    { number: '500K+', label: 'stats.prevented' },
    { number: '15+', label: 'stats.languages' },
    { number: '24/7', label: 'stats.support' },
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
      <section className="hero-gradient py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 text-shadow animate-slide-up leading-tight">
              <AutoTranslate text="Secure India's Digital Future" translationKey="hero.title" />
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed animate-slide-up px-4 sm:px-0">
              <AutoTranslate text="Empowering every Indian with cybersecurity knowledge and tools to stay safe online" translationKey="hero.subtitle" />
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-slide-up px-4 sm:px-0">
              <Link to="/learn" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <AutoTranslate text="Start Learning" translationKey="hero.cta.learn" />
              </Link>
              <Link to="/respond" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                Report Scam
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up p-3 sm:p-0">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-digital-orange mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">
                  <AutoTranslate text={stat.label} translationKey={stat.label} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demographics Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading mb-4 sm:mb-6 px-4 sm:px-0">
              <AutoTranslate text="Tailored Cyber Safety for Everyone" translationKey="home.demographics.title" />
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              <AutoTranslate text="Choose your category to get personalized cyber safety guidance and protection strategies designed specifically for your needs." translationKey="home.demographics.subtitle" />
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {demographics.map((demo) => {
              const IconComponent = demo.icon;
              return (
                <Link
                  key={demo.id}
                  to={`/demographic/${demo.id}`}
                  className="demographic-card group p-4 sm:p-6"
                >
                  <div className={`${demo.color} ${demo.hoverColor} w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                    <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-heading mb-2 sm:mb-3">
                    <AutoTranslate text={demo.title} translationKey={demo.title} />
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                    <AutoTranslate text={demo.description} translationKey={demo.description} />
                  </p>
                  <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-primary mx-auto mt-2 sm:mt-4 group-hover:translate-x-2 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demographic Personalization Engine */}
      <DemographicPersonalizationEngine />

      {/* Latest Alerts */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Latest Cyber Alerts</h2>
            </div>
            <Link to="/threats" className="btn-primary w-full sm:w-auto text-center">
              View Threat Intelligence
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {latestAlerts.map((alert) => (
              <div key={alert.id} className="card p-4 sm:p-6 border-l-4 border-l-alert-red">
                <div className="flex items-center mb-3 flex-wrap gap-2">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-alert-red" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.type === 'high' ? 'bg-red-100 text-red-800' :
                    alert.type === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.type.toUpperCase()}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 ml-auto">{alert.time}</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{alert.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{alert.description}</p>
              </div>
            ))}
          </div>

          {/* Mini Threat Feed */}
          <MiniThreatFeed />
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-12 sm:py-16 quick-access-gradient border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-heading">Quick Access</h2>
            <p className="text-lg sm:text-xl text-text-muted px-4 sm:px-0">Get help immediately when you need it most</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            <Link to="/learn" className="bg-saffron bg-opacity-20 backdrop-blur-light rounded-lg p-4 sm:p-6 text-center hover:bg-opacity-30 transition-all group shadow-lg hover:shadow-xl border border-saffron/30 hover:border-saffron/60">
              <div className="bg-saffron/30 p-3 sm:p-4 rounded-full inline-flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-saffron group-hover:text-white transition-all">
                <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 group-hover:scale-110 transition-transform text-text" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-heading">Learn</h3>
            </Link>
            
            <Link to="/threats" className="bg-red-500 bg-opacity-20 backdrop-blur-light rounded-lg p-4 sm:p-6 text-center hover:bg-opacity-30 transition-all group shadow-lg hover:shadow-xl border border-red-500/30 hover:border-red-500/60">
              <div className="bg-red-500/30 p-3 sm:p-4 rounded-full inline-flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-red-500 group-hover:text-white transition-all">
                <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 group-hover:scale-110 transition-transform text-text" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-heading">Threats</h3>
            </Link>
            
            <Link to="/respond" className="bg-alert-red bg-opacity-20 backdrop-blur-light rounded-lg p-4 sm:p-6 text-center hover:bg-opacity-30 transition-all group shadow-lg hover:shadow-xl border border-alert-red/30 hover:border-alert-red/60">
              <div className="bg-alert-red/30 p-3 sm:p-4 rounded-full inline-flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-alert-red group-hover:text-white transition-all">
                <Phone className="h-10 w-10 sm:h-12 sm:w-12 group-hover:scale-110 transition-transform text-text" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-heading">Get Help</h3>
            </Link>
            
            <Link to="/community" className="bg-forest-green bg-opacity-20 backdrop-blur-light rounded-lg p-4 sm:p-6 text-center hover:bg-opacity-30 transition-all group shadow-lg hover:shadow-xl border border-forest-green/30 hover:border-forest-green/60">
              <div className="bg-forest-green/30 p-3 sm:p-4 rounded-full inline-flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-forest-green group-hover:text-white transition-all">
                <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 group-hover:scale-110 transition-transform text-text" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-heading">Community</h3>
            </Link>
            
            <Link to="/resources" className="bg-mango-yellow bg-opacity-20 backdrop-blur-light rounded-lg p-4 sm:p-6 text-center hover:bg-opacity-30 transition-all group shadow-lg hover:shadow-xl border border-mango-yellow/30 hover:border-mango-yellow/60">
              <div className="bg-mango-yellow/30 p-3 sm:p-4 rounded-full inline-flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-mango-yellow group-hover:text-peacock-blue transition-all">
                <Download className="h-10 w-10 sm:h-12 sm:w-12 group-hover:scale-110 transition-transform text-text" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-heading">Resources</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Trusted by Government & Experts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 opacity-70">
            <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/50">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-safe-green flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">CERT-In Verified</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/50">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-safe-green flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">RBI Guidelines</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/50">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-safe-green flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">Digital India Initiative</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/50">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-safe-green flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">Cybercrime.gov.in</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;