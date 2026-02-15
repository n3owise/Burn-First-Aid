import React, { useRef, useEffect } from 'react';
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

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-50 h-[60px] bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5] flex items-center px-4 justify-between transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      {isSearchOpen ? (
        // SEARCH MODE
        <div className="flex items-center w-full gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
          <button 
            onClick={handleCloseSearch}
            className="p-1 rounded-full text-gray-500 active:bg-gray-100"
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
          <div className="flex items-center gap-3">
            {/* Search Button (Top Left) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 active:bg-gray-200 active:scale-95 transition-all"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-medical-text" />
            </button>

            {/* Title */}
            <h1 className="text-[18px] font-bold text-medical-text tracking-tight">
              {lang === 'en' ? 'Burn First Aid' : 'बर्न फर्स्ट एड'}
            </h1>
          </div>
          
          {/* Language Toggle */}
          <LanguageToggle lang={lang} setLang={setLang} />
        </>
      )}
    </header>
  );
};