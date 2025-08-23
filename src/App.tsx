import { Routes, Route, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ThemeShowcase from './components/Common/ThemeShowcase';
import { TranslationProvider } from './contexts/TranslationContext';
import RouteTranslationWatcher from './components/Translation/RouteTranslationWatcher';
import TranslationDebugPanel from './components/Debug/TranslationDebugPanel';
import './utils/translatorInit'; // Initialize Azure Translator

// Lazy load page components for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const LearnPage = lazy(() => import('./pages/LearnPage'));
const ThreatIntelligencePage = lazy(() => import('./pages/ThreatIntelligencePage'));
const RespondPage = lazy(() => import('./pages/RespondPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const DemographicPage = lazy(() => import('./pages/DemographicPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
// Demo pages removed - only production components remain

// Loading component for Suspense fallback
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-pulse text-cyber-blue font-bold">
      Loading...
    </div>
  </div>
);

// Layout component with header and footer
const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ThemeShowcase />
      <RouteTranslationWatcher />
    </>
  );
};

function App() {
  return (
    <TranslationProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/threats" element={<ThreatIntelligencePage />} />
            <Route path="/respond" element={<RespondPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/demographic/:type" element={<DemographicPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Route>
        </Routes>
        <TranslationDebugPanel />
      </div>
    </TranslationProvider>
  );
}

export default App;