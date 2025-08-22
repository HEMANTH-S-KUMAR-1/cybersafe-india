import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  BookOpen, 
  Briefcase, 
  Home, 
  Sprout, 
  Heart, 
  Shield,
  AlertTriangle,
  CheckCircle,
  PlayCircle,
  Download,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';

const DemographicPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();

  const demographicData = {
    students: {
      icon: BookOpen,
      title: 'Students',
      hindi: 'छात्र',
      description: 'Cybersecurity guidance for students navigating online learning and social platforms',
      color: 'bg-blue-500',
      commonThreats: [
        'Fake scholarship scams',
        'Assignment help fraud',
        'Social media bullying',
        'Online gaming scams',
        'Exam leak scams'
      ],
      tips: [
        'Never share personal details on public forums',
        'Verify scholarship offers through official channels',
        'Use strong passwords for all accounts',
        'Be careful about what you post on social media',
        'Report cyberbullying immediately'
      ],
      resources: [
        { title: 'Student Safety Guide', type: 'PDF', size: '1.2MB' },
        { title: 'Social Media Privacy Settings', type: 'Video', duration: '8:30' },
        { title: 'Online Learning Security', type: 'Guide', pages: 12 }
      ]
    },
    professionals: {
      icon: Briefcase,
      title: 'Professionals',
      hindi: 'पेशेवर',
      description: 'Workplace cybersecurity and professional data protection strategies',
      color: 'bg-green-500',
      commonThreats: [
        'Business email compromise',
        'Fake job offers',
        'LinkedIn phishing',
        'Remote work scams',
        'Corporate data theft'
      ],
      tips: [
        'Always verify emails from colleagues or clients',
        'Use VPN for remote work connections',
        'Keep work and personal accounts separate',
        'Regularly update your professional software',
        'Be cautious about sharing work information online'
      ],
      resources: [
        { title: 'Workplace Security Guide', type: 'PDF', size: '2.1MB' },
        { title: 'Remote Work Safety', type: 'Video', duration: '12:45' },
        { title: 'Email Security Best Practices', type: 'Checklist', items: 15 }
      ]
    },
    homemakers: {
      icon: Home,
      title: 'Homemakers',
      hindi: 'गृहिणी',
      description: 'Safe online shopping and family digital safety guidance',
      color: 'bg-pink-500',
      commonThreats: [
        'Online shopping fraud',
        'Fake product reviews',
        'Home service scams',
        'Recipe website malware',
        'Family emergency scams'
      ],
      tips: [
        'Shop only on trusted websites',
        'Check seller ratings and reviews',
        'Never share OTP with anyone',
        'Verify before clicking on deals and offers',
        'Protect your family\'s online activities'
      ],
      resources: [
        { title: 'Safe Shopping Guide', type: 'PDF', size: '1.8MB' },
        { title: 'Family Cyber Safety', type: 'Video', duration: '10:20' },
        { title: 'Online Payment Security', type: 'Tutorial', steps: 8 }
      ]
    },
    'rural-users': {
      icon: Sprout,
      title: 'Rural Users',
      hindi: 'ग्रामीण उपयोगकर्ता',
      description: 'Simple cybersecurity for new internet users in rural areas',
      color: 'bg-orange-500',
      commonThreats: [
        'Digital payment fraud',
        'Government scheme scams',
        'Fake agriculture loans',
        'Mobile recharge scams',
        'Land registration fraud'
      ],
      tips: [
        'Always verify government scheme information',
        'Never share bank details over phone',
        'Use simple, secure passwords',
        'Ask for help from trusted sources',
        'Be careful with unknown calls and messages'
      ],
      resources: [
        { title: 'Digital India Safety (Hindi)', type: 'PDF', size: '900KB' },
        { title: 'Banking Basics Video', type: 'Video', duration: '15:00' },
        { title: 'Government Scheme Verification', type: 'Guide', pages: 6 }
      ]
    },
    'senior-citizens': {
      icon: Heart,
      title: 'Senior Citizens',
      hindi: 'वरिष्ठ नागरिक',
      description: 'Easy-to-understand cybersecurity for senior citizens',
      color: 'bg-purple-500',
      commonThreats: [
        'Health insurance scams',
        'Pension-related fraud',
        'Fake medical offers',
        'Grandparent scams',
        'Tech support fraud'
      ],
      tips: [
        'Never give personal information over phone',
        'Ask family members to verify suspicious calls',
        'Keep important numbers handy',
        'Don\'t rush into online offers',
        'Seek help for online transactions'
      ],
      resources: [
        { title: 'Senior Safety Manual', type: 'PDF', size: '1.5MB' },
        { title: 'Large Print Security Guide', type: 'PDF', size: '2.0MB' },
        { title: 'Voice Tutorial: Safe Internet Use', type: 'Audio', duration: '20:00' }
      ]
    }
  };

  const data = type ? demographicData[type as keyof typeof demographicData] : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-heading mb-4">Category Not Found</h1>
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = data.icon;

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary-hover mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            
            <div className={`${data.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
              <IconComponent className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              Cybersecurity for {data.title}
            </h1>
            <p className="hindi text-2xl text-text-secondary mb-6">{data.hindi} के लिए साइबर सुरक्षा</p>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Common Threats */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-heading mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 text-warning-red mr-3" />
                Common Threats You Face
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.commonThreats.map((threat, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <Shield className="h-5 w-5 text-warning-red flex-shrink-0" />
                    <span className="text-text text-sm">{threat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-heading mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 text-success-green mr-3" />
                Essential Safety Tips
              </h2>
              <div className="space-y-4">
                {data.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success-green flex-shrink-0 mt-0.5" />
                    <span className="text-text leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Learning */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-heading mb-6 flex items-center">
                <PlayCircle className="h-6 w-6 text-primary mr-3" />
                Interactive Learning Modules
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
                  <div className="bg-primary-light w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-heading mb-2">Basic Security Course</h3>
                  <p className="text-text-secondary text-sm mb-4">Tailored for your specific needs and experience level</p>
                  <button className="btn-primary text-sm px-4 py-2">
                    Start Learning
                  </button>
                </div>
                
                <div className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow">
                  <div className="bg-success-light w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold text-heading mb-2">Practical Scenarios</h3>
                  <p className="text-text-secondary text-sm mb-4">Real-world examples and how to handle them</p>
                  <button className="btn-primary text-sm px-4 py-2">
                    Practice Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-heading mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/respond" className="w-full btn-primary text-center block">
                  <AlertTriangle className="h-4 w-4 mr-2 inline" />
                  Report a Scam
                </Link>
                <Link to="/community" className="w-full btn-secondary text-center block">
                  <MessageSquare className="h-4 w-4 mr-2 inline" />
                  Ask Community
                </Link>
                <Link to="/learn" className="w-full btn-secondary text-center block">
                  <BookOpen className="h-4 w-4 mr-2 inline" />
                  More Learning
                </Link>
              </div>
            </div>

            {/* Tailored Resources */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-heading mb-4">Tailored Resources</h3>
              <div className="space-y-4">
                {data.resources.map((resource, index) => (
                  <div key={index} className="p-4 bg-surface-hover rounded-lg">
                    <h4 className="font-medium text-heading mb-2">{resource.title}</h4>
                    <div className="flex items-center justify-between text-sm text-text-secondary">
                      <span>{resource.type}</span>
                      <span>
                        {'size' in resource && resource.size}
                        {'duration' in resource && resource.duration}
                        {'pages' in resource && `${resource.pages} pages`}
                        {'items' in resource && `${resource.items} items`}
                        {'steps' in resource && `${resource.steps} steps`}
                      </span>
                    </div>
                    <button className="w-full mt-3 text-cyber-blue hover:text-blue-700 text-sm font-medium flex items-center justify-center">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-3">
                Need Immediate Help?
              </h3>
              <p className="text-red-800 text-sm mb-4">
                If you're currently facing a cyber threat or have been scammed:
              </p>
              <div className="space-y-2">
                <a href="tel:155260" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-center block">
                  Call 155260
                </a>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="w-full bg-white border border-red-300 text-red-600 font-semibold py-2 px-4 rounded-lg text-center block hover:bg-red-50">
                  Report Online
                </a>
              </div>
            </div>

            {/* Success Stories */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Stories</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-700 italic mb-2">
                    "Thanks to CyberSafe India, I avoided a Rs. 15,000 fake scholarship scam!"
                  </p>
                  <p className="text-xs text-gray-500">- Priya, Student from Chennai</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-700 italic mb-2">
                    "The community helped me recover from a payment fraud. Very grateful!"
                  </p>
                  <p className="text-xs text-gray-500">- Rajesh, Professional from Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemographicPage;