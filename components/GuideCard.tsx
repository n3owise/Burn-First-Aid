import React from 'react';
import { BurnGuide } from '../constants';

interface GuideCardProps {
  guide: BurnGuide;
  lang: 'en' | 'hi';
  onClick?: () => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({ guide, lang, onClick }) => {
  return (
    <div 
      className="group relative bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] active:scale-[0.98] transition-transform duration-150 overflow-hidden flex flex-col h-full border border-gray-100 cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img 
          src={guide.imageUrl} 
          alt={guide.title[lang]}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
      </div>
      
      {/* Content Container */}
      <div className="p-3 flex-1 flex flex-col justify-start">
        <h3 className="text-[14px] font-bold text-medical-text mb-1 leading-tight">
          {guide.title[lang]}
        </h3>
        <p className="text-[12px] text-medical-subtext leading-snug line-clamp-2">
          {guide.description[lang]}
        </p>
      </div>
    </div>
  );
};