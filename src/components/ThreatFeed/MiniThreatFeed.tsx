import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Shield, TrendingUp } from 'lucide-react';
import { threatIntelligenceService, ThreatAlert } from '../../services/threatIntelligence';

export default function MiniThreatFeed() {
  const [alerts, setAlerts] = useState<ThreatAlert[]>([]);

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const threats = await threatIntelligenceService.fetchLatestThreats();
        setAlerts(threats.slice(0, 3)); // Show only top 3 threats
      } catch (error) {
        console.error('Error fetching threats for mini feed:', error);
      }
    };

    fetchThreats();
    // Refresh every 10 minutes
    const interval = setInterval(fetchThreats, 600000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'threat-card threat-high border-l-4';
      case 'medium': return 'threat-card threat-medium border-l-4';
      case 'low': return 'threat-card threat-low border-l-4';
      default: return 'threat-card border-l-4 border-gray-500 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Shield className="w-4 h-4 text-blue-500" />;
      default: return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours}h ago`;
    }
  };

  return (
    <div className="mini-threat-feed rounded-xl shadow-lg border border-gray-200 p-6 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="text-xl font-bold text-heading">Live Threat Feed</h3>
            <p className="text-sm text-text-secondary">Real-time cybersecurity alerts</p>
          </div>
        </div>
        <Link 
          to="/threats" 
          className="text-primary hover:text-primary-hover text-sm font-medium hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Mini Feed */}
      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg transition-all hover:shadow-md ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start gap-3">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 className="font-semibold text-heading text-sm">
                      {alert.type}
                    </h4>
                    <span className="text-xs text-text-muted mt-1 sm:mt-0">
                      {getTimeAgo(alert.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-text text-sm mb-3 leading-relaxed">
                    {alert.detail}
                  </p>
                  
                  <div className="safety-tip flex items-start gap-2 p-2 rounded">
                    <Shield className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-medium">
                      <strong>Tip:</strong> {alert.tip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <div className="loading-skeleton">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-6 p-4 bg-primary-light border border-primary rounded-lg">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <p className="text-primary text-sm font-medium">
              Stay protected with real-time threat intelligence
            </p>
            <p className="text-primary text-xs mt-1">
              Get alerts and safety tips delivered instantly
            </p>
          </div>
          <Link 
            to="/threats" 
            className="threat-refresh-btn px-4 py-2 rounded-lg text-sm font-medium transition-all"
          >
            Monitor Now
          </Link>
        </div>
      </div>
    </div>
  );
}
