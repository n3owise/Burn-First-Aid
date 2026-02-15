import React from 'react';
import { Phone } from 'lucide-react';

export const EmergencyButton: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pb-safe bg-gradient-to-t from-white/80 via-white/50 to-transparent pointer-events-none z-50">
      <a 
        href="tel:+915812510204"
        className="flex items-center justify-center gap-2.5 w-full h-14 bg-medical-red hover:bg-red-700 active:bg-red-800 text-white rounded-[14px] shadow-[0_4px_12px_rgba(230,57,70,0.3)] pointer-events-auto transition-colors duration-200"
      >
        <Phone className="w-5 h-5 fill-current" />
        <span className="text-[16px] font-bold tracking-wide">
          Call Emergency: 0581-2510204
        </span>
      </a>
    </div>
  );
};