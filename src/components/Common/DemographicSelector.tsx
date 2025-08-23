import React, { useState } from 'react';
import { getAllDemographics } from '../../data/demographicTips';

interface DemographicSelectorProps {
  selectedDemographic: string | null;
  onDemographicChange: (demographicId: string) => void;
}

const DemographicSelector: React.FC<DemographicSelectorProps> = ({
  selectedDemographic,
  onDemographicChange
}) => {
  const [hoveredDemographic, setHoveredDemographic] = useState<string | null>(null);
  const demographics = getAllDemographics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-heading">
          Choose Your Profile
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Get personalized cybersecurity tips tailored specifically for your role and digital lifestyle
        </p>
      </div>

      {/* Demographic Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {demographics.map((demographic) => {
          const isSelected = selectedDemographic === demographic.id;
          const isHovered = hoveredDemographic === demographic.id;

          return (
            <button
              key={demographic.id}
              onClick={() => onDemographicChange(demographic.id)}
              onMouseEnter={() => setHoveredDemographic(demographic.id)}
              onMouseLeave={() => setHoveredDemographic(null)}
              className={`
                group relative overflow-hidden rounded-xl p-6 
                border-2 transition-all duration-300 text-left
                transform hover:scale-105 hover:-translate-y-1
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${isSelected
                  ? 'border-primary bg-primary-light shadow-lg shadow-primary/20'
                  : 'border-border bg-surface hover:border-primary hover:bg-surface-hover'
                }
              `}
              aria-pressed={isSelected}
              aria-describedby={`demographic-desc-${demographic.id}`}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="flex items-center justify-center mb-4">
                <span 
                  className={`
                    text-4xl transition-all duration-300
                    ${isSelected || isHovered ? 'scale-110' : 'scale-100'}
                  `}
                  role="img"
                  aria-label={demographic.name}
                >
                  {demographic.icon}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className={`
                  font-semibold text-lg transition-colors duration-300
                  ${isSelected ? 'text-primary' : 'text-heading group-hover:text-primary'}
                `}>
                  {demographic.name}
                </h3>

                <p 
                  id={`demographic-desc-${demographic.id}`}
                  className="text-sm text-text-secondary leading-relaxed"
                >
                  {demographic.description}
                </p>

                {/* Tip Count Indicator */}
                <div className="flex items-center space-x-2 pt-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <span className="text-xs text-text-muted">
                    {demographic.tips.length} Safety Tips
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 
                transition-opacity duration-300 pointer-events-none
                ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}
              `}></div>

              {/* Border Glow Effect */}
              <div className={`
                absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none
                ${isSelected ? 'shadow-[0_0_20px_rgba(43,108,176,0.3)]' : ''}
              `}></div>
            </button>
          );
        })}
      </div>

      {/* Selection Status */}
      {selectedDemographic && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-success-light border border-success/20">
            <span className="text-success">✓</span>
            <span className="text-sm font-medium text-success">
              Profile selected: {demographics.find(d => d.id === selectedDemographic)?.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemographicSelector;
