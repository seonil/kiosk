import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface SvmSolutionDetailScreenProps {
  setPage: (page: Page) => void;
}

const SvmSolutionDetailScreen: React.FC<SvmSolutionDetailScreenProps> = ({ setPage }) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(images/bg-svm.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <video
        autoPlay
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1420px',
          height: 'auto',
          objectFit: 'cover',
          zIndex: 1
        }}
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = 0.7;
        }}
      >
        <source src={`images/svm.webm?v=${Date.now()}`} type="video/webm" />
      </video>

      <Header setPage={setPage} onBack={handleBack} variant="white" />

      <div
        style={{
          position: 'absolute',
          bottom: '113px',
          left: '68px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '40px',
          maxWidth: '1784px'
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
          SVM <br/> <span style={{ fontSize: '32px', fontWeight: '400', position: 'relative', top: '-35px' }}>(Surround View Monitoring)</span>
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
          Experience the <strong style={{ fontWeight: '700' }}>Surround View Monitoring</strong> system, <br/>which uses advanced image processing algorithms to stitch multi-camera feeds <br/>into a seamless 360-degree view, delivering enhanced visibility <br/>and intuitive real-time guidance to support safer and more confident maneuvering.
        </p>
      </div>
    </div>
  );
};

export default SvmSolutionDetailScreen;
