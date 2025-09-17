import React, { useState } from 'react';
import { Search, Filter, Download, Star, Users, Calendar, Clock } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'guides', label: 'Security Guides' },
    { id: 'videos', label: 'Video Tutorials' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'tools', label: 'Security Tools' },
  ];

  const downloadableGuides = [
    {
      id: 1,
      title: 'Complete Guide to UPI Safety',
      description: 'Comprehensive guide covering all aspects of UPI security, common scams, and protection strategies.',
      format: 'PDF',
      size: '2.4 MB',
      downloads: 15420,
      rating: 4.8,
      category: 'guides',
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Social Media Privacy Checklist',
      description: 'Step-by-step checklist to secure your Facebook, WhatsApp, Instagram, and Twitter accounts.',
      format: 'PDF',
      size: '1.8 MB',
      downloads: 12890,
      rating: 4.7,
      category: 'guides',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Password Security Best Practices',
      description: 'Learn how to create, manage, and protect your passwords effectively.',
      format: 'PDF',
      size: '1.2 MB',
      downloads: 9640,
      rating: 4.9,
      category: 'guides',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    },
  ];

  const videoTutorials = [
    {
      id: 1,
      title: 'How to Spot Email Phishing Attempts',
      description: 'Visual guide to identifying and avoiding phishing emails with real examples.',
      duration: '8:45',
      views: 45600,
      rating: 4.6,
      category: 'videos',
      thumbnail: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Safe Online Banking Tutorial',
      description: 'Complete tutorial on safely using internet banking and mobile banking apps.',
      duration: '12:30',
      views: 38900,
      rating: 4.8,
      category: 'videos',
      thumbnail: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    },
  ]; 

  const upcomingWorkshops = [
    {
      id: 1,
      title: 'Cybersecurity for Senior Citizens',
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
      description: 'Protecting your business from cyber threats and data breaches.',
      date: '2024-03-25',
      time: '2:00 PM - 4:00 PM',
      instructor: 'Rajesh Kumar',
      participants: 89,
      maxParticipants: 150,
      mode: 'Hybrid',
      category: 'workshops',
    },
  ];

  const filteredGuides = downloadableGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access comprehensive guides, tutorials, and tools to enhance your cybersecurity knowledge
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{guide.title}</h3>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{guide.format}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{guide.size}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{guide.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoTutorials.map((video) => (
              <div key={video.id} className="card overflow-hidden">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-8 border-l-cyber-blue border-y-6 border-y-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{video.title}</h3>
                  <p className="text-gray-600 mb-4">{video.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{video.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{video.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full btn-secondary">
                    Watch Tutorial
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Workshops */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Workshops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingWorkshops.map((workshop) => (
              <div key={workshop.id} className="card">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{workshop.title}</h3>
                  <p className="text-gray-600 mb-4">{workshop.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{workshop.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{workshop.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {workshop.participants}/{workshop.maxParticipants} participants
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-900">Instructor: {workshop.instructor}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {workshop.mode}
                    </span>
                  </div>
                  
                  <button className="w-full btn-primary">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;