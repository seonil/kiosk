
import React from 'react';
import { Page } from '../types';

interface HomeScreenProps {
  setPage: (page: Page) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ setPage }) => {
  const cards = [
    { imagePath: '/images/card1.png', page: Page.GroupOverview },
    { imagePath: '/images/card2.png', page: Page.TailoredInCabin },
    { imagePath: '/images/card3.png', page: Page.Innovation },
    { imagePath: '/images/card4.png', page: Page.Contact },
  ];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(/images/home-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Title - Single Line */}
      <h1
        className="text-white text-center font-bold absolute"
        style={{
          fontFamily: 'Albert Sans',
          fontSize: '94px',
          fontWeight: 700,
          lineHeight: '103.4px',
          top: '144px',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
        }}
      >
        Innovate Your Own In-Cabin
      </h1>

      {/* Subtitle */}
      <p
        className="text-white text-center absolute"
        style={{
          fontFamily: 'Albert Sans',
          fontSize: '24px',
          top: '268px',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
        }}
      >
        Experience the next evolution of intelligent in-cabin solution with MOTREX
      </p>

      {/* Cards Container */}
      <div
        className="absolute flex"
        style={{
          top: '410px',
          left: '64px',
          gap: '24px',
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => setPage(card.page)}
            className="cursor-pointer transition-all duration-300 hover:opacity-90"
            style={{
              width: '430px',
              height: '480px',
            }}
          >
            <img
              src={card.imagePath}
              alt={`Card ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ))}
      </div>

      {/* Footer Logo */}
      <div
        className="absolute"
        style={{
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/images/logo.png"
          alt="MOTREX CES 2026"
          style={{ height: 'auto', maxWidth: '400px' }}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
