import React, { useState } from 'react';
import { Page } from '../types';
import Header from './Header';

interface Cv1DrtScreenProps {
  setPage: (page: Page) => void;
}

const Cv1DrtScreen: React.FC<Cv1DrtScreenProps> = ({ setPage }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center relative"
      style={{
        backgroundImage: 'url(images/bg-detail.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header setPage={setPage} onBack={() => setPage(Page.Innovation)} />

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-16">
        <h1
          className="mb-12"
          style={{
            fontSize: '64px',
            fontWeight: 700,
            fontFamily: 'Albert Sans',
            color: '#09294A',
            textShadow: '0 12px 25px rgba(9, 41, 74, 0.25)'
          }}
        >
          CV1-DRT
        </h1>

        <div
          className="relative"
          style={{
            width: '1280px',
            height: '720px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#000'
          }}
        >
          <video
            src="videos/mtr.mp4"
            poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isVideoLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in',
              background: '#000'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Cv1DrtScreen;
