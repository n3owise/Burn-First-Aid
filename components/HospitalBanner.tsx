import React from 'react';

interface HospitalBannerProps {
  lang: 'en' | 'hi';
}

export const HospitalBanner: React.FC<HospitalBannerProps> = ({ lang }) => {
  const hospitalImage = "/images/hospital.jpg";

  return (
    <div className="w-full px-4 pt-4">
      <div className="w-full h-48 relative overflow-hidden rounded-3xl shadow-2xl">
        {/* Hospital Image */}
        <div className="absolute inset-0">
          <img 
            src={hospitalImage} 
            alt="Hospital" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000";
            }}
          />
        </div>
        
        {/* Subtle gradient overlay at bottom for text */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        
        {/* Text Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-end h-full text-center px-6 pb-6">
          
          {/* Main Heading */}
          
        </div>
      </div>
    </div>
  );
};