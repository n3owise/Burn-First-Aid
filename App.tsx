import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { GuidePage } from './components/GuidePage';
import { SplashScreen } from './components/SplashScreen';
import { getGuideDataById } from './constants';

type ViewState = 'home' | 'guide';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const handleGuideSelect = (id: string) => {
    setSelectedGuideId(id);
    setCurrentView('guide');
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedGuideId(null);
  };

  // Get the guide data dynamically based on selected ID
  const guideData = selectedGuideId ? getGuideDataById(selectedGuideId) : null;

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-white max-w-[480px] mx-auto shadow-2xl overflow-hidden relative font-sans">
      {currentView === 'home' ? (
        <HomeScreen 
          onGuideSelect={handleGuideSelect} 
          lang={lang} 
          setLang={setLang} 
        />
      ) : guideData ? (
        <GuidePage 
          guideData={guideData} 
          onBack={handleBack} 
          lang={lang}
          setLang={setLang}
        />
      ) : (
        <div className="p-4 text-center">Guide not found</div>
      )}
    </div>
  );
};

export default App;