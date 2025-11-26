import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface EvChargerDetailScreenProps {
  setPage: (page: Page) => void;
}

const EvChargerDetailScreen: React.FC<EvChargerDetailScreenProps> = ({ setPage }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(images/bg-ev-charger.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header setPage={setPage} onBack={() => setPage(Page.TailoredInCabin)} variant="white" />
    </div>
  );
};

export default EvChargerDetailScreen;
