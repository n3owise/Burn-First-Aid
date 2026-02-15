import React from 'react';
import { MapPin } from 'lucide-react';

interface HospitalBannerProps {
  lang: 'en' | 'hi';
}

export const HospitalBanner: React.FC<HospitalBannerProps> = ({ lang }) => {
  // Use a direct string path relative to index.html for the image.
  const hospitalImage = "/images/hospital.jpg";

  return (
    <div className="bg-white w-full px-4 pt-6 pb-8">
      {/* Main Card Container with Rounded Corners */}
      <div className="relative w-full bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
        {/* Hospital Image */}
        <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden">
          <img 
            src={hospitalImage} 
            alt="Eshan Hospital Building Facade" 
            className="w-full h-full object-cover object-center transition-opacity duration-500"
            loading="eager"
            onError={(e) => {
              // Fallback if the local file isn't found/loaded
              e.currentTarget.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000";
            }}
          />
          {/* Dark Overlay for text contrast */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        {/* White Content Section Below Image */}
        <div className="bg-white px-6 py-8 text-center">
          {/* Main Title - Serif Font, Large */}
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            BURN FIRST AID
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl text-gray-700 font-medium tracking-wide">
            24x7 Emergency Available
          </p>
        </div>
      </div>
      
      {/* Optional: Address Box Below (if needed) */}
      <div className="mt-6 mx-2 flex items-start gap-2.5 bg-[#F5F5F7] p-4 rounded-xl border border-gray-100">
        <MapPin size={18} className="mt-0.5 shrink-0 text-medical-red opacity-80" />
        <p className="text-[13px] leading-snug font-medium text-gray-600">
          F-1, Rampur Garden, Opposite Vikas Bhawan, Anand Ashram Road, Bareilly, UP 243001
        </p>
      </div>
    </div>
  );
};