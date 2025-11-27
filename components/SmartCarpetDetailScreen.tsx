import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface SmartCarpetDetailScreenProps {
  setPage: (page: Page) => void;
}

const SmartCarpetDetailScreen: React.FC<SmartCarpetDetailScreenProps> = ({ setPage }) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(images/bg-ev-charger.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header setPage={setPage} onBack={handleBack} variant="white" />

      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: 0,
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
          zIndex: 1
        }}
      >
        <source src={`images/smartcarpet.webm?v=${Date.now()}`} type="video/webm" />
      </video>

      <div
        style={{
          position: 'absolute',
          bottom: '213px',
          left: '118px',
          width: '700px'
        }}
      >
        <h1
          style={{
            color: '#09294A',
            fontFamily: '"Albert Sans"',
            fontSize: '52px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '150%',
            letterSpacing: '-0.52px',
            margin: '0 0 24px 0'
          }}
        >
          Smart Carpet
        </h1>
        <p
          style={{
            color: '#09294A',
            fontFamily: '"Albert Sans"',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: '300',
            lineHeight: '140%',
            letterSpacing: '-0.28px',
            margin: 0
          }}
        >
          Experience the <strong style={{ fontWeight: '700' }}>Smart Carpet system</strong>, featuring an integrated module that supports sensors or lighting components, providing a flexible platform for status indication, guided entry, and enhanced visibility that enriches both usability and the overall in-cabin interaction experience.
        </p>
      </div>
    </div>
  );
};

export default SmartCarpetDetailScreen;
