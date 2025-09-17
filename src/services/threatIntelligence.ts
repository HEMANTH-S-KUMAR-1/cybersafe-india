interface ThreatAlert {
  id: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  detail: string;
  tip: string;
  timestamp: string;
  category: string;
  source: string;
}

interface CVEData {
  cve: {
    id: string;
    descriptions: Array<{
      lang: string;
      value: string;
    }>;
    published: string;
    metrics?: {
      cvssMetricV31?: Array<{
        cvssData: {
          baseScore: number;
        };
      }>;
    };
  };
}

interface GitHubSecurityAdvisory {
  id: string;
  summary: string;
  severity: string;
  published_at: string;
  updated_at: string;
  vulnerabilities: Array<{
    package: {
      name: string;
      ecosystem: string;
    };
  }>;
}

interface RSSFeedItem {
  title: string;
  description: string;
  pubDate: string;
  link?: string;
  guid?: string;
}

class ThreatIntelligenceService {
  private readonly CVE_API_BASE = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
  private readonly GITHUB_ADVISORY_API = 'https://api.github.com/advisories';
  private readonly CERT_RSS_FEED = 'https://www.us-cert.gov/ncas/current-activity.xml';

  async fetchLatestThreats(): Promise<ThreatAlert[]> {
    const threats: ThreatAlert[] = [];

    try {
      // Fetch from multiple sources in parallel
      const [cveThreats, githubThreats, certThreats] = await Promise.allSettled([
        this.fetchCVEThreats(),
        this.fetchGitHubAdvisories(),
        this.fetchCERTAlerts()
      ]);

      if (cveThreats.status === 'fulfilled') {
        threats.push(...cveThreats.value);
      }

      if (githubThreats.status === 'fulfilled') {
        threats.push(...githubThreats.value);
      }

      if (certThreats.status === 'fulfilled') {
        threats.push(...certThreats.value);
      }

      // Sort by timestamp (newest first) and limit to 10
      return threats
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 10);

    } catch (error) {
      console.error('Error fetching threat intelligence:', error);
      return this.getFallbackThreats();
    }
  }

  private async fetchCVEThreats(): Promise<ThreatAlert[]> {
    try {
      // Fetch recent CVEs from last 7 days
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const url = `${this.CVE_API_BASE}?pubStartDate=${startDate.toISOString().split('T')[0]}T00:00:00.000&pubEndDate=${endDate.toISOString().split('T')[0]}T23:59:59.999&resultsPerPage=5`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`CVE API error: ${response.status}`);
      }

      const data = await response.json();
      const vulnerabilities = data.vulnerabilities || [];

      return vulnerabilities.map((vuln: CVEData, index: number) => {
        const description = vuln.cve.descriptions.find(d => d.lang === 'en')?.value || 'CVE vulnerability detected';
        const severity = this.getCVESeverity(vuln.cve.metrics?.cvssMetricV31?.[0]?.cvssData?.baseScore);
        
        return {
          id: `cve-${vuln.cve.id}-${index}`,
          type: 'CVE Vulnerability',
          severity,
          detail: this.formatCVEDescription(description),
          tip: this.getCVETip(severity),
          timestamp: vuln.cve.published,
          category: 'vulnerability',
          source: 'NVD'
        };
      });
    } catch (error) {
      console.error('Error fetching CVE data:', error);
      return [];
    }
  }

  private async fetchGitHubAdvisories(): Promise<ThreatAlert[]> {
    try {
      const response = await fetch(`${this.GITHUB_ADVISORY_API}?per_page=5&sort=published&direction=desc`, {
        headers: {
          'Accept': 'application/vnd.github+json',
          'User-Agent': 'CyberSafe-India-App'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const advisories: GitHubSecurityAdvisory[] = await response.json();

      return advisories.map((advisory, index) => ({
        id: `github-${advisory.id}-${index}`,
        type: 'Security Advisory',
        severity: this.mapGitHubSeverity(advisory.severity),
        detail: this.formatGitHubSummary(advisory.summary, advisory.vulnerabilities),
        tip: this.getSecurityAdvisoryTip(advisory.severity),
        timestamp: advisory.published_at,
        category: 'security_advisory',
        source: 'GitHub'
      }));
    } catch (error) {
      console.error('Error fetching GitHub advisories:', error);
      return [];
    }
  }

  private async fetchCERTAlerts(): Promise<ThreatAlert[]> {
    try {
      // Since we can't parse XML directly, we'll use a public RSS to JSON service
      const rssToJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(this.CERT_RSS_FEED)}&count=5`;
      
      const response = await fetch(rssToJsonUrl);
      
      if (!response.ok) {
        throw new Error(`RSS API error: ${response.status}`);
      }

      const data = await response.json();
      const items = data.items || [];

      return items.map((item: RSSFeedItem, index: number) => ({
        id: `cert-${index}-${Date.now()}`,
        type: 'CERT Alert',
        severity: this.getCERTSeverity(item.title),
        detail: this.formatCERTDescription(item.title, item.description),
        tip: 'Follow CERT-IN recommendations and apply security patches promptly.',
        timestamp: item.pubDate,
        category: 'cert_alert',
        source: 'CERT-IN'
      }));
    } catch (error) {
      console.error('Error fetching CERT alerts:', error);
      return [];
    }
  }

  private getCVESeverity(score?: number): 'high' | 'medium' | 'low' {
    if (!score) return 'medium';
    if (score >= 7.0) return 'high';
    if (score >= 4.0) return 'medium';
    return 'low';
  }

  private mapGitHubSeverity(severity: string): 'high' | 'medium' | 'low' {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'high';
      case 'moderate':
      case 'medium':
        return 'medium';
      default:
        return 'low';
    }
  }

  private getCERTSeverity(title: string): 'high' | 'medium' | 'low' {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('critical') || titleLower.includes('urgent') || titleLower.includes('high')) {
      return 'high';
    }
    if (titleLower.includes('medium') || titleLower.includes('important')) {
      return 'medium';
    }
    return 'low';
  }

  private formatCVEDescription(description: string): string {
    // Truncate and clean up CVE descriptions for user-friendly display
    const cleaned = description.replace(/\b(CVE-\d{4}-\d+)\b/g, '').trim();
    const truncated = cleaned.length > 150 ? cleaned.substring(0, 150) + '...' : cleaned;
    return truncated || 'Security vulnerability identified in software component';
  }

  private formatGitHubSummary(summary: string, vulnerabilities: GitHubSecurityAdvisory['vulnerabilities']): string {
    const packageInfo = vulnerabilities[0]?.package ? ` (${vulnerabilities[0].package.name})` : '';
    const truncated = summary.length > 120 ? summary.substring(0, 120) + '...' : summary;
    return `${truncated}${packageInfo}`;
  }

  private formatCERTDescription(title: string, description: string): string {
    // Remove HTML tags and truncate
    const cleaned = description.replace(/<[^>]*>/g, '').trim();
    const truncated = cleaned.length > 150 ? cleaned.substring(0, 150) + '...' : cleaned;
    return truncated || title;
  }

  private getCVETip(severity: 'high' | 'medium' | 'low'): string {
    switch (severity) {
      case 'high':
        return 'Apply security patches immediately. This vulnerability poses significant risk.';
      case 'medium':
        return 'Update affected software when possible. Monitor for security patches.';
      default:
        return 'Keep software updated and follow security best practices.';
    }
  }

  private getSecurityAdvisoryTip(severity: string): string {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'Update dependencies immediately. This security issue requires urgent attention.';
      case 'moderate':
      case 'medium':
        return 'Plan to update affected dependencies in your next maintenance window.';
      default:
        return 'Review and update dependencies when convenient. Monitor for updates.';
    }
  }

  private getFallbackThreats(): ThreatAlert[] {
    // Fallback data when APIs are unavailable
    return [
      {
        id: 'fallback-1',
        type: 'Phishing Campaign',
        severity: 'high',
        detail: 'Increased phishing attempts targeting online banking credentials in India',
        tip: 'Always verify URLs before entering banking credentials. Use official bank apps.',
        timestamp: new Date().toISOString(),
        category: 'phishing',
        source: 'Local Intelligence'
      },
      {
        id: 'fallback-2',
        type: 'UPI Fraud Alert',
        severity: 'high',
        detail: 'Fake payment apps mimicking popular UPI services detected on app stores',
        tip: 'Download UPI apps only from official sources. Verify app publishers.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        category: 'upi_fraud',
        source: 'Local Intelligence'
      },
      {
        id: 'fallback-3',
        type: 'Malware Detection',
        severity: 'medium',
        detail: 'Android malware targeting Indian banking apps through SMS links',
        tip: 'Never click suspicious SMS links. Keep your device software updated.',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        category: 'malware',
        source: 'Local Intelligence'
      }
    ];
  }
}

export const threatIntelligenceService = new ThreatIntelligenceService();
export type { ThreatAlert };