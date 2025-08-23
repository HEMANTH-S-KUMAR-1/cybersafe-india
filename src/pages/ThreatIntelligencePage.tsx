import ThreatFeed from '../components/ThreatFeed/ThreatFeed';
import { AlertTriangle, Shield, TrendingUp, Users } from 'lucide-react';

export default function ThreatIntelligencePage() {
  const stats = [
    {
      icon: <AlertTriangle className="w-8 h-8 text-danger" />,
      title: "Active Threats",
      value: "247",
      description: "Threats detected today"
    },
    {
      icon: <Shield className="w-8 h-8 text-success" />,
      title: "Users Protected",
      value: "12.5K",
      description: "Users warned this week"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "Threat Trend",
      value: "+15%",
      description: "Increase from last week"
    },
    {
      icon: <Users className="w-8 h-8 text-protected" />,
      title: "Community Reports",
      value: "89",
      description: "User-reported threats"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="w-10 h-10 text-danger" />
            <h1 className="text-4xl font-bold text-heading">
              Threat Intelligence Center
            </h1>
          </div>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Stay ahead of cyber threats with real-time intelligence and actionable security insights
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stats-card p-6 rounded-xl shadow-md border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                {stat.icon}
                <span className="text-2xl font-bold text-heading">
                  {stat.value}
                </span>
              </div>
              <h3 className="font-semibold text-heading mb-1">
                {stat.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Threat Feed Component */}
        <ThreatFeed />

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* How It Works */}
          <div className="threat-card p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-heading mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              How Threat Intelligence Works
            </h3>
            <ul className="space-y-3 text-text">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                Real-time monitoring of cybersecurity threats across India
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                Analysis of threat patterns and emerging attack vectors
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                Immediate safety recommendations for each threat type
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                Community-driven threat reporting and verification
              </li>
            </ul>
          </div>

          {/* Quick Safety Tips */}
          <div className="threat-card p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-bold text-heading mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-success" />
              Quick Safety Reminders
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-success-light border border-success rounded-lg">
                <p className="text-success text-sm font-medium">
                  Never share OTP or PIN with anyone over phone or email
                </p>
              </div>
              <div className="p-3 bg-warning-light border border-warning rounded-lg">
                <p className="text-warning text-sm font-medium">
                  Verify URLs before entering sensitive information
                </p>
              </div>
              <div className="p-3 bg-primary-light border border-primary rounded-lg">
                <p className="text-primary text-sm font-medium">
                  Keep your devices and apps updated with latest security patches
                </p>
              </div>
              <div className="p-3 bg-protected-light border border-protected rounded-lg">
                <p className="text-protected text-sm font-medium">
                  Use strong, unique passwords for all your accounts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
