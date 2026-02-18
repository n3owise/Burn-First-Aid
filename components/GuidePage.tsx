import React from 'react';
import { ChevronLeft, X, Check } from 'lucide-react';
import { EmergencyButton } from './EmergencyButton';
import { GuideContentData } from '../constants';
import { LanguageToggle } from './LanguageToggle';
import { Plyr } from 'plyr-react';
import 'plyr-react/plyr.css';

interface GuidePageProps {
  guideData: GuideContentData;
  onBack: () => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({ guideData, onBack, lang, setLang }) => {
  // Smooth scroll to top when mounted
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-32 pt-[60px]">
      {/* SECTION 1: TOP NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[52px] bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5] flex items-center justify-between px-3 transition-all duration-200">
        <button 
          onClick={onBack}
          className="flex items-center text-medical-text active:opacity-60 p-2 -ml-2 rounded-lg"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="text-[16px] font-medium ml-0.5">{lang === 'en' ? 'Back' : 'वापस'}</span>
        </button>
        
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold text-medical-text whitespace-nowrap overflow-hidden text-ellipsis max-w-[40%]">
          {guideData.title[lang]}
        </h1>
        
        {/* Language Toggle */}
        <LanguageToggle lang={lang} setLang={setLang} />
      </nav>

      <main className="animate-in fade-in duration-300">
        {/* SECTION 2: HERO IMAGE (Compact) */}
        <div className="relative w-full h-[170px] overflow-hidden shadow-sm bg-gray-100">
          <img 
            src={guideData.heroImage} 
            alt="Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* SECTION 4: WHAT TO DO (Compact 3-Column Grid) */}
        <section className="mt-2 mx-3 bg-green-50/50 rounded-xl p-3 border border-green-100">
          <h3 className="text-[15px] font-bold text-[#166534] mb-2 flex items-center gap-2">
            ✅ {lang === 'en' ? "Do This Immediately" : "तुरंत यह करें"}
          </h3>
          
          {/* First 3 DOS items */}
          <div className="grid grid-cols-3 gap-2">
            {guideData.dos.slice(0, 3).map((item, idx) => (
              <div key={idx} className="bg-white rounded-[8px] overflow-hidden shadow-sm border border-green-100 flex flex-col h-full">
                <div className="relative aspect-square w-full bg-gray-100">
                  <img src={item.image} alt="Do" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#15803d]/10 pointer-events-none" />
                  <div className="absolute top-1 right-1 bg-green-600 rounded-full p-0.5 shadow-md z-10">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="p-1.5 flex items-center justify-center flex-1 bg-white">
                  <p className="text-[10px] leading-3 text-center font-medium text-gray-700 line-clamp-3">
                    {item.text[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* YouTube Video - Only for Electrical Burn */}
          {guideData.id === 'electrical' && (
            <div className="mt-3 mb-3 rounded-lg overflow-hidden shadow-md">
              <Plyr
                source={{
                  type: 'video',
                  sources: [
                    {
                      src: 'DUaxt8OlT3o',
                      provider: 'youtube'
                    }
                  ]
                }}
                options={{
                  controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
                  youtube: { noCookie: true, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 }
                }}
              />
            </div>
          )}

          {/* Last 3 DOS items */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {guideData.dos.slice(3, 6).map((item, idx) => (
              <div key={idx + 3} className="bg-white rounded-[8px] overflow-hidden shadow-sm border border-green-100 flex flex-col h-full">
                <div className="relative aspect-square w-full bg-gray-100">
                  <img src={item.image} alt="Do" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#15803d]/10 pointer-events-none" />
                  <div className="absolute top-1 right-1 bg-green-600 rounded-full p-0.5 shadow-md z-10">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="p-1.5 flex items-center justify-center flex-1 bg-white">
                  <p className="text-[10px] leading-3 text-center font-medium text-gray-700 line-clamp-3">
                    {item.text[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: WHAT NOT TO DO (Compact 3-Column Grid) */}
        <section className="mt-3 mx-3 bg-red-50/50 rounded-xl p-3 border border-red-100">
          <h3 className="text-[15px] font-bold text-[#DC2626] mb-2 flex items-center gap-2">
            ❌ {lang === 'en' ? "Never Do This" : "यह कभी न करें"}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {guideData.donts.map((item, idx) => (
              <div key={idx} className="bg-white rounded-[8px] overflow-hidden shadow-sm border border-red-100 relative flex flex-col h-full">
                <div className="relative aspect-square w-full bg-gray-100">
                  <img src={item.image} alt="Don't" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#DC2626]/10 pointer-events-none" />
                  <div className="absolute top-1 right-1 bg-red-600 rounded-full p-0.5 shadow-md z-10">
                    <X className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="p-1.5 flex items-center justify-center flex-1 bg-white">
                  <p className="text-[10px] leading-3 text-center font-medium text-gray-700 line-clamp-3">
                    {item.text[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: DETAILED STEPS */}
        <section className="mx-4 mt-6 mb-4">
          <h3 className="text-[18px] font-bold text-medical-text mb-4 px-1">
            📋 {lang === 'en' ? "Step-by-Step Guide" : "चरण-दर-चरण गाइड"}
          </h3>
          <div className="flex flex-col gap-4">
            {guideData.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="shrink-0 w-8 h-8 rounded-full bg-medical-red flex items-center justify-center text-white font-bold text-[14px] shadow-sm">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-gray-900 mb-1 leading-snug">
                    {step.title[lang]}
                  </h4>
                  <p className="text-[14px] text-gray-600 leading-relaxed">
                    {step.description[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: WARNING SIGNS */}
        <section className="mx-4 mt-2 bg-[#FFFBEB] rounded-2xl p-5 border-l-[4px] border-[#F59E0B] shadow-sm">
          <h3 className="text-[18px] font-bold text-[#B45309] mb-3">
            ⚠️ {lang === 'en' ? "Go to Hospital If:" : "अस्पताल जाएं यदि:"}
          </h3>
          <ul className="space-y-2">
            {guideData.warnings.map((warning, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-[#92400E]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0" />
                <span className="text-[14px] font-medium leading-snug">
                  {warning[lang]}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Bottom spacing for fixed button */}
        <div className="h-[20px]" />
      </main>

      {/* SECTION 9: FIXED EMERGENCY BUTTON */}
      <EmergencyButton />
    </div>
  );
};