import { useEffect, useState, useCallback, useMemo } from 'react';
import { AlertTriangle, Shield, Filter, RefreshCw } from 'lucide-react';

interface ThreatAlert {
  id: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  detail: string;
  tip: string;
  timestamp: string;
  category: string;
}

export default function ThreatFeed() {
  const [alerts, setAlerts] = useState<ThreatAlert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<ThreatAlert[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulated threat data (in production, this would come from an API)
  const simulatedThreats: ThreatAlert[] = useMemo(() => [
    {
      id: '1',
      type: 'Phishing Attack',
      severity: 'high',
      detail: 'Fake SBI banking emails targeting customers with urgent account verification messages',
      tip: 'Never click on suspicious links in emails. Always visit your bank website directly.',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      category: 'phishing'
    },
    {
      id: '2',
      type: 'UPI Fraud',
      severity: 'high',
      detail: 'Fraudulent QR codes circulating on WhatsApp promising cashback rewards',
      tip: 'Only scan QR codes from trusted sources. Verify before making any payments.',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      category: 'upi_fraud'
    },
    {
      id: '3',
      type: 'Identity Theft',
      severity: 'medium',
      detail: 'Fake job portals collecting Aadhaar and PAN details from job seekers',
      tip: 'Never share personal documents on unverified job portals.',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      category: 'identity_theft'
    },
    {
      id: '4',
      type: 'Malware Alert',
      severity: 'high',
      detail: 'Android app "FastVPN" found to contain banking trojans',
      tip: 'Download apps only from official app stores and check reviews.',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      category: 'malware'
    },
    {
      id: '5',
      type: 'Social Engineering',
      severity: 'medium',
      detail: 'Fake customer support calls claiming urgent KYC updates required',
      tip: 'Banks never ask for OTP or PIN over phone calls.',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      category: 'social_engineering'
    },
    {
      id: '6',
      type: 'Crypto Scam',
      severity: 'high',
      detail: 'Fake cryptocurrency investment schemes promising 300% returns',
      tip: 'Be cautious of get-rich-quick schemes. Research before investing.',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      category: 'crypto_scam'
    }
  ], []);

  const fetchThreats = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Shuffle and add new timestamp to simulate real-time updates
      const shuffled = [...simulatedThreats]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)
        .map(threat => ({
          ...threat,
          timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString()
        }));
      
      setAlerts(shuffled);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching threats:', error);
    }
    setIsLoading(false);
  }, [simulatedThreats]);

  useEffect(() => {
    fetchThreats();
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchThreats, 60000);
    return () => clearInterval(interval);
  }, [fetchThreats]);

  useEffect(() => {
    if (selectedFilter === 'all') {
      setFilteredAlerts(alerts);
    } else {
      setFilteredAlerts(alerts.filter(alert => alert.category === selectedFilter));
    }
  }, [alerts, selectedFilter]);

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
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'low': return <Shield className="w-5 h-5 text-blue-500" />;
      default: return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Threats' },
    { value: 'phishing', label: 'Phishing' },
    { value: 'upi_fraud', label: 'UPI Fraud' },
    { value: 'identity_theft', label: 'Identity Theft' },
    { value: 'malware', label: 'Malware' },
    { value: 'social_engineering', label: 'Social Engineering' },
    { value: 'crypto_scam', label: 'Crypto Scams' }
  ];

  return (
    <div className="p-6 threat-card rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h2 className="text-2xl font-bold text-heading">
            Real-Time Threat Intelligence
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={fetchThreats}
            disabled={isLoading}
            className="threat-refresh-btn flex items-center gap-2 px-3 py-2 rounded-lg disabled:opacity-50 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center gap-3 mb-6">
        <Filter className="w-4 h-4 text-text-muted" />
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="threat-filter px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {filterOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Last Updated */}
      <p className="text-sm text-text-muted mb-4">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </p>

      {/* Threat Feed */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-primary" />
            <span className="ml-2 text-text-secondary">Loading latest threats...</span>
          </div>
        ) : filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg shadow-sm hover:shadow-md transition-all ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start gap-3">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="font-semibold text-lg text-heading">
                      {alert.type}
                    </h3>
                    <span className="text-sm text-text-muted mt-1 sm:mt-0">
                      {new Date(alert.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-text mb-3 leading-relaxed">
                    {alert.detail}
                  </p>
                  
                  <div className="safety-tip flex items-start gap-2 p-3 rounded-lg">
                    <Shield className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium">
                      <strong>Safety Tip:</strong> {alert.tip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-text-muted">
            No threats found for the selected filter.
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-6 p-4 bg-primary-light border border-primary rounded-lg">
        <p className="text-sm text-primary">
          <strong>Note:</strong> This threat intelligence feed is updated in real-time. 
          Stay vigilant and follow the safety tips to protect yourself from cyber threats.
        </p>
      </div>
    </div>
  );
}
