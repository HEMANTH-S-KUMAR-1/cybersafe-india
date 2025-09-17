import React from 'react';
import { 
  Shield, 
  Mail, 
  CreditCard, 
  User, 
  Users, 
  PlayCircle, 
  BookOpen, 
  CheckCircle,
  Clock,
  Star,
  ChevronRight
} from 'lucide-react';

const LearnPage: React.FC = () => {

  const learningModules = [
    {
      id: 'phishing',
      icon: Mail,
      title: 'Phishing & Email Scams',
      description: 'Learn to identify and avoid fraudulent emails and links',
      duration: '15 mins',
      difficulty: 'Beginner',
      completed: 0,
      total: 5,
      color: 'bg-red-500',
    },
    {
      id: 'upi-fraud',
      icon: CreditCard,
      title: 'UPI & Payment Fraud',
      description: 'Secure digital payments and avoid payment scams',
      duration: '20 mins',
      difficulty: 'Intermediate',
      completed: 2,
      total: 6,
      color: 'bg-blue-500',
    },
    {
      id: 'identity-theft',
      icon: User,
      title: 'Identity Theft',
      description: 'Protect your personal information and digital identity',
      duration: '18 mins',
      difficulty: 'Intermediate',
      completed: 1,
      total: 4,
      color: 'bg-purple-500',
    },
    {
      id: 'social-media',
      icon: Users,
      title: 'Social Media Safety',
      description: 'Safe practices for Facebook, WhatsApp, and other platforms',
      duration: '12 mins',
      difficulty: 'Beginner',
      completed: 3,
      total: 4,
      color: 'bg-green-500',
    },
  ];

  const quizzes = [
    {
      id: 'spot-scam',
      title: 'Spot the Scam',
      description: 'Test your ability to identify common scam tactics',
      questions: 10,
      time: '5 mins',
      difficulty: 'Easy',
    },
    {
      id: 'password-strength',
      title: 'Password Security Challenge',
      description: 'Evaluate and improve your password practices',
      questions: 8,
      time: '7 mins',
      difficulty: 'Medium',
    },
    {
      id: 'incident-response',
      title: 'Cyber Incident Response',
      description: 'Learn what to do when you encounter a cyber threat',
      questions: 12,
      time: '10 mins',
      difficulty: 'Advanced',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learn Cyber Safety
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Master essential cybersecurity skills through interactive modules, real-world scenarios, and expert guidance.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Learning Progress</h2>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">Level 2 Learner</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyber-blue mb-1">6</div>
              <div className="text-gray-600">Modules Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-1">4</div>
              <div className="text-gray-600">Quizzes Passed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-1">120</div>
              <div className="text-gray-600">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500 mb-1">85%</div>
              <div className="text-gray-600">Safety Score</div>
            </div>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Interactive Learning Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningModules.map((module) => {
              const IconComponent = module.icon;
              const progressPercent = (module.completed / module.total) * 100;
              
              return (
                <div key={module.id} className="card p-6 cursor-pointer hover:shadow-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${module.color} p-3 rounded-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{module.duration}</div>
                      <div className="text-xs text-gray-400">{module.difficulty}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{module.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{module.completed}/{module.total} lessons</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-cyber-blue h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <button className="w-full btn-primary text-center">
                    {module.completed === 0 ? 'Start Learning' : 'Continue Learning'}
                    <ChevronRight className="h-4 w-4 ml-2 inline" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quizzes & Simulations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Test Your Knowledge</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <PlayCircle className="h-12 w-12 text-cyber-blue" />
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {quiz.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{quiz.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{quiz.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {quiz.questions} questions
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {quiz.time}
                  </span>
                </div>
                
                <button className="w-full btn-primary">
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-success-green" />
              <div>
                <div className="font-semibold text-gray-900">Phishing Expert</div>
                <div className="text-sm text-gray-600">Completed all email security modules</div>
                <div className="text-xs text-gray-500">2 days ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
              <Shield className="h-8 w-8 text-cyber-blue" />
              <div>
                <div className="font-semibold text-gray-900">Security Champion</div>
                <div className="text-sm text-gray-600">Scored 100% on Password Security Quiz</div>
                <div className="text-xs text-gray-500">1 week ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;