import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface DashCamDetailScreenProps {
  setPage: (page: Page) => void;
}

const DashCamDetailScreen: React.FC<DashCamDetailScreenProps> = ({ setPage }) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(images/bg-dashcam.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header setPage={setPage} onBack={handleBack} variant="white" />

      <div
        style={{
          position: 'absolute',
          bottom: '113px',
          left: '68px',
          right: '166px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '40px'
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
            margin: 0,
            flexShrink: 0
          }}
        >
          Dash Cam
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
            flexGrow: 1,
            marginLeft: '65px',
            marginBottom: '0px'
          }}
        >
          Experience the <strong style={{ fontWeight: '700' }}>Intelligent Dash Cam</strong> system, offering wireless Wi-Fi connection <br/>to the AV/AVN platform for real-time monitoring and effortless access to key <br/>settings, while ensuring reliable evidence capture through multi-exposure <br/>blending that delivers clear, balanced footage even in high-contrast driving environments.
        </p>
      </div>
    </div>
  );
};

export default DashCamDetailScreen;
