import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import ecgAnimation from '../public/animations/ecg-loading.json';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Splash screen duration: 3 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Wait for fade-out animation to complete (500ms)
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
      }}
    >
      <style>{`
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .logo-container {
          animation: pulse-scale 2s ease-in-out infinite;
        }

        .hospital-name {
          animation: fade-in 1s ease-out 0.5s both;
        }

        .tagline {
          animation: slide-up 1s ease-out 1s both;
        }

        .loading-bar {
          animation: slide-up 1s ease-out 1.3s both;
        }
      `}</style>

      {/* Logo with pulse animation */}
      <div className="logo-container mb-6">
        <img
          src="/images/logo.png"
          alt="Burn First Aid Logo"
          className="w-48 h-48 object-contain"
        />
      </div>

      {/* Hospital Name */}
      <h1 className="hospital-name text-4xl font-bold text-medical-red text-center px-4 mb-2">
        Burn First Aid
      </h1>

      {/* Tagline */}
      <div className="tagline text-center px-4 mb-8">
        <p className="text-gray-700 font-medium mb-1.5">By Eshan Hospital</p>
        <p className="text-medical-red font-semibold">24x7 Emergency Available</p>
      </div>

      {/* ECG Loading Animation */}
      <div className="loading-bar w-48 h-24 flex items-center justify-center mb-4">
        <Lottie 
          animationData={ecgAnimation}
          loop={true}
          autoplay={true}
        />
      </div>

      {/* Bottom text */}
    </div>
  );
};
