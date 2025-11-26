
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

  // Navigation history stack
  const historyRef = useRef<Page[]>([]);

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

  // Determine if we should use aurora effect for this transition
  const useAurora = shouldUseAuroraEffect(prevPageRef.current, page);
  const disableFade = prevPageRef.current === Page.TailoredInCabin || prevPageRef.current === Page.Innovation;
  const variants = disableFade ? noFadeVariants : (useAurora ? auroraPageVariants : simpleFadeVariants);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (historyRef.current.length > 0) {
        const previousPage = historyRef.current.pop()!;
        prevPageRef.current = page;
        setPage(previousPage);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [page]);

  // Custom setPage wrapper to handle history
  const handleSetPage = useCallback((newPage: Page) => {
    if (newPage !== page) {
      historyRef.current.push(page);
      window.history.pushState({}, '');
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

  // When leaving TailoredInCabin, skip page fade to avoid dark flash after whiteout
  if (disableFade) {
    return (
      <main className="h-screen w-screen bg-[#0A0F1A] overflow-hidden">
        <div className="h-full w-full relative">
          {renderPage()}
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen bg-[#0A0F1A] overflow-hidden">
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
};

export default App;
