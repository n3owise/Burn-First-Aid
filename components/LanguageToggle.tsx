import React from 'react';

interface LanguageToggleProps {
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ lang, setLang }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setLang(lang === 'en' ? 'hi' : 'en');
      }}
      className="relative flex items-center bg-gray-100 rounded-full p-1 h-7 cursor-pointer border border-gray-200 shadow-sm active:scale-95 transition-transform"
      aria-label="Toggle Language"
    >
      <div className={`absolute top-1 bottom-1 w-[22px] bg-white rounded-full shadow-sm transition-all duration-200 ease-in-out ${lang === 'en' ? 'left-1' : 'left-[30px]'}`} />
      <span className={`relative z-10 w-[22px] text-[10px] font-bold text-center transition-colors duration-200 ${lang === 'en' ? 'text-black' : 'text-gray-400'}`}>EN</span>
      <span className={`relative z-10 w-[22px] text-[10px] font-bold text-center transition-colors duration-200 ${lang === 'hi' ? 'text-black' : 'text-gray-400'}`}>हि</span>
    </button>
  );
};