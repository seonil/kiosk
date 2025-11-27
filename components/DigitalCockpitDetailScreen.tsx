import React, { useRef, useEffect, useState } from 'react';
import { Page } from '../types';
import Header from './Header';

interface DigitalCockpitDetailScreenProps {
  setPage: (page: Page) => void;
}

const DigitalCockpitDetailScreen: React.FC<DigitalCockpitDetailScreenProps> = ({ setPage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [opacity, setOpacity] = useState(1);

  // Add CSS-in-JS styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(156, 163, 175, 0.4);
        }
        50% {
          box-shadow: 0 0 0 10px rgba(156, 163, 175, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(156, 163, 175, 0);
        }
      }

      @keyframes pulsePrompt {
        0% { transform: translateX(0) scale(1); opacity: 0.9; }
        50% { transform: translateX(-5px) scale(1.05); opacity: 1; }
        100% { transform: translateX(0) scale(1); opacity: 0.9; }
      }
      `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9; // 10% slower than normal
      videoRef.current.loop = false; // Play once

      const handleVideoEnd = () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      };

      videoRef.current.addEventListener('ended', handleVideoEnd);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('ended', handleVideoEnd);
        }
      };
    }
  }, [isToggleOn]); // Re-run when video source changes

  const handleToggle = () => {
    setIsToggleOn(!isToggleOn);
    setOpacity(0); // Start fade out
    setTimeout(() => {
      setOpacity(1); // Fade in after switching video
    }, 300);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(images/bg-digital-cockpit.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header setPage={setPage} onBack={() => setPage(Page.TailoredInCabin)} variant="white" />

      {/* Toggle Switch */}
      <div
        onClick={handleToggle}
        style={{
          position: 'absolute',
          top: '200px',
          right: '200px',
          width: '200px',
          height: '100px',
          backgroundColor: isToggleOn ? '#10B981' : '#9CA3AF',
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          padding: '5px',
          boxShadow: !isToggleOn ? '0 0 0 0 rgba(156, 163, 175, 0.4)' : 'none',
          animation: !isToggleOn ? 'pulse 2s infinite' : 'none'
        }}
      >
        <div
          style={{
            width: '90px',
            height: '90px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isToggleOn ? 'translateX(100px)' : 'translateX(0)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        />
      </div>

      {/* Prompt Message */}
      {!isToggleOn && (
        <div
          style={{
            position: 'absolute',
            top: '235px',
            right: '430px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'pulsePrompt 2s infinite'
          }}
        >
          <div
            style={{
              color: '#09294A',
              fontFamily: '"Albert Sans"',
              fontSize: '22px',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}
          >
            Tap to activate EZ-Mode
          </div>
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderLeft: '12px solid #09294A'
            }}
          />
        </div>
      )}

      <img
        src="images/digital-cockpit-normalmode.png"
        alt="Digital Cockpit Normal Mode"
        style={{
          position: 'absolute',
          top: '263px',
          left: '50%',
          transform: 'translateX(-50%) scale(0.8)',
          width: '100%',
          height: 'auto'
        }}
      />

      <video
        ref={videoRef}
        src={isToggleOn ? "images/showcase-cockpit_bottom.webm" : "images/showcase-cockpit_top.webm"}
        autoPlay
        muted
        playsInline
        key={isToggleOn ? "bottom" : "top"}
        style={{
          position: 'absolute',
          top: '283px',
          left: '50%',
          transform: 'translateX(-50%) scale(0.74)',
          width: '100%',
          height: 'auto',
          pointerEvents: 'none',
          opacity: opacity,
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
};

export default DigitalCockpitDetailScreen;
