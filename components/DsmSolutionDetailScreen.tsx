import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface DsmSolutionDetailScreenProps {
  setPage: (page: Page) => void;
}

const DsmSolutionDetailScreen: React.FC<DsmSolutionDetailScreenProps> = ({ setPage }) => {
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
      <Header setPage={setPage} onBack={() => setPage(Page.TailoredInCabin)} variant="white" />

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
