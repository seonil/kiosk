import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface DsmSolutionDetailScreenProps {
  setPage: (page: Page) => void;
}

const DsmSolutionDetailScreen: React.FC<DsmSolutionDetailScreenProps> = ({ setPage }) => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(images/bg-dsm.png)',
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
          DSM <br/> <span style={{ fontSize: '32px', fontWeight: '400', position: 'relative', top: '-35px' }}>(Driver Status Monitoring)</span>
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
          Experience <strong style={{ fontWeight: '700' }}>Driver Status Monitoring</strong> system, <br/> which tracks driver's eye-closure patterns to detect signs of drowsiness, <br/>providing continuous monitoring and instant alerts through coordinated cluster <br/>and center-display warnings to enhance overall driving safety.
        </p>
      </div>

      <img
        src="images/dsm.png"
        alt="DSM"
        style={{
          position: 'absolute',
          bottom: '300px',
          left: '40px',
          width: '1352px',
          height: 'auto'
        }}
      />

      {/* Detection image with wiping animation */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '400px',
          width: 'auto',
          height: 'auto',
          zIndex: 10,
          overflow: 'hidden'
        }}
      >
        <img
          src="images/detection.png"
          alt="Detection"
          style={{
            display: 'block',
            width: 'auto',
            height: 'auto',
            animation: 'wipeDetection 2s ease-in-out infinite'
          }}
        />

        {/* Camera detection effect image positioned with specific margins */}
        <img
          src="images/detection-dsm.png"
          alt="DSM Detection Camera"
          style={{
            position: 'absolute',
            top: '285px',
            right: '712px',
            width: '180px',
            height: 'auto',
            zIndex: 11,
            opacity: 0.9
          }}
        />
      </div>

      {/* Camera detection effect image positioned with specific margins from screen edges */}
      <img
        src="images/detection-dsm.png"
        alt="DSM Detection Camera"
        style={{
          position: 'absolute',
          top: '285px',
          right: '712px',
          width: '137px',
          height: 'auto',
          zIndex: 11,
          opacity: 0.9
        }}
      />

      {/* CSS for wipe animation */}
      <style>{`
        @keyframes wipeDetection {
          0% {
            clip-path: inset(0 0 0 100%);
            opacity: 0.7;
          }
          50% {
            clip-path: inset(0 0 0 0%);
            opacity: 1;
          }
          100% {
            clip-path: inset(0 0 0 0%);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default DsmSolutionDetailScreen;
