
import React from 'react';
import { Page } from '../types';
import Header from './Header';
import { ArrowRightIcon } from './icons';

interface SvmScreenProps {
  setPage: (page: Page) => void;
}

const SvmScreen: React.FC<SvmScreenProps> = ({ setPage }) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-8 bg-cover bg-center" style={{ backgroundImage: 'url(images/home-bg.png)' }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <Header setPage={setPage} onBack={handleBack} />
      <div className="text-center relative z-10">
        <h1 className="text-4xl font-bold text-white">SVM</h1>
        <p className="text-lg text-gray-200 mt-2">Let's see how SVM works</p>
      </div>

      <div className="relative w-full max-w-4xl my-8 z-10">
        <img src="https://i.imgur.com/vHq1YqR.png" alt="Car with SVM" className="w-full h-auto" />
        <div className="absolute inset-0 flex items-center justify-center">
            {/* Animated green cone */}
            <div 
                className="w-1/2 h-1/2 opacity-30" 
                style={{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(16,185,129,0) 70%)',
                    animation: 'pulse 2s infinite'
                }}
            ></div>
        </div>
      </div>

       <button 
        onClick={() => alert("Next feature")}
        className="mt-8 px-8 py-4 bg-gray-800 text-white font-semibold rounded-full flex items-center gap-2 hover:bg-gray-900 transition-colors"
      >
        Next <ArrowRightIcon className="w-5 h-5" />
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default SvmScreen;
