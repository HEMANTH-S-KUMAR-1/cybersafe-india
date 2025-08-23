// Demographic-based cybersecurity tips data
export interface DemographicTip {
  id: string;
  title: string;
  description: string;
  icon: '🔒' | '⚠️' | '✅' | '🛡️' | '📱' | '💳' | '🔐' | '👥' | '💼' | '📧';
  priority: 'high' | 'medium' | 'low';
  category: 'password' | 'social' | 'financial' | 'device' | 'privacy' | 'communication';
}

export interface DemographicData {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  icon: string;
  tips: DemographicTip[];
}

export const demographicTipsData: Record<string, DemographicData> = {
  students: {
    id: 'students',
    name: 'Students',
    nameHindi: 'छात्र',
    description: 'Cybersecurity tips for students and young learners',
    icon: '🎓',
    tips: [
      {
        id: 'student-1',
        title: 'Avoid Public Wi-Fi for Sensitive Activities',
        description: 'Never use public Wi-Fi for online exams, banking, or accessing sensitive academic portals. Use mobile data or secure VPN instead.',
        icon: '⚠️',
        priority: 'high',
        category: 'device'
      },
      {
        id: 'student-2',
        title: 'Don\'t Share Login Credentials',
        description: 'Never share your student portal, email, or social media passwords with friends. Each account should have unique, strong passwords.',
        icon: '🔒',
        priority: 'high',
        category: 'password'
      },
      {
        id: 'student-3',
        title: 'Verify Job Offers and Internships',
        description: 'Be cautious of unsolicited job offers via WhatsApp, Telegram, or email. Always verify the company and never pay fees for jobs.',
        icon: '✅',
        priority: 'medium',
        category: 'social'
      },
      {
        id: 'student-4',
        title: 'Secure Your Study Groups',
        description: 'When sharing study materials online, use secure platforms and don\'t include personal information in file names or content.',
        icon: '👥',
        priority: 'medium',
        category: 'privacy'
      }
    ]
  },
  
  homemakers: {
    id: 'homemakers',
    name: 'Homemakers',
    nameHindi: 'गृहिणी',
    description: 'Cybersecurity guidance for homemakers and family managers',
    icon: '🏠',
    tips: [
      {
        id: 'homemaker-1',
        title: 'Verify Online Sellers Before Shopping',
        description: 'Always check seller ratings, reviews, and return policies before making online purchases. Use secure payment methods.',
        icon: '🛡️',
        priority: 'high',
        category: 'financial'
      },
      {
        id: 'homemaker-2',
        title: 'Beware of Work-from-Home Scams',
        description: 'Don\'t click on random WhatsApp job offers promising easy money. Legitimate work opportunities don\'t require upfront payments.',
        icon: '⚠️',
        priority: 'high',
        category: 'social'
      },
      {
        id: 'homemaker-3',
        title: 'Protect Family\'s Digital Privacy',
        description: 'Regularly review privacy settings on family social media accounts and teach children about safe internet practices.',
        icon: '👥',
        priority: 'medium',
        category: 'privacy'
      },
      {
        id: 'homemaker-4',
        title: 'Secure Online Banking and Payments',
        description: 'Use official bank apps, enable transaction alerts, and never share OTPs or banking details with anyone claiming to help.',
        icon: '💳',
        priority: 'high',
        category: 'financial'
      }
    ]
  },
  
  senior_citizens: {
    id: 'senior_citizens',
    name: 'Senior Citizens',
    nameHindi: 'वरिष्ठ नागरिक',
    description: 'Essential cybersecurity tips for senior citizens',
    icon: '👴',
    tips: [
      {
        id: 'senior-1',
        title: 'Never Share OTPs with Anyone',
        description: 'OTPs are confidential. No bank, government agency, or service provider will ever ask for your OTP over phone or message.',
        icon: '🔐',
        priority: 'high',
        category: 'financial'
      },
      {
        id: 'senior-2',
        title: 'Don\'t Allow Remote Access to Strangers',
        description: 'Never let unknown people access your phone or computer remotely. Legitimate tech support won\'t ask for remote access.',
        icon: '⚠️',
        priority: 'high',
        category: 'device'
      },
      {
        id: 'senior-3',
        title: 'Verify Before Digital Payments',
        description: 'Always double-check recipient details before making UPI payments. Once sent, digital payments are difficult to reverse.',
        icon: '💳',
        priority: 'high',
        category: 'financial'
      },
      {
        id: 'senior-4',
        title: 'Beware of Health-Related Scams',
        description: 'Be cautious of messages claiming free health checkups or miracle cures. Verify with your doctor before sharing health information.',
        icon: '✅',
        priority: 'medium',
        category: 'social'
      }
    ]
  },
  
  professionals: {
    id: 'professionals',
    name: 'Working Professionals',
    nameHindi: 'कामकाजी व्यक्ति',
    description: 'Cybersecurity for office workers and professionals',
    icon: '💼',
    tips: [
      {
        id: 'professional-1',
        title: 'Secure Work Communications',
        description: 'Use company-approved communication tools and never share sensitive work information on personal messaging apps.',
        icon: '💼',
        priority: 'high',
        category: 'communication'
      },
      {
        id: 'professional-2',
        title: 'Multi-Factor Authentication',
        description: 'Enable 2FA on all work accounts and use authenticator apps instead of SMS when possible for better security.',
        icon: '🔐',
        priority: 'high',
        category: 'password'
      },
      {
        id: 'professional-3',
        title: 'Email Security Awareness',
        description: 'Be cautious of phishing emails that appear to be from colleagues or clients. Verify suspicious requests through alternate channels.',
        icon: '📧',
        priority: 'medium',
        category: 'communication'
      }
    ]
  }
};

// Helper function to get tips by demographic
export const getTipsByDemographic = (demographicId: string): DemographicTip[] => {
  return demographicTipsData[demographicId]?.tips || [];
};

// Helper function to get all demographics
export const getAllDemographics = (): DemographicData[] => {
  return Object.values(demographicTipsData);
};

// Helper function to get demographic by ID
export const getDemographicById = (id: string): DemographicData | null => {
  return demographicTipsData[id] || null;
};
