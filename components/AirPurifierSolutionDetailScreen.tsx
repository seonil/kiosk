import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface AirPurifierSolutionDetailScreenProps {
  setPage: (page: Page) => void;
}

const AirPurifierSolutionDetailScreen: React.FC<AirPurifierSolutionDetailScreenProps> = ({ setPage }) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(images/bg-air-purifier.png)',
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
        <source src={`images/airpurifier.webm?v=${Date.now()}`} type="video/webm" />
      </video>

      <div
        style={{
          position: 'absolute',
          bottom: '113px',
          left: '68px',
          width: '700px',
          zIndex: 10
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
            margin: '0 0 24px 0',
            position: 'relative',
            zIndex: 10
          }}
        >
          Air Purifier
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
            margin: 0,
            position: 'relative',
            zIndex: 10
          }}
        >
          Experience the <strong style={{ fontWeight: '700' }}>Air Purifier</strong>, combining advanced purification and sterilization performance with real-time AQI display, while seamlessly integrating with the AVN for intuitive control, status monitoring, and user-friendly convenience features that maintain a cleaner and more comfortable in-cabin environment.
        </p>
      </div>
    </div>
  );
};

export default AirPurifierSolutionDetailScreen;
