import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface SmartCarpetDetailScreenProps {
  setPage: (page: Page) => void;
}

const SmartCarpetDetailScreen: React.FC<SmartCarpetDetailScreenProps> = ({ setPage }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(/images/bg-smart-carpet.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header setPage={setPage} onBack={() => setPage(Page.TailoredInCabin)} variant="white" />
    </div>
  );
};

export default SmartCarpetDetailScreen;
