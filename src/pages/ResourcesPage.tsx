import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Video, 
  Calendar, 
  Users, 
  Play,
  ExternalLink,
  Search,
  Star,
  ChevronRight
} from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', hindi: 'सभी संसाधन' },
    { id: 'guides', label: 'Safety Guides', hindi: 'सुरक्षा गाइड' },
    { id: 'videos', label: 'Video Tutorials', hindi: 'वीडियो ट्यूटोरियल' },
    { id: 'workshops', label: 'Workshops', hindi: 'कार्यशालाएं' },
    { id: 'tools', label: 'Security Tools', hindi: 'सुरक्षा उपकरण' },
  ];

  const languages = [
    { id: 'all', name: 'All Languages', native: 'सभी भाषाएं' },
    { id: 'hindi', name: 'Hindi', native: 'हिंदी' },
    { id: 'english', name: 'English', native: 'English' },
    { id: 'tamil', name: 'Tamil', native: 'தமிழ்' },
    { id: 'kannada', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { id: 'bengali', name: 'Bengali', native: 'বাংলা' },
  ];

  const downloadableGuides = [
    {
      id: 1,
      title: 'Complete Guide to UPI Safety',
      hindi: 'UPI सुरक्षा की संपूर्ण गाइड',
      description: 'Comprehensive guide covering all aspects of UPI security, common scams, and protection strategies.',
      format: 'PDF',
      size: '2.4 MB',
      downloads: 15420,
      rating: 4.8,
      languages: ['hindi', 'english', 'tamil'],
      category: 'guides',
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Social Media Privacy Checklist',
      hindi: 'सोशल मीडिया प्राइवेसी चेकलिस्ट',
      description: 'Step-by-step checklist to secure your Facebook, WhatsApp, Instagram, and Twitter accounts.',
      format: 'PDF',
      size: '1.8 MB',
      downloads: 12890,
      rating: 4.7,
      languages: ['hindi', 'english'],
      category: 'guides',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Password Security Best Practices',
      hindi: 'पासवर्ड सुरक्षा की सर्वोत्तम प्रथाएं',
      description: 'Learn how to create, manage, and protect your passwords effectively.',
      format: 'PDF',
      size: '1.2 MB',
      downloads: 9640,
      rating: 4.9,
      languages: ['hindi', 'english', 'kannada'],
      category: 'guides',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    },
  ];

  const videoTutorials = [
    {
      id: 1,
      title: 'How to Spot Email Phishing Attempts',
      hindi: 'ईमेल फ़िशिंग की पहचान कैसे करें',
      description: 'Visual guide to identifying and avoiding phishing emails with real examples.',
      duration: '8:45',
      views: 45600,
      rating: 4.6,
      languages: ['hindi', 'english'],
      category: 'videos',
      thumbnail: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Safe Online Banking Tutorial',
      hindi: 'सुरक्षित ऑनलाइन बैंकिंग ट्यूटोरियल',
      description: 'Complete tutorial on safely using internet banking and mobile banking apps.',
      duration: '12:30',
      views: 38900,
      rating: 4.8,
      languages: ['hindi', 'english', 'tamil'],
      category: 'videos',
      thumbnail: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    },
  ];

  const upcomingWorkshops = [
    {
      id: 1,
      title: 'Cybersecurity for Senior Citizens',
      hindi: 'वरिष्ठ नागरिकों के लिए साइबर सुरक्षा',
      description: 'Special workshop designed for users above 60 years, covering basic digital safety.',
      date: '2024-03-20',
      time: '10:00 AM - 12:00 PM',
      instructor: 'Dr. Priya Sharma',
      participants: 156,
      maxParticipants: 200,
      mode: 'Online',
      category: 'workshops',
    },
    {
      id: 2,
      title: 'Small Business Cyber Protection',
      hindi: 'छोटे व्यवसाय साइबर सुरक्षा',
      description: 'Essential cybersecurity practices for small business owners and entrepreneurs.',
      date: '2024-03-25',
      time: '2:00 PM - 4:00 PM',
      instructor: 'Mr. Rajesh Kumar',
      participants: 89,
      maxParticipants: 150,
      mode: 'Hybrid',
      category: 'workshops',
    },
  ];

  const partnerOrganizations = [
    {
      name: 'CERT-In',
      description: 'Computer Emergency Response Team India',
      logo: '🏛️',
      website: 'https://cert-in.org.in',
    },
    {
      name: 'RBI',
      description: 'Reserve Bank of India',
      logo: '🏦',
      website: 'https://rbi.org.in',
    },
    {
      name: 'Digital India',
      description: 'Digital India Initiative',
      logo: '🇮🇳',
      website: 'https://digitalindia.gov.in',
    },
    {
      name: 'Cybercrime.gov.in',
      description: 'National Cybercrime Reporting Portal',
      logo: '⚖️',
      website: 'https://cybercrime.gov.in',
    },
  ];

  const filteredGuides = downloadableGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.hindi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || guide.languages.includes(selectedLanguage);
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Download className="h-16 w-16 text-cyber-blue mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resources & Downloads
          </h1>
          <p className="hindi text-xl text-gray-600 mb-4">संसाधन और डाउनलोड</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Free guides, video tutorials, workshops, and tools to help you stay safe online. 
            Available in multiple Indian languages.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>{lang.native}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Popular Downloads */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Downloads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <div key={guide.id} className="card overflow-hidden">
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                  <p className="hindi text-sm text-gray-600 mb-3">{guide.hindi}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{guide.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {guide.format} • {guide.size}
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {guide.rating}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-1">
                      {guide.languages.map(lang => {
                        const langObj = languages.find(l => l.id === lang);
                        return (
                          <span key={lang} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {langObj?.native}
                          </span>
                        );
                      })}
                    </div>
                    <span className="text-sm text-gray-500">{guide.downloads} downloads</span>
                  </div>
                  
                  <button className="w-full btn-primary">
                    <Download className="h-4 w-4 mr-2" />
                    Download Guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Tutorials */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Video Tutorials</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {videoTutorials.map((video) => (
              <div key={video.id} className="card overflow-hidden">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all">
                      <Play className="h-8 w-8 text-cyber-blue ml-1" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <p className="hindi text-sm text-gray-600 mb-3">{video.hindi}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{video.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Video className="h-4 w-4 mr-1" />
                      {video.views.toLocaleString()} views
                    </span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {video.rating}
                    </span>
                  </div>
                  
                  <button className="w-full btn-primary">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Workshops */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Workshops</h2>
            <div className="space-y-6">
              {upcomingWorkshops.map((workshop) => (
                <div key={workshop.id} className="card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{workshop.title}</h3>
                      <p className="hindi text-sm text-gray-600 mb-3">{workshop.hindi}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {workshop.mode}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{workshop.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(workshop.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {workshop.participants}/{workshop.maxParticipants}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    <strong>Time:</strong> {workshop.time}<br/>
                    <strong>Instructor:</strong> {workshop.instructor}
                  </div>
                  
                  <button className="w-full btn-primary">
                    Register for Workshop
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Organizations */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Partner Organizations</h2>
            <div className="space-y-4 mb-8">
              {partnerOrganizations.map((org, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{org.logo}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{org.name}</h3>
                      <p className="text-gray-600 text-sm">{org.description}</p>
                    </div>
                    <a 
                      href={org.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyber-blue hover:text-blue-700"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Tools */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Security Tools</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Password Strength Checker</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Test how strong your passwords are</p>
                </button>
                
                <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Phishing Email Simulator</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Practice identifying fake emails</p>
                </button>
                
                <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Privacy Settings Guide</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Step-by-step privacy configuration</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;