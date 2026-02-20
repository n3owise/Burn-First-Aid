import React, { useState } from 'react';
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
  const [firefluidExpanded, setFirefluidExpanded] = useState(false);
  const [showSparklerVideo, setShowSparklerVideo] = useState(false);
  
  // Version marker for cache debugging
  console.log('GuidePage v2.0 - SITE not SIGHT');
  
  // Smooth scroll to top when mounted
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-32 pt-[60px]">
      {/* SECTION 1: TOP NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[52px] bg-white/95 backdrop-blur-sm border-b border-[#E5E5E5] flex items-center justify-between px-3 transition-all duration-200">
        <button 
          onClick={() => {
            // Use history.back() if possible, otherwise use onBack
            if (window.history.state?.view === 'guide') {
              window.history.back();
            } else {
              onBack();
            }
          }}
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

        {/* Mechanical Sparkler - Only for Firecracker Burn */}
        {guideData.id === 'firecracker' && (
          <div className="mt-2 mx-3 mb-2">
            <style>{`
              @keyframes pulse-soft {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.02); opacity: 0.8; }
              }
              @keyframes slide-up {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes bounce-arrow {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
              .pulse-soft { animation: pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
              .slide-up { animation: slide-up 0.4s ease-out; }
              .bounce-arrow { animation: bounce-arrow 2s ease-in-out infinite; }
            `}</style>
            
            <button
              onClick={() => setFirefluidExpanded(!firefluidExpanded)}
              className="w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 hover:scale-105 relative"
            >
              <img src="/images/firecracker-placeholder.png" alt="Firecracker safety" className="w-full h-auto object-cover" />
              <div className="absolute top-3 left-0 right-0 flex justify-center">
                <p className="text-white text-[10px] font-bold bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm whitespace-nowrap">Use this 3 feet long mechanical sparkler or any device to ignite fireworks</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-3">
                <div className="flex items-center gap-2 animate-bounce">
                  <span className="bounce-arrow text-lg">👉</span>
                  <p className="text-white text-xs font-bold bg-orange-500/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    Tap to Learn More
                  </p>
                  <span className="bounce-arrow text-lg">👈</span>
                </div>
              </div>
            </button>
            

            {/* Expanded state - Safety details */}
            {firefluidExpanded && (
              <div className="mt-2 p-4 bg-gradient-to-br from-orange-50 via-orange-50 to-amber-50 rounded-lg border-2 border-orange-300 shadow-lg slide-up">
                <div className="space-y-3">
                  <h3 className="font-bold text-lg bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                    Mechanical Sparkler! 
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    Love the noise but hate the nerves? Our firecracker safety tool keeps your hands clear of the action.
                  </p>
                  <ul className="space-y-2.5 text-sm text-gray-700">
                    <li className="flex items-start gap-3 p-2 bg-white/60 rounded-lg hover:bg-white transition-colors">
                      <span className="text-orange-600 font-bold text-lg flex-shrink-0">📏</span>
                      <div>
                        <strong className="text-orange-700">Extended Reach:</strong>
                        <p className="text-xs text-gray-600 mt-0.5">Keep a safe distance from the fuse.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-2 bg-white/60 rounded-lg hover:bg-white transition-colors">
                      <span className="text-orange-600 font-bold text-lg flex-shrink-0">🤝</span>
                      <div>
                        <strong className="text-orange-700">Steady Grip:</strong>
                        <p className="text-xs text-gray-600 mt-0.5">No more fumbling with small fuses.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-2 bg-white/60 rounded-lg hover:bg-white transition-colors">
                      <span className="text-orange-600 font-bold text-lg flex-shrink-0">✨</span>
                      <div>
                        <strong className="text-orange-700">Pro-Safety:</strong>
                        <p className="text-xs text-gray-600 mt-0.5">The ultimate accessory for a worry-free celebration.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setFirefluidExpanded(false)}
                  className="mt-4 w-full py-2.5 text-sm font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md"
                >
                  Collapse ↑
                </button>
              </div>
            )}

            {/* Video Button */}
            <div className="mt-3">
              <button
                onClick={() => setShowSparklerVideo(true)}
                className="group w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3.5 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 font-medium text-sm border border-gray-700 hover:border-gray-600"
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">🎬</span>
                <span className="tracking-wide">{lang === 'en' ? 'Click here to watch video' : 'वीडियो देखने के लिए यहां क्लिक करें'}</span>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">▶</span>
              </button>
            </div>

            {/* Video Modal */}
            {showSparklerVideo && (
              <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowSparklerVideo(false)}
              >
                <div 
                  className="bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full animate-in zoom-in-95 duration-200 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setShowSparklerVideo(false)}
                    className="absolute -top-10 right-0 z-10 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Video Player */}
                  <div className="w-full p-3">
                    <style>{`
                      .plyr {
                        border-radius: 0.5rem;
                      }
                      .plyr--video {
                        background: black;
                      }
                      .plyr__controls {
                        background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.9)) !important;
                        padding: 30px 15px 15px !important;
                      }
                      .plyr__control--overlaid {
                        background: rgba(249, 115, 22, 0.9) !important;
                      }
                      .plyr__control--overlaid:hover {
                        background: rgba(249, 115, 22, 1) !important;
                      }
                      .plyr__progress {
                        margin-bottom: 0 !important;
                      }
                      .plyr__progress input[type=range] {
                        color: #f97316 !important;
                      }
                      .plyr--full-ui input[type=range] {
                        color: #f97316 !important;
                      }
                      .plyr__control {
                        color: white !important;
                      }
                      .plyr__control:hover {
                        background: rgba(249, 115, 22, 0.2) !important;
                      }
                      .plyr__time {
                        color: white !important;
                      }
                    `}</style>
                    <Plyr
                      source={{
                        type: 'video',
                        sources: [
                          {
                            src: 'https://res.cloudinary.com/dgybminsu/video/upload/v1771561914/Mechanical_Sparkler_1_rfugep.mp4',
                            type: 'video/mp4',
                          },
                        ],
                      }}
                      options={{
                        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'duration', 'fullscreen'],
                        autoplay: true,
                        hideControls: false,
                        resetOnEnd: false,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

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
            <div className="mt-3 mb-3">
              <div className="mb-2 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-[15px] font-bold text-red-800 leading-tight">
                  {lang === 'en' 
                    ? 'If patient unconscious or not breathing start resuscitation immediately at the site.' 
                    : 'यदि मरीज बेहोश है या सांस नहीं ले रहा है, तो तुरंत पुनर्जीवन शुरू करें।'}
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
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
              <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-[15px] font-bold text-red-800 leading-tight">
                  {lang === 'en' 
                    ? 'If conscious rush to hospital immediately.' 
                    : 'यदि होश में है, तो तुरंत अस्पताल जाएं।'}
                </p>
              </div>
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