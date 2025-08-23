import React from 'react';
import { MessageSquare, Users, Award, TrendingUp, Clock, Heart, Star, ChevronRight } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const forumCategories = [
    {
      id: 'general',
      title: 'General Discussion',
      description: 'Share experiences and ask general cybersecurity questions',
      posts: 1247,
      members: 8950,
      color: 'bg-blue-500',
    },
    {
      id: 'scam-alerts',
      title: 'Scam Alerts',
      description: 'Report and discuss latest scam techniques',
      posts: 892,
      members: 12340,
      color: 'bg-red-500',
    },
    {
      id: 'success-stories',
      title: 'Success Stories',
      description: 'Share how you avoided or recovered from scams',
      posts: 456,
      members: 6780,
      color: 'bg-green-500',
    },
    {
      id: 'expert-advice',
      title: 'Expert Advice',
      description: 'Get guidance from cybersecurity professionals',
      posts: 234,
      members: 4560,
      color: 'bg-purple-500',
    },
  ];

  const successStories = [
    {
      id: 1,
      title: 'How I Avoided a Rs. 50,000 UPI Scam',
      author: 'Priya S.',
      location: 'Mumbai',
      summary: 'A fraudster called claiming to be from my bank. Thanks to CyberSafe India training, I recognized the red flags...',
      likes: 234,
      comments: 45,
      timeAgo: '2 days ago',
      category: 'UPI Fraud',
    },
    {
      id: 2,
      title: 'Recovered Money from Investment Scam',
      author: 'Rajesh K.',
      location: 'Bangalore',
      summary: 'I lost Rs. 25,000 to a fake investment scheme but followed the recovery steps and got my money back...',
      likes: 189,
      comments: 67,
      timeAgo: '1 week ago',
      category: 'Investment Fraud',
    },
    {
      id: 3,
      title: 'Protected My Parents from WhatsApp Scam',
      author: 'Anita M.',
      location: 'Delhi',
      summary: 'Educated my elderly parents about WhatsApp scams. They almost fell for a fake emergency message...',
      likes: 156,
      comments: 32,
      timeAgo: '3 days ago',
      category: 'Social Media',
    },
  ];

  const expertTalks = [
    {
      id: 1,
      title: 'Protecting Yourself from Cryptocurrency Scams',
      expert: 'Dr. Amit Sharma',
      designation: 'Cybersecurity Expert, CERT-In',
      date: 'March 15, 2024',
      duration: '45 mins',
      attendees: 2340,
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Safe Online Banking Practices',
      expert: 'Ms. Kavya Reddy',
      designation: 'Banking Security Specialist',
      date: 'March 8, 2024',
      duration: '30 mins',
      attendees: 1890,
      status: 'completed',
    },
    {
      id: 3,
      title: 'Social Media Privacy Settings',
      expert: 'Mr. Rohit Gupta',
      designation: 'Digital Privacy Consultant',
      date: 'March 22, 2024',
      duration: '40 mins',
      attendees: 1560,
      status: 'upcoming',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Users className="h-16 w-16 text-cyber-blue mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CyberSafe Community
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with fellow Indians, share experiences, learn from experts, and build a safer digital community together.
          </p>
        </div>

        {/* Community Stats */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyber-blue mb-2">50K+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">2.8K</div>
              <div className="text-gray-600">Success Stories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 mb-2">150+</div>
              <div className="text-gray-600">Expert Sessions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">Rs. 2Cr+</div>
              <div className="text-gray-600">Money Saved</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forum Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Discussion Forums</h2>
            <div className="space-y-4 mb-8">
              {forumCategories.map((category) => (
                <div key={category.id} className="card p-6 hover:shadow-xl cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                        <MessageSquare className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{category.posts} posts</div>
                      <div className="text-sm text-gray-500">{category.members.toLocaleString()} members</div>
                      <ChevronRight className="h-5 w-5 text-gray-400 mt-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Success Stories */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Success Stories</h2>
            <div className="space-y-6">
              {successStories.map((story) => (
                <div key={story.id} className="card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>By {story.author}</span>
                        <span>•</span>
                        <span>{story.location}</span>
                        <span>•</span>
                        <span>{story.timeAgo}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {story.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">{story.summary}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-red-500">
                        <Heart className="h-4 w-4" />
                        <span>{story.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500">
                        <MessageSquare className="h-4 w-4" />
                        <span>{story.comments}</span>
                      </button>
                    </div>
                    <button className="text-cyber-blue hover:text-blue-700 text-sm font-medium">
                      Read Full Story
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Expert Talks */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                Expert Talks
              </h3>
              <div className="space-y-4">
                {expertTalks.map((talk) => (
                  <div key={talk.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        talk.status === 'upcoming' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {talk.status}
                      </span>
                      <span className="text-xs text-gray-500">{talk.date}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{talk.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{talk.expert}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {talk.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {talk.attendees}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 btn-primary text-sm">
                View All Sessions
              </button>
            </div>

            {/* Top Contributors */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 text-yellow-500 mr-2" />
                Top Contributors
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Vikash Kumar', posts: 156, badge: 'Cyber Guardian' },
                  { name: 'Meera Patel', posts: 134, badge: 'Scam Spotter' },
                  { name: 'Arjun Singh', posts: 128, badge: 'Community Helper' },
                  { name: 'Sunita Devi', posts: 112, badge: 'Safety Advocate' },
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{contributor.name}</div>
                      <div className="text-xs text-gray-500">{contributor.badge}</div>
                    </div>
                    <div className="text-sm text-cyber-blue font-semibold">
                      {contributor.posts} posts
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                Trending Topics
              </h3>
              <div className="space-y-2">
                {[
                  '#UPIScamAlert',
                  '#CryptocurrencyFraud',
                  '#WhatsAppSafety',
                  '#OnlineBanking',
                  '#DigitalPayments',
                ].map((topic, index) => (
                  <div key={index} className="text-sm text-cyber-blue hover:text-blue-700 cursor-pointer">
                    {topic}
                  </div>
                ))}
              </div>
            </div>

            {/* Join Community CTA */}
            <div className="bg-gradient-to-br from-cyber-blue to-blue-700 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Join Our Community</h3>
              <p className="text-sm opacity-90 mb-4">
                Connect with 50,000+ Indians fighting cybercrime together.
              </p>
              <button className="w-full bg-white text-cyber-blue font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Sign Up Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;