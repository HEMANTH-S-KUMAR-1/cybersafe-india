import { useEffect, useState } from 'react';
import { AlertTriangle, Shield, Filter, RefreshCw, ExternalLink, Volume2 } from 'lucide-react';
import { threatIntelligenceService, ThreatAlert } from '../../services/threatIntelligence';
import { voiceNarrationService } from '../../services/voiceNarration';

export default function ThreatFeed() {
  const [alerts, setAlerts] = useState<ThreatAlert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<ThreatAlert[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchThreats = async () => {
      setIsLoading(true);
      try {
        const threats = await threatIntelligenceService.fetchLatestThreats(controller.signal);
        if (!controller.signal.aborted) {
            setAlerts(threats);
            setLastUpdated(new Date());
        }
      } catch (error) {
        // Error handled by fallback data in service layer
        if (controller.signal.aborted) {
          // Request was cancelled, ignore
        }
      } finally {
        if (!controller.signal.aborted) {
            setIsLoading(false);
        }
      }
    };

    fetchThreats();
    
    // Auto-refresh every 5 minutes for real-time updates
    const interval = setInterval(fetchThreats, 300000);
    
    return () => {
        controller.abort();
        clearInterval(interval);
    };
  }, []);

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

  const readThreat = (alert: ThreatAlert) => {
    const threatText = `${alert.type}. ${alert.detail}. Safety tip: ${alert.tip}`;
    voiceNarrationService.speak(threatText);
  };

  const handleManualRefresh = async () => {
      setIsLoading(true);
      try {
        const threats = await threatIntelligenceService.fetchLatestThreats();
        setAlerts(threats);
        setLastUpdated(new Date());
      } catch (error) {
        // Error handled by fallback data in service layer
      } finally {
        setIsLoading(false);
      }
  };

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
            onClick={handleManualRefresh}
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
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-lg text-heading">
                        {alert.type}
                      </h3>
                      {alert.source && (
                        <div className="flex items-center gap-1 mt-1">
                          <ExternalLink className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-blue-600 font-medium">{alert.source}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => readThreat(alert)}
                        className="p-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                        title="Read threat aloud"
                        aria-label="Read this threat aloud"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <span className="text-sm text-text-muted mt-1 sm:mt-0">
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
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
          <strong>Real-Time Intelligence:</strong> This feed aggregates live security threats from trusted sources including NVD (National Vulnerability Database), GitHub Security Advisories, and CERT-IN alerts. 
          Data is refreshed every 5 minutes to keep you informed of the latest cybersecurity developments.
        </p>
      </div>
    </div>
  );
}
