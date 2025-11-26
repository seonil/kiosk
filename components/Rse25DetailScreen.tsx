import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import Header from './Header';

interface Rse25DetailScreenProps {
  setPage: (page: Page) => void;
}

const Rse25DetailScreen: React.FC<Rse25DetailScreenProps> = ({ setPage }) => {
  const [isRotated, setIsRotated] = useState(false);
  const [showPortrait, setShowPortrait] = useState(false);

  const handleClick = () => {
    setIsRotated(!isRotated);
  };

  useEffect(() => {
    if (isRotated) {
      const timer = setTimeout(() => {
        setShowPortrait(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowPortrait(false);
    }
  }, [isRotated]);

  return (
    <>
      <style>{`
        @keyframes pulse {
          0% { transform: translateX(-50%) scale(1); opacity: 0.9; }
          50% { transform: translateX(-50%) scale(1.05); opacity: 1; }
          100% { transform: translateX(-50%) scale(1); opacity: 0.9; }
        }
      `}</style>
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(/images/bg-rse25.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header setPage={setPage} onBack={() => setPage(Page.TailoredInCabin)} variant="white" />

      <div
        style={{
          position: 'absolute',
          top: '180px',
          left: '68px',
          maxWidth: '700px'
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
          RSE 2.5
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
          Discover the <strong style={{ fontWeight: '700' }}>Next-Gen Rear Seat Display</strong>, <br />
          an adaptive entertainment and information display <br />
          supporting both <strong style={{ fontWeight: '700' }}>landscape and portrait rotation</strong>, <br />
          providing <strong style={{ fontWeight: '700' }}>personalized content</strong> and <br />
          <strong style={{ fontWeight: '700' }}>connected services</strong> for all passengers.
        </p>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '200px',
          right: '180px',
          width: '950px',
          height: 'auto',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        <img
          src="/images/rse-landscape.png"
          alt="RSE Landscape"
          style={{
            width: '100%',
            height: 'auto',
            transform: `rotate(${isRotated ? -90 : 0}deg)`,
            transformOrigin: 'center',
            transition: 'transform 0.3s ease-in-out'
          }}
        />
        {!isRotated && (
          <div
            style={{
              position: 'absolute',
              top: '-80px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: 'pulse 2s infinite'
            }}
          >
            <div
              style={{
                color: 'white',
                fontFamily: '"Albert Sans"',
                fontSize: '22px',
                fontWeight: '600',
                marginBottom: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              Tap to rotate screen
            </div>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '12px solid white'
              }}
            />
          </div>
        )}
        {showPortrait && (
          <img
            src="/images/rse-portrait.png"
            alt="RSE Portrait"
            style={{
              position: 'absolute',
              top: '50%',
              left: 'calc(50% - 8px)',
              width: '155%',
              height: '153%',
              transform: 'translate(-50%, -50%)',
              objectFit: 'contain',
            }}
          />
        )}
      </div>
    </div>
    </>
  );
};

export default Rse25DetailScreen;
