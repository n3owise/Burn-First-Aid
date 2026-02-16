import React from 'react';

interface HospitalBannerProps {
  lang: 'en' | 'hi';
}

export const HospitalBanner: React.FC<HospitalBannerProps> = ({ lang }) => {
  const hospitalImage = "/images/hospital.jpg";

  return (
    <div className="w-full h-96 relative overflow-hidden">
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
      {/* Overlays */}
      <div className="absolute inset-0 bg-slate-900/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-gray-50" />
      
      {/* Text Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pt-8">
        
        {/* Main Heading */}
        <h1 className="font-serif-display text-5xl md:text-6xl text-white font-medium leading-[1.1] drop-shadow-lg tracking-tight">
          {lang === 'en' ? (
            <>
              Burn First Aid
            </>
          ) : (
            <>
              जलन <br /> आपातकाल
            </>
          )}
        </h1>
        
        {/* Subtitle */}
        
      </div>
    </div>
  );
};