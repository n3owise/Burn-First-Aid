import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

export const EmergencyButton: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollPosition(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Extended when at top (scrollPosition < 100), collapsed when scrolled
  const isExtended = scrollPosition < 100;

  return (
    // Container for positioning the FAB at the bottom center
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pb-safe pointer-events-none">
      <a
        href="tel:+919837041574"
        // Main container. Pointer events auto to allow clicking the button while container passes through touches.
        className={`
          pointer-events-auto
          flex items-center h-14 px-4
          bg-medical-red hover:bg-red-700 active:bg-red-800 text-white
          shadow-[0_4px_12px_rgba(230,57,70,0.4)]
          rounded-full
          transition-all duration-500 ease-in-out
          ${isExtended ? 'pr-6' : 'pr-4'}
        `}
        aria-label="Call Emergency: 9837041574"
        style={{
          willChange: 'padding-right',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Icon is always visible */}
        <Phone className="w-6 h-6 fill-current shrink-0" />
        
        {/* This div wraps the text and controls the expand/collapse animation */}
        <div 
          className="overflow-hidden flex items-center"
          style={{
            maxWidth: isExtended ? '200px' : '0px',
            opacity: isExtended ? 1 : 0,
            marginLeft: isExtended ? '12px' : '0px',
            transition: 'max-width 500ms ease-in-out, opacity 500ms ease-in-out, margin-left 500ms ease-in-out',
            willChange: 'max-width, opacity, margin-left',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* The text is in a span to prevent wrapping and ensure smooth reveal */}
          <span className="whitespace-nowrap font-bold tracking-wide text-[16px]">
            Call Emergency 
          </span>
        </div>
      </a>
    </div>
  );
};