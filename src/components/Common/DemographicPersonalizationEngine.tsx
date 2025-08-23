import React, { useState, useEffect } from 'react';
import { DemographicTip, getTipsByDemographic, getDemographicById } from '../../data/demographicTips';
import { useTranslation } from '../../hooks/useTranslation';
import DemographicSelector from './DemographicSelector';
import TipCard from './TipCard';
import { Shield, Users, Target, ArrowRight, RefreshCw } from 'lucide-react';

const DemographicPersonalizationEngine: React.FC = () => {
  const { isHindi } = useTranslation();
  const [selectedDemographic, setSelectedDemographic] = useState<string | null>(null);
  const [displayedTips, setDisplayedTips] = useState<DemographicTip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllTips, setShowAllTips] = useState(false);

  // Load saved demographic preference
  useEffect(() => {
    const savedDemographic = localStorage.getItem('selected-demographic');
    if (savedDemographic) {
      setSelectedDemographic(savedDemographic);
    }
  }, []);

  // Update tips when demographic changes
  useEffect(() => {
    if (selectedDemographic) {
      setIsLoading(true);
      
      // Simulate loading for better UX
      setTimeout(() => {
        const tips = getTipsByDemographic(selectedDemographic);
        setDisplayedTips(showAllTips ? tips : tips.slice(0, 3));
        setIsLoading(false);
      }, 500);

      // Save preference
      localStorage.setItem('selected-demographic', selectedDemographic);
    } else {
      setDisplayedTips([]);
    }
  }, [selectedDemographic, showAllTips]);

  const handleDemographicChange = (demographicId: string) => {
    setSelectedDemographic(demographicId);
    setShowAllTips(false); // Reset to show limited tips
  };

  const handleShowMoreTips = () => {
    setShowAllTips(true);
  };

  const handleResetSelection = () => {
    setSelectedDemographic(null);
    setDisplayedTips([]);
    setShowAllTips(false);
    localStorage.removeItem('selected-demographic');
  };

  const selectedDemographicData = selectedDemographic ? getDemographicById(selectedDemographic) : null;
  const allTips = selectedDemographic ? getTipsByDemographic(selectedDemographic) : [];
  const hasMoreTips = !showAllTips && allTips.length > displayedTips.length;

  return (
    <section className="py-16 bg-gradient-to-br from-primary-light/30 via-surface to-accent-light/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='4'/%3E%3Ccircle cx='53' cy='53' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Target className="h-8 w-8 text-primary" />
            <Shield className="h-10 w-10 text-accent" />
            <Users className="h-8 w-8 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-heading">
            Personalized <span className="text-primary">Cyber Safety</span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Get cybersecurity advice tailored specifically for your lifestyle and digital habits
          </p>
          
          {isHindi && (
            <p className="text-text-secondary hindi text-lg opacity-90">
              अपनी जीवनशैली के अनुकूल साइबर सुरक्षा सलाह प्राप्त करें
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4+</div>
              <div className="text-sm text-text-muted">Demographics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">15+</div>
              <div className="text-sm text-text-muted">Safety Tips</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">100%</div>
              <div className="text-sm text-text-muted">Verified</div>
            </div>
          </div>
        </div>

        {/* Demographic Selection */}
        {!selectedDemographic && (
          <div className="animate-fade-in">
            <DemographicSelector
              selectedDemographic={selectedDemographic}
              onDemographicChange={handleDemographicChange}
            />
          </div>
        )}

        {/* Selected Demographic & Tips */}
        {selectedDemographic && selectedDemographicData && (
          <div className="space-y-8">
            {/* Selected Demographic Header */}
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-5xl">{selectedDemographicData.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-heading">
                      {selectedDemographicData.name}
                    </h2>
                    {isHindi && (
                      <p className="text-text-secondary hindi">
                        {selectedDemographicData.nameHindi}
                      </p>
                    )}
                    <p className="text-text-secondary mt-1">
                      {selectedDemographicData.description}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleResetSelection}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-surface-hover hover:bg-border rounded-lg transition-colors duration-200 text-text-secondary hover:text-text"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Change Profile</span>
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-text-muted">
                <span className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span>{allTips.length} Curated Tips</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span>Personalized Content</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-accent" />
                  <span>Community Verified</span>
                </span>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
                  <span className="text-text-secondary">Loading personalized tips...</span>
                </div>
              </div>
            )}

            {/* Tips Grid */}
            {!isLoading && displayedTips.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-heading">
                    Your Personalized Safety Tips
                  </h3>
                  <span className="text-sm text-text-muted">
                    Showing {displayedTips.length} of {allTips.length} tips
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedTips.map((tip, index) => (
                    <TipCard key={tip.id} tip={tip} index={index} />
                  ))}
                </div>

                {/* Show More Button */}
                {hasMoreTips && (
                  <div className="text-center pt-6">
                    <button
                      onClick={handleShowMoreTips}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                    >
                      <span>Show All {allTips.length} Tips</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && displayedTips.length === 0 && (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 text-text-muted mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-heading mb-2">No Tips Available</h3>
                <p className="text-text-secondary">
                  Tips for this demographic are being prepared. Please check back soon.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DemographicPersonalizationEngine;
