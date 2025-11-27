
import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../types';

interface HomeScreenProps {
  setPage: (page: Page) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ setPage }) => {
  // Animation settings - Easy on/off toggle
  const ENABLE_FLOATING = false; // Set to true to enable floating animation
  const HOVER_SCALE = 1.03; // Subtle hover scale effect (1.03 = 3% larger)

  const cards = [
    { imagePath: 'images/card1.png', page: Page.GroupOverview },
    { imagePath: 'images/card2.png', page: Page.TailoredInCabin },
    { imagePath: 'images/card3.png', page: Page.Innovation },
    { imagePath: 'images/card4.png', page: Page.Contact },
  ];

  // Each card has its own subtle floating animation pattern
  const floatingVariants = [
    { y: [-6, 6, -6], duration: 4.2, delay: 0 },
    { y: [4, -8, 4], duration: 5.1, delay: 0.3 },
    { y: [-5, 7, -5], duration: 4.7, delay: 0.6 },
    { y: [6, -5, 6], duration: 5.4, delay: 0.9 },
  ];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(images/home-bg.png)',
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
        {cards.map((card, index) => {
          const floating = floatingVariants[index];

          return (
          <motion.div
            key={index}
            onClick={() => setPage(card.page)}
            className="cursor-pointer"
            style={{
              width: '430px',
              height: '480px',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: ENABLE_FLOATING ? floating.y : 0
            }}
            transition={{
              opacity: { duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] },
              y: ENABLE_FLOATING ? {
                duration: floating.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floating.delay
              } : { duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }
            }}
            whileHover={{
              scale: HOVER_SCALE,
              y: -6,
              transition: {
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1] // Smooth spring-like easing
              }
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.15, ease: 'easeOut' }
            }}
          >
            <motion.div
              className="relative w-full h-full"
              whileHover={{
                filter: 'brightness(1.1)',
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut'
              }}
            >
              <img
                src={card.imagePath}
                alt={`Card ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  pointerEvents: 'none',
                }}
              />
              {/* Subtle glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  boxShadow: '0 0 40px rgba(255, 255, 255, 0)',
                  pointerEvents: 'none',
                }}
                whileHover={{
                  boxShadow: '0 0 40px rgba(255, 255, 255, 0.2)',
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
          </motion.div>
          );
        })}
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
          src="images/logo.png"
          alt="MOTREX CES 2026"
          style={{ height: 'auto', maxWidth: '400px' }}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
