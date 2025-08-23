import React from 'react';
import { DemographicTip } from '../../data/demographicTips';

interface TipCardProps {
  tip: DemographicTip;
  index: number;
}

const TipCard: React.FC<TipCardProps> = ({ tip, index }) => {
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'border-l-danger bg-danger-light';
      case 'medium':
        return 'border-l-warning bg-warning-light';
      case 'low':
        return 'border-l-success bg-success-light';
      default:
        return 'border-l-primary bg-primary-light';
    }
  };

  const getPriorityBadge = (priority: string): { text: string; class: string } => {
    switch (priority) {
      case 'high':
        return { text: 'High Priority', class: 'bg-danger text-white' };
      case 'medium':
        return { text: 'Medium Priority', class: 'bg-warning text-white' };
      case 'low':
        return { text: 'Low Priority', class: 'bg-success text-white' };
      default:
        return { text: 'Info', class: 'bg-primary text-white' };
    }
  };

  const priorityBadge = getPriorityBadge(tip.priority);

  return (
    <div 
      className={`
        group relative overflow-hidden rounded-xl border-l-4 
        ${getPriorityColor(tip.priority)}
        bg-surface hover:bg-surface-hover 
        border border-border hover:border-primary
        p-6 transition-all duration-300 
        hover:shadow-lg hover:shadow-primary/10 
        hover:-translate-y-1 hover:scale-[1.02]
        animate-stagger-${(index % 5) + 1}
      `}
      role="article"
      aria-labelledby={`tip-title-${tip.id}`}
    >
      {/* Top Row: Priority Badge */}
      <div className="flex justify-end mb-4">
        <span className={`
          px-3 py-1 rounded-full text-xs font-semibold
          ${priorityBadge.class} shadow-sm
        `}>
          {priorityBadge.text}
        </span>
      </div>

      {/* Icon and Header Row */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          <span 
            className="text-3xl transition-transform duration-300 group-hover:scale-110"
            role="img" 
            aria-label={`${tip.category} security tip`}
          >
            {tip.icon}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 
            id={`tip-title-${tip.id}`}
            className="text-lg font-semibold text-heading mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300"
          >
            {tip.title}
          </h3>
        </div>
      </div>

      {/* Category Tag Row */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-light text-primary border border-primary/30 shadow-sm">
          {tip.category.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <p className="text-text-secondary leading-relaxed text-sm">
          {tip.description}
        </p>
        
        {/* Action Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-secure"></span>
            <span>CyberSafe Verified</span>
          </div>
          
          <button 
            className="text-xs text-primary hover:text-primary-hover font-medium transition-colors duration-200"
            onClick={() => {
              // Future: Could open detailed tip modal or share functionality
              console.log('Learn more about:', tip.title);
            }}
          >
            Learn More →
          </button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default TipCard;
