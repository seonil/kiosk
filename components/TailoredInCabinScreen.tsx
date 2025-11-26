import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page } from '../types';
import Header from './Header';

type Solution = {
  id: string;
  title: string;
  image: string;
  description: string;
  accent: string;
  pageTarget?: Page;
};

const SOLUTIONS: Solution[] = [
  {
    id: 'cockpit',
    title: 'Digital Cockpit',
    image: '/images/btn-solution7.png',
    description: '',
    accent: '#7CD3FF',
    pageTarget: Page.DigitalCockpitDetail
  },
  {
    id: 'dsm',
    title: 'DSM',
    image: '/images/btn-solution3.png',
    description: '',
    accent: '#FFDD8B',
    pageTarget: Page.DsmSolutionDetail
  },
  {
    id: 'svm',
    title: 'SVM',
    image: '/images/btn-solution5.png',
    description: '',
    accent: '#8CD8FF',
    pageTarget: Page.SvmSolutionDetail
  },
  {
    id: 'camera',
    title: 'Dash Cam',
    image: '/images/btn-solution1.png',
    description: '',
    accent: '#FFB6B6',
    pageTarget: Page.DashCamDetail
  },
  {
    id: 'rse',
    title: 'RSE2.5',
    image: '/images/btn-solution8.png',
    description: '',
    accent: '#F9C9FF',
    pageTarget: Page.Rse25Detail
  },
  {
    id: 'ev',
    title: 'EV Charger',
    image: '/images/btn-solution4.png',
    description: '',
    accent: '#6CF7C7',
    pageTarget: Page.EvChargerDetail
  },
  {
    id: 'purifier',
    title: 'Air Purifier',
    image: '/images/btn-solution6.png',
    description: '',
    accent: '#A7C8FF',
    pageTarget: Page.AirPurifierSolutionDetail
  },
  {
    id: 'carpet',
    title: 'Smart Carpet',
    image: '/images/btn-solution2.png',
    description: '',
    accent: '#BBFF9E',
    pageTarget: Page.SmartCarpetDetail
  }
];

const TailoredInCabinScreen: React.FC<{ setPage: (page: Page) => void }> = ({ setPage }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationStage, setAnimationStage] = useState<'normal' | 'drift' | 'rotating' | 'charging'>('normal');
  const [whiteout, setWhiteout] = useState(false);

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleButtonClick = (solution: Solution) => {
    if (!solution.pageTarget || isTransitioning) return;

    setPage(solution.pageTarget);
  };

  // Animation variants
  const leftPanelVariants = {
    normal: { x: 0 },
    slideOut: { x: '-120%', opacity: 0 }
  };

  const rightPanelVariants = {
    normal: { x: 0 },
    slideOut: { x: '120%', opacity: 0 }
  };

  const carVariants = {
    normal: {
      rotate: 0,
      scale: 1,
      x: '-50%',
      y: 0,
      opacity: 0.95
    },
    drift: {
      rotate: -6,
      scale: 1,
      x: '-32%',
      y: -24,
      opacity: 0.98,
      transition: {
        duration: 0.22,
        ease: "easeOut"
      }
    },
    rotating: {
      rotate: -90,
      scale: 1,
      x: '-30%',
      y: -46,
      opacity: 0.95,
      transition: {
        duration: 0.55,
        ease: "easeInOut"
      }
    },
    charging: {
      rotate: -90,
      scale: 1,
      y: -1200,
      x: '-24%',
      opacity: 1,
      transition: {
        duration: 0.78,
        ease: "easeIn"
      }
    }
  };

  const whiteFadeVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.8 }
    },
    hide: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const renderMenuButton = (solution: Solution) => (
    <motion.button
      key={solution.id}
      onClick={() => handleButtonClick(solution)}
      disabled={isTransitioning}
      style={{
        position: 'relative',
        width: '377px',
        height: '120px',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        overflow: 'hidden',
        background: 'transparent'
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/solution-btn-n.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '24px',
          paddingRight: '24px',
          fontFamily: 'Albert Sans',
          fontWeight: 600,
          fontSize: '32px',
          fontStyle: 'normal',
          lineHeight: '150%',
          letterSpacing: '-0.32px',
          color: '#09294A'
        }}
      >
        <span>{solution.title}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="27" viewBox="0 0 31 27" fill="none">
          <path d="M0 13.0645H28M28 13.0645L15.9216 1.06445M28 13.0645L15.9216 25.0645" stroke="#09294A" strokeWidth="3"/>
        </svg>
      </div>
    </motion.button>
  );

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(/images/bg-incabin.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(45% 45% at 50% 50%, rgba(78, 194, 255, 0.15), transparent), radial-gradient(30% 30% at 70% 30%, rgba(255, 198, 255, 0.18), transparent)'
        }}
      />

      <Header setPage={setPage} onBack={() => setPage(Page.Home)} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '120px 120px'
        }}
      />

      <motion.div
        variants={leftPanelVariants}
        animate={isTransitioning ? 'slideOut' : 'normal'}
        transition={{ duration: 0.85, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          gap: '33px',
          top: '370px',
          left: '56px'
        }}
      >
        {SOLUTIONS.slice(0, 4).map(solution => renderMenuButton(solution))}
      </motion.div>

      <motion.div
        variants={rightPanelVariants}
        animate={isTransitioning ? 'slideOut' : 'normal'}
        transition={{ duration: 0.85, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          gap: '33px',
          top: '370px',
          right: '56px'
        }}
      >
        {SOLUTIONS.slice(4).map(solution => renderMenuButton(solution))}
      </motion.div>

      {/* Car image in center with animation */}
      <motion.img
        src="/images/car.png"
        alt="Car"
        variants={carVariants}
        animate={isTransitioning ? animationStage : "normal"}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '231px',
          width: '776px',
          height: 'auto',
          zIndex: 5,
          transformOrigin: 'center bottom'
        }}
      />

      {/* White fade overlay */}
      <AnimatePresence>
        {whiteout && (
          <motion.div
            variants={whiteFadeVariants}
            initial="hidden"
            animate="show"
            exit="hide"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'white',
              zIndex: 20,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TailoredInCabinScreen;
