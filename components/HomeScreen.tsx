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
                <div className="mb-6 pb-6 border-b-2 border-gray-200 bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      Dr
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 mb-1">Dr. Kaushal Kumar</p>
                      <p className="text-sm text-blue-600 font-semibold">M.S. (General Surgery), M.Ch. (Plastic Surgery)</p>
                      <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                        Eshan Hospital, Bareilly
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-lg p-6 mb-8 shadow-sm">
                  <p className="text-gray-800 leading-relaxed text-base font-medium">
                    Burns 🔥 is a very common ailment in the kitchen and at places where open fire is used as in the industries.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">⚠️</span>
                    Burns may be due to various causes:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-700 text-base">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong className="text-gray-900">FIRE</strong> (Flame burns)</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 text-base">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong className="text-gray-900">Liquids and steam</strong> (Scald burns)</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 text-base">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong className="text-gray-900">ELECTRICAL</strong> burns</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 text-base">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong className="text-gray-900">CHEMICAL</strong> burns (Acid and Alkali burns)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-xl shadow-md">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">💡</span>
                    <p className="font-bold text-yellow-900 text-lg">Important:</p>
                  </div>
                  <p className="text-gray-800 leading-relaxed text-base mb-3">
                    First aid includes removal of causing agent and to nullify the deleterious effects of causing agents immediately.
                  </p>
                  <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mt-4">
                    <strong className="text-yellow-900 text-base block text-center font-bold tracking-wide">
                      ✨ A GOOD FIRST AID IS A ROAD MAP TO GOOD RECOVERY ✨
                    </strong>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-900 to-orange-900 text-white rounded-xl p-6 mb-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span className="text-3xl">🔥</span>
                    Steps of First Aid in Flame Burns
                  </h3>
                  <div className="h-1 w-24 bg-orange-400 rounded-full mb-4"></div>
                </div>
                
                <div className="bg-red-50 border-2 border-red-300 p-6 mb-6 rounded-xl shadow-md">
                  <p className="font-bold text-red-900 text-lg mb-3 flex items-center gap-2">
                    <span className="text-2xl">👤</span>
                    If the patient is talking & breathing normally:
                  </p>
                  <div className="bg-red-100 border border-red-400 rounded-lg p-4">
                    <p className="text-red-800 text-base font-bold text-center">
                      ⚠️ NEVER RUSH TO THE HOSPITAL Immediately.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-blue-100">
                  <ol className="space-y-4">
                    <li className="flex items-start gap-4 text-gray-800 text-base">
                      <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                      <span className="pt-1"><strong className="text-gray-900">Pour plain water</strong> for 30 minutes to one hour till burning sensation subsides.</span>
                    </li>
                  </ol>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-400 p-6 mb-6 rounded-xl shadow-lg">
                  <h4 className="font-bold text-red-900 text-xl mb-4 flex items-center gap-2">
                    <span className="text-2xl">❌</span>
                    Say NO TO:
                  </h4>
                  <ul className="space-y-4">
                    <li className="bg-white rounded-lg p-4 border-l-4 border-red-500 shadow-sm">
                      <strong className="text-red-900 text-base block mb-2">ICE, CHILLED WATER</strong>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        It induces vasoconstriction and affects the body's reaction to injury. May increase depth of burns, hence poor prognosis, especially in larger area burns.
                      </p>
                    </li>
                    <li className="bg-white rounded-lg p-4 border-l-4 border-red-500 shadow-sm">
                      <strong className="text-red-900 text-base block mb-2">TOOTHPASTE, OIL, GENTIAN VIOLET PAINT, etc.</strong>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Must not be used; they might contaminate burnt surface and hamper the assessment of burn area.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6 mb-6 rounded-xl shadow-md">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">⚠️</span>
                    <p className="font-bold text-blue-900 text-lg">Special Considerations:</p>
                  </div>
                  <p className="text-gray-800 leading-relaxed text-base">
                    There are two restrictions of hydrotherapy in children and old aged patients. Prolonged hydrotherapy may affect the core temperature of body, especially in winters. In this situation, rush to the hospital after precise first aid steps for 10-15 minutes.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200">
                  <p className="text-gray-800 text-base leading-relaxed mb-4">
                    <strong className="text-gray-900 text-lg">After first aid:</strong> Cover the wound with clean cotton cloth and reach to the burn center.
                  </p>
                  <div className="h-px bg-gray-200 my-4"></div>
                  <p className="text-gray-800 text-base leading-relaxed">
                    If you are coming from a distance (travel time is more than 30 minutes), get an infusion of Ringer Lactate according to the burn area and age of the patient.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 mb-8 rounded-xl shadow-xl border-4 border-red-800">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">🚨</span>
                    <p className="font-bold text-2xl">EMERGENCY</p>
                  </div>
                  <p className="text-red-100 text-lg font-semibold mb-4">Rush to Hospital Immediately if:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-white text-base">
                      <span className="text-xl flex-shrink-0">▸</span>
                      <span>Patient is feeling difficulty in respiration (respiratory burns)</span>
                    </li>
                    <li className="flex items-start gap-3 text-white text-base">
                      <span className="text-xl flex-shrink-0">▸</span>
                      <span>Give Oxygen to the patient while transporting (if available)</span>
                    </li>
                    <li className="flex items-start gap-3 text-white text-base">
                      <span className="text-xl flex-shrink-0">▸</span>
                      <span><strong className="text-yellow-300">NO water by mouth</strong></span>
                    </li>
                    <li className="flex items-start gap-3 text-white text-base">
                      <span className="text-xl flex-shrink-0">▸</span>
                      <span>If the sensorium of the patient is altered, keep the patient in lateral or prone position to avoid inhalation of vomitus</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-xl p-6 mb-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span className="text-3xl">⚡</span>
                    Electrical Burns
                  </h3>
                  <div className="h-1 w-24 bg-purple-400 rounded-full mb-4"></div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border-2 border-purple-300 mb-8 shadow-md">
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                      <p className="text-gray-800 text-base">
                        <strong className="text-green-700 text-lg">If patient is responding and conscious:</strong>
                        <span className="block mt-2 text-gray-700">Rush to the hospital immediately.</span>
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 shadow-sm">
                      <p className="text-gray-800 text-base">
                        <strong className="text-red-700 text-lg">If patient is not responding:</strong>
                        <span className="block mt-2 text-gray-700">Start CPR immediately.</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-900 to-teal-900 text-white rounded-xl p-6 mb-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <span className="text-3xl">🧪</span>
                    Chemical Burns
                  </h3>
                  <div className="h-1 w-24 bg-green-400 rounded-full mb-4"></div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border-2 border-green-300 shadow-md">
                  <div className="bg-white rounded-lg p-5 mb-4 border-l-4 border-green-600 shadow-sm">
                    <p className="text-gray-800 text-base leading-relaxed">
                      <strong className="text-green-800 text-lg block mb-2">If face and scalp NOT involved:</strong>
                      <span className="text-gray-700">Do hydrotherapy with copious water and ask the patient to hold respiration to avoid damage of respiratory system by chemical fumes.</span>
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-100 to-red-200 border-2 border-red-400 p-5 rounded-lg mb-4 shadow-md">
                    <p className="font-bold text-red-900 text-lg mb-2 flex items-center gap-2">
                      <span className="text-2xl">❌</span>
                      DO NOT USE:
                    </p>
                    <p className="text-red-800 text-base leading-relaxed">
                      ACID for ALKALI and ALKALI for ACID - it will induce an exothermic reaction, which further damages the skin.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-5 border-l-4 border-orange-500 shadow-sm">
                    <p className="text-gray-800 text-base leading-relaxed">
                      <strong className="text-orange-800 text-lg block mb-2">If head and neck is involved:</strong>
                      <span className="text-gray-700">It will be better to rush to the hospital. Do not pour water without closing eyes and holding respiration. Flowing water might damage the eyes, and fumes might damage the respiratory tract.</span>
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