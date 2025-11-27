import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface EvChargerDetailScreenProps {
  setPage: (page: Page) => void;
}

const EvChargerDetailScreen: React.FC<EvChargerDetailScreenProps> = ({ setPage }) => {
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
      <img
        src="images/bg-ev-charger-top.png"
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1920px',
          height: 'auto',
          objectFit: 'cover',
          zIndex: 2
        }}
      />

      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '1144px',
          height: 'auto',
          objectFit: 'cover',
          zIndex: 1
        }}
      >
        <source src={`images/ev.webm?v=${Date.now()}`} type="video/webm" />
      </video>

      <div
        style={{
          position: 'absolute',
          bottom: '213px',
          right: '100px',
          width: '605px'
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
          EV Charger
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
          Experience the <strong style={{ fontWeight: '700' }}>EV Charging system</strong>, which automatically displays charging status on the AVN the moment the cable is connected, providing real-time updates, intuitive progress monitoring, and a seamless interface that enhances the convenience and clarity of every charging session.
        </p>
      </div>

      <Header setPage={setPage} onBack={() => setPage(Page.TailoredInCabin)} variant="white" />
    </div>
  );
};

export default EvChargerDetailScreen;
