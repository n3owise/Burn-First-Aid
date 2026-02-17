import React, { useState } from 'react';
import { Header } from './Header';
import { HospitalBanner } from './HospitalBanner';
import { GuideCard } from './GuideCard';
import { EmergencyButton } from './EmergencyButton';
import { MarqueeCarousel } from './MarqueeCarousel';
import { HomeFooter } from './HomeFooter';
import { BURN_GUIDES } from '../constants';
import { SearchX } from 'lucide-react';

interface HomeScreenProps {
  onGuideSelect: (id: string) => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onGuideSelect, lang, setLang }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter guides based on search query (case-insensitive, check title and description in both langs)
  const filteredGuides = BURN_GUIDES.filter(guide => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      guide.title.en.toLowerCase().includes(query) ||
      guide.title.hi.toLowerCase().includes(query) ||
      guide.description.en.toLowerCase().includes(query) ||
      guide.description.hi.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Sticky Header with Search */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Main Content */}
      <main className="flex flex-col w-full animate-in fade-in duration-300 pt-[60px]">

        {/* Marquee Carousel (only when not searching) */}
        {!isSearchOpen && (
          <section className="w-full px-4 pt-6">
            <MarqueeCarousel />
          </section>
        )}
        
        {/* Hospital Banner as Hero Background (only when not searching) */}
        {!isSearchOpen && <HospitalBanner lang={lang} />}

        {/* Title Section (only when not searching) */}
        {!isSearchOpen && (
          <div className="w-full px-4 py-8 text-center">
            <h1 className="font-serif-display text-5xl md:text-6xl font-medium text-gray-900 mb-3 tracking-tight">
              {lang === 'en' ? 'BURN FIRST AID' : 'जलन प्राथमिक चिकित्सा'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 font-light">
              {lang === 'en' ? 'By Eshan Hospital' : 'ईशान अस्पताल द्वारा'}
            </p>
          </div>
        )}

        {/* If searching, add some top padding */}
        {isSearchOpen && <div className="h-4" />}

        {/* Cards Container */}
        <div className="flex-1 relative z-10">
          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 px-4 py-4">
              {filteredGuides.map((guide) => (
                <GuideCard 
                  key={guide.id} 
                  guide={guide} 
                  lang={lang}
                  onClick={() => onGuideSelect(guide.id)}
                />
              ))}
            </div>
          ) : (
            // No Results State
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <SearchX className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-900 font-medium text-[16px] mb-1">
                {lang === 'en' ? 'No guides found' : 'कोई गाइड नहीं मिली'}
              </p>
              <p className="text-gray-500 text-[14px]">
                {lang === 'en' ? `We couldn't find matches for "${searchQuery}"` : `हमें "${searchQuery}" के लिए परिणाम नहीं मिले`}
              </p>
            </div>
          )}
        </div>

        <HomeFooter lang={lang} />
      </main>

      {/* Floating Emergency Button */}
      <EmergencyButton />
    </div>
  );
};