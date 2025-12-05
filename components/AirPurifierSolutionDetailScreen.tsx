import React, { useRef, useState } from 'react';
import { Page } from '../types';
import Header from './Header';

interface AirPurifierSolutionDetailScreenProps {
  setPage: (page: Page) => void;
}

const AirPurifierSolutionDetailScreen: React.FC<AirPurifierSolutionDetailScreenProps> = ({ setPage }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

      <img
        src="images/air-purifier.png"
        alt="Air Purifier"
        style={{
          position: 'absolute',
          top: '174px',
          left: '112px',
          zIndex: 5
        }}
      />

      <video
        ref={videoRef}
        autoPlay
        preload="auto"
        loop
        muted
        playsInline
        poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        onLoadedMetadata={() => {
          const el = videoRef.current;
          if (el) {
            el.currentTime = 0.12; // skip initial black frames
          }
        }}
        onCanPlay={() => {
          const el = videoRef.current;
          if (el) {
            el.play().catch(() => {});
          }
          setIsVideoLoaded(true);
        }}
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: 0,
          width: '1144px',
          height: 'auto',
          objectFit: 'cover',
          zIndex: 0,
          opacity: isVideoLoaded ? 1 : 0,
          visibility: isVideoLoaded ? 'visible' : 'hidden',
          transition: 'opacity 0.2s ease-out',
          willChange: 'opacity',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          display: 'block',
          overflow: 'hidden'
        }}
      >
        <source src={`images/airpurifier.webm?v=${Date.now()}`} type="video/webm" />
      </video>

      <div
        style={{
          position: 'absolute',
          bottom: '113px',
          left: '112px',
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

      <Header setPage={setPage} onBack={handleBack} variant="white" />
    </div>
  );
};

export default AirPurifierSolutionDetailScreen;
