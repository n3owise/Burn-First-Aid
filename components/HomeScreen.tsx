import React, { useState } from 'react';
import { Header } from './Header';
import { HospitalBanner } from './HospitalBanner';
import { GuideCard } from './GuideCard';
import { EmergencyButton } from './EmergencyButton';
import { MarqueeCarousel } from './MarqueeCarousel';
import { HomeFooter } from './HomeFooter';
import { BURN_GUIDES } from '../constants';
import { SearchX, X } from 'lucide-react';

interface HomeScreenProps {
  onGuideSelect: (id: string) => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onGuideSelect, lang, setLang }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFirstAidModalOpen, setIsFirstAidModalOpen] = useState(false);

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

        {/* First Aid Information Button (only when not searching) */}
        {!isSearchOpen && (
          <div className="px-4 py-6">
            <button
              onClick={() => setIsFirstAidModalOpen(true)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
              <span className="text-[15px] font-bold">
                {lang === 'en' ? '🔥 Click here to read more about First Aid in Burns' : '🔥 जलने पर प्राथमिक उपचार के बारे में और पढ़ें'}
              </span>
            </button>
          </div>
        )}

        <HomeFooter lang={lang} />
      </main>

      {/* First Aid Modal */}
      {isFirstAidModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsFirstAidModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gray-900 text-white px-5 py-4 flex items-center justify-between z-10 shadow-md">
              <div>
                <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  <span>First Aid in Burns</span>
                </h2>
                <p className="text-gray-400 text-xs mt-0.5">Essential Emergency Care Guide</p>
              </div>
              <button
                onClick={() => setIsFirstAidModalOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6 bg-gray-50">
              <div className="prose prose-sm max-w-none">
                <div className="mb-5 pb-5 border-b border-gray-200 bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      Dr
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-900">Dr. Kaushal Kumar</p>
                      <p className="text-xs text-gray-600 mt-0.5">M.S. (General Surgery), M.Ch. (Plastic Surgery)</p>
                      <p className="text-xs text-gray-500 mt-1">Eshan Hospital, Bareilly</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-l-3 border-orange-500 rounded-lg p-4 mb-5 shadow-sm">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Burns 🔥 is a very common ailment in the kitchen and at places where open fire is used as in the industries.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 mb-5 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-base">⚠️</span>
                    Burns may be due to various causes:
                  </h3>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5 text-gray-700 text-sm pl-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span><strong className="text-gray-900">FIRE</strong> (Flame burns)</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-gray-700 text-sm pl-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span><strong className="text-gray-900">Liquids and steam</strong> (Scald burns)</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-gray-700 text-sm pl-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span><strong className="text-gray-900">ELECTRICAL</strong> burns</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-gray-700 text-sm pl-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      <span><strong className="text-gray-900">CHEMICAL</strong> burns (Acid and Alkali burns)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 border-l-3 border-amber-500 p-4 mb-5 rounded-lg shadow-sm">
                  <p className="font-semibold text-amber-900 text-sm mb-2">💡 Important:</p>
                  <p className="text-gray-700 leading-relaxed text-sm mb-2">
                    First aid includes removal of causing agent and to nullify the deleterious effects of causing agents immediately.
                  </p>
                  <div className="bg-amber-100 rounded p-2.5 mt-3">
                    <p className="text-amber-900 text-xs font-semibold text-center">
                      A GOOD FIRST AID IS A ROAD MAP TO GOOD RECOVERY
                    </p>
                  </div>
                </div>

                <div className="bg-orange-600 text-white rounded-lg p-3.5 mb-4 shadow-sm">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <span className="text-lg">🔥</span>
                    Steps of First Aid in Flame Burns
                  </h3>
                </div>
                
                <div className="bg-red-50 border border-red-200 p-4 mb-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-red-900 text-sm mb-2 flex items-center gap-2">
                    <span className="text-base">👤</span>
                    If the patient is talking & breathing normally:
                  </p>
                  <div className="bg-white border border-red-300 rounded p-2.5">
                    <p className="text-red-700 text-xs font-semibold text-center">
                      ⚠️ NEVER RUSH TO THE HOSPITAL Immediately.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
                  <div className="flex items-start gap-3 text-gray-800 text-sm">
                    <span className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">1</span>
                    <span className="pt-0.5"><strong className="text-gray-900">Pour plain water</strong> for 30 minutes to one hour till burning sensation subsides.</span>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 p-4 mb-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-red-900 text-sm mb-3 flex items-center gap-2">
                    <span className="text-base">❌</span>
                    Say NO TO:
                  </h4>
                  <ul className="space-y-2.5">
                    <li className="bg-white rounded p-3 border-l-2 border-red-400">
                      <strong className="text-red-900 text-xs block mb-1">ICE, CHILLED WATER</strong>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        It induces vasoconstriction and affects the body's reaction to injury. May increase depth of burns, hence poor prognosis, especially in larger area burns.
                      </p>
                    </li>
                    <li className="bg-white rounded p-3 border-l-2 border-red-400">
                      <strong className="text-red-900 text-xs block mb-1">TOOTHPASTE, OIL, GENTIAN VIOLET PAINT, etc.</strong>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Must not be used; they might contaminate burnt surface and hamper the assessment of burn area.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-3 border-blue-500 p-4 mb-4 rounded-lg shadow-sm">
                  <p className="font-semibold text-blue-900 text-sm mb-2">⚠️ Special Considerations:</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    There are two restrictions of hydrotherapy in children and old aged patients. Prolonged hydrotherapy may affect the core temperature of body, especially in winters. In this situation, rush to the hospital after precise first aid steps for 10-15 minutes.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
                  <p className="text-gray-800 text-sm leading-relaxed mb-3">
                    <strong className="text-gray-900">After first aid:</strong> Cover the wound with clean cotton cloth and reach to the burn center.
                  </p>
                  <div className="h-px bg-gray-200 my-3"></div>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    If you are coming from a distance (travel time is more than 30 minutes), get an infusion of Ringer Lactate according to the burn area and age of the patient.
                  </p>
                </div>

                <div className="bg-red-600 text-white p-4 mb-5 rounded-lg shadow-md border-2 border-red-700">
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-xl">🚨</span>
                    <p className="font-semibold text-base">EMERGENCY</p>
                  </div>
                  <p className="text-red-100 text-sm font-medium mb-3">Rush to Hospital Immediately if:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-white text-xs">
                      <span className="text-sm flex-shrink-0">▸</span>
                      <span>Patient is feeling difficulty in respiration (respiratory burns)</span>
                    </li>
                    <li className="flex items-start gap-2 text-white text-xs">
                      <span className="text-sm flex-shrink-0">▸</span>
                      <span>Give Oxygen to the patient while transporting (if available)</span>
                    </li>
                    <li className="flex items-start gap-2 text-white text-xs">
                      <span className="text-sm flex-shrink-0">▸</span>
                      <span><strong>NO water by mouth</strong></span>
                    </li>
                    <li className="flex items-start gap-2 text-white text-xs">
                      <span className="text-sm flex-shrink-0">▸</span>
                      <span>If the sensorium of the patient is altered, keep the patient in lateral or prone position to avoid inhalation of vomitus</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-600 text-white rounded-lg p-3.5 mb-4 shadow-sm">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    Electrical Burns
                  </h3>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-5 shadow-sm">
                  <div className="space-y-2.5">
                    <div className="bg-white rounded p-3 border-l-2 border-green-500">
                      <p className="text-gray-800 text-sm">
                        <strong className="text-green-700 text-sm">If patient is responding and conscious:</strong>
                        <span className="block mt-1.5 text-gray-600 text-xs">Rush to the hospital immediately.</span>
                      </p>
                    </div>
                    <div className="bg-white rounded p-3 border-l-2 border-red-500">
                      <p className="text-gray-800 text-sm">
                        <strong className="text-red-700 text-sm">If patient is not responding:</strong>
                        <span className="block mt-1.5 text-gray-600 text-xs">Start CPR immediately.</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-700 text-white rounded-lg p-3.5 mb-4 shadow-sm">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <span className="text-lg">🧪</span>
                    Chemical Burns
                  </h3>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
                  <div className="bg-white rounded p-3 mb-3 border-l-2 border-green-600">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      <strong className="text-green-800 text-sm block mb-1.5">If face and scalp NOT involved:</strong>
                      <span className="text-gray-600 text-xs">Do hydrotherapy with copious water and ask the patient to hold respiration to avoid damage of respiratory system by chemical fumes.</span>
                    </p>
                  </div>
                  
                  <div className="bg-red-100 border border-red-300 p-3 rounded mb-3">
                    <p className="font-semibold text-red-900 text-sm mb-1.5 flex items-center gap-1.5">
                      <span className="text-base">❌</span>
                      DO NOT USE:
                    </p>
                    <p className="text-red-800 text-xs leading-relaxed">
                      ACID for ALKALI and ALKALI for ACID - it will induce an exothermic reaction, which further damages the skin.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded p-3 border-l-2 border-orange-500">
                    <p className="text-gray-800 text-sm leading-relaxed">
                      <strong className="text-orange-800 text-sm block mb-1.5">If head and neck is involved:</strong>
                      <span className="text-gray-600 text-xs">It will be better to rush to the hospital. Do not pour water without closing eyes and holding respiration. Flowing water might damage the eyes, and fumes might damage the respiratory tract.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Emergency Button */}
      <EmergencyButton />
    </div>
  );
};