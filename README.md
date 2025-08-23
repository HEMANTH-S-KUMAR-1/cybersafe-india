# 🛡️ CyberSafe India - Cybersecurity Awareness Platform

> Empowering every Indian with cybersecurity knowledge and tools to stay safe online

![CyberSafe India](https://img.shields.io/badge/CyberSafe-India-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎯 Mission

CyberSafe India is a comprehensive cybersecurity awareness platform designed to educate and protect Indian citizens from digital threats. Our mission is to build a digitally secure India by providing accessible, multilingual cybersecurity education tailored for diverse communities.

## ✨ Features

### ✨ Core Features
- **🎓 Interactive Learning Modules** - Comprehensive cybersecurity education
- **🚨 Cybercrime Reporting** - Direct integration with government portals
- **👥 Community Forum** - Connect with cybersecurity experts and peers
- **📚 Resource Library** - Downloadable guides and toolkits
- **🌍 Multilingual Support** - Available in 8+ Indian languages
- **🔄 Real-time Translation** - Powered by Azure Translator with support for 13+ Indian languages

### 🎨 User Experience
- **🌓 Dark/Light Theme** - Comfortable viewing in any environment
- **📱 Responsive Design** - Optimized for mobile, tablet, and desktop
- **♿ Accessibility** - WCAG 2.1 compliant design
- **⚡ Performance** - Lightning-fast loading and smooth animations
- **🎯 Demographic Personalization** - Tailored cybersecurity tips for different user groups
- **🌐 Smart Translation** - Automatic fallback between real-time and static translations

### 🆕 Latest Features (August 2025)
- **🔄 Azure Translator Integration** - Real-time translation with smart caching and fallback
- **🌍 Enhanced Language Support** - 13+ Indian languages with cultural context awareness
- **👤 Demographic-Based Content Engine** - Personalized cybersecurity tips for Students, Homemakers, Senior Citizens, and Professionals
- **🎨 Enhanced UI/UX** - Improved card layouts and interactive components
- **🔧 Code Quality Improvements** - ESLint configuration, TypeScript optimizations
- **📊 Performance Optimizations** - Better build times and bundle splitting

### 🏛️ Government Integration
- **🔗 CERT-In Integration** - Direct connection to cybersecurity authorities
- **📞 Emergency Helplines** - Quick access to cyber crime helplines
- **📋 Official Resources** - Government-approved educational content

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework with hooks and concurrent features |
| **TypeScript** | Type-safe development and better code quality |
| **Vite** | Lightning-fast build tool and development server |
| **Tailwind CSS** | Utility-first CSS framework for rapid styling |
| **Lucide React** | Beautiful, customizable icons |
| **React Router** | Client-side routing for single-page application |

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Git for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cybersafe-india.git
   cd cybersafe-india
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Common/          # Reusable UI components
│   │   ├── AlertBanner.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── ThemeToggle.tsx
│   └── Layout/          # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── LearnPage.tsx
│   ├── RespondPage.tsx
│   ├── CommunityPage.tsx
│   ├── ResourcesPage.tsx
│   └── DemographicPage.tsx
├── hooks/               # Custom React hooks
│   └── useTranslation.ts
├── utils/               # Utility functions
│   └── translations.ts
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and theme variables
```

## 🌍 Language Support & Translation

CyberSafe India features advanced multilingual support with both static and real-time translation capabilities:

### Supported Languages
- 🇮🇳 **English** (Primary)
- 🇮🇳 **Hindi** (हिंदी)
- 🇮🇳 **Kannada** (ಕನ್ನಡ)
- 🇮🇳 **Tamil** (தமிழ்)
- 🇮🇳 **Telugu** (తెలుగు)
- 🇮🇳 **Bengali** (বাংলা)
- 🇮🇳 **Gujarati** (ગુજરાતી)
- 🇮🇳 **Marathi** (मराठी)
- 🇮🇳 **Malayalam** (മലയാളം)
- 🇮🇳 **Punjabi** (ਪੰਜਾਬੀ)
- 🇮🇳 **Assamese** (অসমীয়া)
- 🇮🇳 **Odia** (ଓଡ଼ିଆ)
- 🇮🇳 **Urdu** (اردو)

### Translation Features
- **Static Translations**: Pre-translated content for core UI elements
- **Real-time Translation**: Azure Translator integration for dynamic content
- **Smart Fallback**: Automatically switches between real-time and static translations
- **Translation Caching**: Optimized performance with intelligent caching
- **Language Detection**: Automatic detection of input language
- **Cultural Context**: Translations optimized for Indian context and terminology

### Setting Up Real-time Translation

To enable Azure Translator integration:

1. **Create Azure Translator Resource**
   ```bash
   # Go to Azure Portal (portal.azure.com)
   # Create a new "Translator" resource
   # Choose "Global" region for best coverage
   ```

2. **Configure Environment Variables**
   ```bash
   # Copy .env.example to .env
   cp .env.example .env
   
   # Set your Azure Translator credentials
   VITE_AZURE_TRANSLATOR_KEY=your_subscription_key
   VITE_AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
   VITE_AZURE_TRANSLATOR_REGION=global
   ```

3. **Features Available with Azure Integration**
   - Real-time translation of user-generated content
   - Interactive translation demo page (`/translation-demo`)
   - Enhanced language selector with translation status
   - Automatic language detection
   - Smart caching for improved performance

> **Note**: The application works perfectly without Azure Translator setup, using static translations as fallback.

## 🎨 Theme System

The platform features a sophisticated dual-theme system:

### Light Theme (Default)
- Clean, professional design with high contrast
- Optimized for daytime usage
- Accessibility-first color choices

### Dark Theme
- Easy on the eyes for low-light environments
- Cybersecurity-themed blue and orange accents
- Maintains readability and contrast standards

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Bug Reports
- Use the GitHub Issues tab
- Include detailed reproduction steps
- Provide browser and OS information

### 💡 Feature Requests
- Open a GitHub Issue with the `enhancement` label
- Describe the feature and its benefits
- Include mockups or examples if possible

### 🔧 Development Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏛️ Government Partnerships

CyberSafe India is developed in collaboration with:
- **CERT-In** (Computer Emergency Response Team - India)
- **Reserve Bank of India (RBI)**
- **Digital India Initiative**

## 📞 Support & Contact

- **Cyber Helpline**: 155260
- **Email**: cert-in@gov.in
- **Website**: cybercrime.gov.in

## 🙏 Acknowledgments

- Government of India for cybersecurity guidelines
- CERT-In for technical specifications
- Indian cybersecurity community for feedback and testing
- Open source community for amazing tools and libraries

---

<div align="center">

**Made with ❤️ for a Safer Digital India**

[![GitHub stars](https://img.shields.io/github/stars/your-username/cybersafe-india?style=social)](https://github.com/your-username/cybersafe-india/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/your-username/cybersafe-india?style=social)](https://github.com/your-username/cybersafe-india/network/members)

</div>
# Build: 08/23/2025 13:15:46
