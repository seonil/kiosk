import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Page } from './types';
import HomeScreen from './components/HomeScreen';
import GroupOverviewScreen from './components/GroupOverviewScreen';
import ProductDetailPage from './components/ProductDetailPage';
import TailoredInCabinScreen from './components/TailoredInCabinScreen';
import InnovationScreen from './components/InnovationScreen';
import ContactScreen from './components/ContactScreen';
import Cv1DrtScreen from './components/Cv1DrtScreen';
import DigitalCockpitDetailScreen from './components/DigitalCockpitDetailScreen';
import DsmSolutionDetailScreen from './components/DsmSolutionDetailScreen';
import SvmSolutionDetailScreen from './components/SvmSolutionDetailScreen';
import DashCamDetailScreen from './components/DashCamDetailScreen';
import Rse25DetailScreen from './components/Rse25DetailScreen';
import EvChargerDetailScreen from './components/EvChargerDetailScreen';
import AirPurifierSolutionDetailScreen from './components/AirPurifierSolutionDetailScreen';
import SmartCarpetDetailScreen from './components/SmartCarpetDetailScreen';
import {
  auroraPageVariants,
  simpleFadeVariants,
  auroraOverlayVariants,
  pageTransitionConfig,
  shouldUseAuroraEffect,
  noFadeVariants
} from './utils/transitions';

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const DETAIL_PAGES = new Set<Page>([
  Page.MotrexDetail,
  Page.MotrexEvDetail,
  Page.MotrexEfmDetail,
  Page.MtrDetail,
  Page.JunjinDetail,
  Page.EzCockpitDetail,
  Page.NidusDetail,
  Page.HvacControlDetail,
  Page.SevenInchAvDetail,
  Page.TaxiPbvAvntDetail,
  Page.CommercialTruckClusterDetail,
  Page.PassengerRseDetail,
  Page.TrainVodDetail,
  Page.CeilingFoldingMonitorDetail,
  Page.HmiDisplayDetail,
  Page.AirPurifierDetail,
  Page.DsmDetail,
  Page.SvmDetail,
  Page.AdsPlatformDetail,
  Page.DashcamDetail,
  Page.ClusterDetail,
  Page.Mh300lDetail,
  Page.EvHomeChargerDetail,
  Page.PortableChargerDetail,
  Page.SeedsDetail,
  Page.InCabinAdventureDetail
]);

const App: React.FC = () => {
  // Track previous page for transition logic
  const prevPageRef = useRef<Page | null>(null);

  // Initialize page from sessionStorage or default to Home
  const [page, setPage] = useState<Page>(() => {
    if (typeof window !== 'undefined') {
      const savedPage = sessionStorage.getItem('currentPage');
      if (savedPage && Object.values(Page).includes(savedPage as Page)) {
        return savedPage as Page;
      }
    }
    return Page.Home;
  });
  const [viewport, setViewport] = useState({ scale: 1, offsetX: 0, offsetY: 0 });

  const updateViewport = useCallback(() => {
    if (typeof window === 'undefined') return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.min(vw / DESIGN_WIDTH, vh / DESIGN_HEIGHT);
    const scaledW = DESIGN_WIDTH * scale;
    const scaledH = DESIGN_HEIGHT * scale;
    setViewport({
      scale,
      offsetX: (vw - scaledW) / 2,
      offsetY: (vh - scaledH) / 2
    });
  }, []);

  // Determine if we should use aurora effect for this transition
  const useAurora = shouldUseAuroraEffect(prevPageRef.current, page);
  const disableFade = prevPageRef.current === Page.TailoredInCabin || prevPageRef.current === Page.Innovation;
  const variants = disableFade ? noFadeVariants : (useAurora ? auroraPageVariants : simpleFadeVariants);

  // Recompute scaling/letterboxing on resize (tablet sees full width with top/bottom margin)
  useEffect(() => {
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, [updateViewport]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const previousPage = event.state?.page as Page | undefined;
      if (previousPage && Object.values(Page).includes(previousPage)) {
        setPage(previousPage);
        return;
      }
      // If no history state, default to home
      setPage(Page.Home);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Ensure the initial history entry carries the current page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.replaceState({ page }, '', window.location.pathname);
    }
  }, []);

  // Custom setPage wrapper to handle history
  const handleSetPage = useCallback((newPage: Page) => {
    if (newPage !== page) {
      window.history.pushState({ page: newPage }, '', window.location.pathname);
      setPage(newPage);
    }
  }, [page]);

  // Save page to sessionStorage and update previous page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('currentPage', page);
    }
    prevPageRef.current = page;
  }, [page]);

  const renderPage = () => {
    if (DETAIL_PAGES.has(page)) {
      return <ProductDetailPage setPage={handleSetPage} detailPage={page} />;
    }

    switch (page) {
      case Page.Home:
        return <HomeScreen setPage={handleSetPage} />;
      case Page.GroupOverview:
        return <GroupOverviewScreen setPage={handleSetPage} />;
      case Page.TailoredInCabin:
        return <TailoredInCabinScreen setPage={handleSetPage} />;
      case Page.Cv1DrtAiAssistantDetail:
        return <Cv1DrtScreen setPage={handleSetPage} />;
      case Page.Innovation:
        return <InnovationScreen setPage={handleSetPage} />;
      case Page.Contact:
        return <ContactScreen setPage={handleSetPage} />;
      case Page.DigitalCockpitDetail:
        return <DigitalCockpitDetailScreen setPage={handleSetPage} />;
      case Page.DsmSolutionDetail:
        return <DsmSolutionDetailScreen setPage={handleSetPage} />;
      case Page.SvmSolutionDetail:
        return <SvmSolutionDetailScreen setPage={handleSetPage} />;
      case Page.DashCamDetail:
        return <DashCamDetailScreen setPage={handleSetPage} />;
      case Page.Rse25Detail:
        return <Rse25DetailScreen setPage={handleSetPage} />;
      case Page.EvChargerDetail:
        return <EvChargerDetailScreen setPage={handleSetPage} />;
      case Page.AirPurifierSolutionDetail:
        return <AirPurifierSolutionDetailScreen setPage={handleSetPage} />;
      case Page.SmartCarpetDetail:
        return <SmartCarpetDetailScreen setPage={handleSetPage} />;
      default:
        return <HomeScreen setPage={handleSetPage} />;
    }
  };

  const pageContent = disableFade ? (
    <main style={{ width: '100%', height: '100%', backgroundColor: '#0A0F1A', overflow: 'hidden' }}>
      <div className="h-full w-full relative">
        {renderPage()}
      </div>
    </main>
  ) : (
    <main style={{ width: '100%', height: '100%', backgroundColor: '#0A0F1A', overflow: 'hidden' }}>
      <AnimatePresence mode={pageTransitionConfig.mode} initial={pageTransitionConfig.initial}>
        <motion.div
          key={page}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="h-full w-full relative"
          style={{ willChange: useAurora ? 'opacity, filter' : 'opacity' }}
        >
          {renderPage()}

          {/* Aurora gradient overlay - only visible during aurora transitions */}
          {useAurora && (
            <motion.div
              variants={auroraOverlayVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 pointer-events-none"
              style={{ mixBlendMode: 'screen' }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#05070D',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `translate(${viewport.offsetX}px, ${viewport.offsetY}px) scale(${viewport.scale})`,
          transformOrigin: 'top left'
        }}
      >
        {pageContent}
      </div>
    </div>
  );
};

export default App;
