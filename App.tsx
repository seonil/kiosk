
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Page } from './types';
import HomeScreen from './components/HomeScreen';
import GroupOverviewScreen from './components/GroupOverviewScreen';
import ProductDetailPage from './components/ProductDetailPage';
import TailoredInCabinScreen from './components/TailoredInCabinScreen';
import SvmScreen from './components/SvmScreen';
import InnovationScreen from './components/InnovationScreen';
import ContactScreen from './components/ContactScreen';
import {
  auroraPageVariants,
  simpleFadeVariants,
  auroraOverlayVariants,
  pageTransitionConfig,
  shouldUseAuroraEffect
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
  Page.AirPurifierDetail,
  Page.DsmDetail,
  Page.AdsPlatformDetail,
  Page.DashcamDetail,
  Page.ClusterDetail,
  Page.Mh300lDetail,
  Page.EvHomeChargerDetail,
  Page.PortableChargerDetail,
  Page.Cv1DrtAiAssistantDetail,
  Page.SeedsDetail,
  Page.InCabinAdventureDetail,
  Page.VisionAiPbvDetail
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

  // Determine if we should use aurora effect for this transition
  const useAurora = shouldUseAuroraEffect(prevPageRef.current, page);

  // Save page to sessionStorage and update previous page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('currentPage', page);
    }
    prevPageRef.current = page;
  }, [page]);

  const renderPage = () => {
    if (DETAIL_PAGES.has(page)) {
      return <ProductDetailPage setPage={setPage} detailPage={page} />;
    }

    switch (page) {
      case Page.Home:
        return <HomeScreen setPage={setPage} />;
      case Page.GroupOverview:
        return <GroupOverviewScreen setPage={setPage} />;
      case Page.TailoredInCabin:
        return <TailoredInCabinScreen setPage={setPage} />;
      case Page.SvmDetail:
        return <SvmScreen setPage={setPage} />;
      case Page.Innovation:
        return <InnovationScreen setPage={setPage} />;
      case Page.Contact:
        return <ContactScreen setPage={setPage} />;
      default:
        return <HomeScreen setPage={setPage} />;
    }
  };

  return (
    <main className="h-screen w-screen bg-[#0A0F1A] overflow-hidden">
      <AnimatePresence mode={pageTransitionConfig.mode} initial={pageTransitionConfig.initial}>
        <motion.div
          key={page}
          variants={useAurora ? auroraPageVariants : simpleFadeVariants}
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
