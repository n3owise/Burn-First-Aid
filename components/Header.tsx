import React, { useRef, useEffect, useState } from 'react';
import { Flame, Search, X, ArrowLeft } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

interface HeaderProps {
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  lang, 
  setLang, 
  isSearchOpen, 
  setIsSearchOpen, 
  searchQuery, 
  setSearchQuery 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

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

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Calculate expansion based on scroll position (0-100px)
  // At top: collapsed (icon only) | On scroll: expanded (input field)
  const scrollProgress = Math.min(1, scrollPosition / 100);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5] flex items-center px-4 justify-between transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {isSearchOpen ? (
        // SEARCH MODE
        <div className="flex items-center w-full gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <button 
            onClick={handleCloseSearch}
            className="p-1 rounded-full text-gray-500 active:bg-gray-100 shrink-0"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? "Search burns (e.g., Oil, Chemical)..." : "जलन खोजें (जैसे तेल, केमिकल)..."}
              className="w-full h-10 bg-gray-100 rounded-lg pl-3 pr-8 text-[16px] text-medical-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-red/20 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 active:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        // DEFAULT MODE
        <>
          {/* Search Icon (Left) - Always visible */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 active:bg-gray-200 active:scale-95 transition-all"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-medical-text" />
          </button>

          {/* Expanding search input - grows from icon */}
          <div
            className="overflow-hidden flex items-center"
            style={{
              maxWidth: scrollProgress > 0.1 ? '200px' : '0px',
              opacity: scrollProgress,
              marginLeft: scrollProgress > 0.1 ? '8px' : '0px',
              transition: 'max-width 800ms ease-in-out, opacity 800ms ease-in-out, margin-left 800ms ease-in-out',
              willChange: 'max-width, opacity, margin-left',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <input
              type="text"
              placeholder={lang === 'en' ? "Search..." : "खोजें..."}
              className="h-9 bg-gray-100 rounded-lg px-2 text-[14px] text-medical-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-red/20 w-full"
              onClick={() => setIsSearchOpen(true)}
            />
          </div>

          {/* Title (Center) - Fades when scrolled */}
          <div
            className="flex-1 text-center"
            style={{
              opacity: scrollProgress < 0.5 ? 1 : 0,
              transition: 'opacity 800ms ease-in-out',
              willChange: 'opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <h1 className="text-[18px] font-bold text-medical-text tracking-tight">
              {lang === 'en' ? 'Burn First Aid' : 'बर्न फर्स्ट एड'}
            </h1>
          </div>
          
          {/* Language Toggle (Right) */}
          <div className="ml-auto">
            <LanguageToggle lang={lang} setLang={setLang} />
          </div>
        </>
      )}
    </header>
  );
};