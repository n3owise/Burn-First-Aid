import React from 'react';
import { MapPin } from 'lucide-react';

interface HospitalBannerProps {
  lang: 'en' | 'hi';
}

export const HospitalBanner: React.FC<HospitalBannerProps> = ({ lang }) => {
  // Use a direct string path relative to index.html for the image.
  const hospitalImage = "/images/hospital.jpg";

  return (
    <div className="bg-white w-full border-b border-[#E5E5E5] shadow-sm">
      {/* Hero Image Section */}
      <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
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
        {/* Gradient overlay for better text/badge visibility */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        
        {/* Badge overlaid on image */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-medical-red shadow-lg text-white text-[11px] font-bold uppercase tracking-wide backdrop-blur-none border border-white/20">
            {lang === 'en' ? '24x7 Emergency' : '24x7 आपातकालीन'}
          </span>
        </div>
      </div>
      
      {/* Text Content */}
      <div className="p-5">
        <div className="mb-3">
          <h2 className="text-[20px] font-bold text-medical-text leading-tight mb-1">
            {lang === 'en' ? 'Eshan Hospital' : 'ईशान हॉस्पिटल'}
          </h2>
          <p className="text-[14px] text-gray-500 font-medium">
            {lang === 'en' ? 'Best Burn & Plastic Surgery Hospital In Bareilly' : 'बरेली में सर्वश्रेष्ठ बर्न और प्लास्टिक सर्जरी अस्पताल'}
          </p>
        </div>
        
        {/* Address Box */}
        <div className="flex items-start gap-2.5 text-medical-subtext bg-[#F5F5F7] p-3 rounded-xl border border-gray-100">
          <MapPin size={16} className="mt-0.5 shrink-0 text-medical-red opacity-80" />
          <p className="text-[13px] leading-snug font-medium text-gray-600">
            F-1, Rampur Garden, Opposite Vikas Bhawan, Anand Ashram Road, Bareilly, UP 243001
          </p>
        </div>
      </div>
    </div>
  );
};