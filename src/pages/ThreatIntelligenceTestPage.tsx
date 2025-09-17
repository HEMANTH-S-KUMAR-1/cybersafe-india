import { useState, useEffect } from 'react';
import { threatIntelligenceService, ThreatAlert } from '../services/threatIntelligence';
import { AlertTriangle, RefreshCw, ExternalLink, CheckCircle } from 'lucide-react';

export default function ThreatIntelligenceTestPage() {
  const [threats, setThreats] = useState<ThreatAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchThreats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await threatIntelligenceService.fetchLatestThreats();
      setThreats(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch threat intelligence data');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchThreats();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Live Threat Intelligence Feed
              </h1>
              <p className="text-gray-600">
                Real-time cybersecurity threats from trusted sources
              </p>
            </div>
            <button
              onClick={fetchThreats}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {lastUpdated && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Last Updated:</strong> {lastUpdated.toLocaleString()}
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
              <p className="text-gray-600">Fetching latest threat intelligence...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {threats.length > 0 ? (
                threats.map((threat) => (
                  <div
                    key={threat.id}
                    className={`p-6 rounded-lg border-2 ${getSeverityColor(threat.severity)}`}
                  >
                    <div className="flex items-start gap-4">
                      {getSeverityIcon(threat.severity)}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">
                              {threat.type}
                            </h3>
                            {threat.source && (
                              <div className="flex items-center gap-2 mt-1">
                                <ExternalLink className="w-4 h-4 text-blue-500" />
                                <span className="text-sm text-blue-600 font-medium">
                                  Source: {threat.source}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              threat.severity === 'high' ? 'bg-red-100 text-red-800' :
                              threat.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {threat.severity.toUpperCase()} SEVERITY
                            </span>
                            <span className="text-sm text-gray-500 mt-1">
                              {new Date(threat.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {threat.detail}
                        </p>
                        
                        <div className="bg-white/50 p-4 rounded-lg border">
                          <p className="text-sm font-medium text-gray-900">
                            <strong>🛡️ Safety Tip:</strong> {threat.tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No threat intelligence data available</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Data Sources</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>NVD:</strong> National Vulnerability Database (CVE data)</li>
              <li>• <strong>GitHub:</strong> Security Advisories</li>
              <li>• <strong>CERT-IN:</strong> Computer Emergency Response Team - India</li>
              <li>• <strong>Local Intelligence:</strong> Fallback threat data for Indian context</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}