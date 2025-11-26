import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface AirPurifierSolutionDetailScreenProps {
  setPage: (page: Page) => void;
}

const AirPurifierSolutionDetailScreen: React.FC<AirPurifierSolutionDetailScreenProps> = ({ setPage }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(images/bg-air-purifier.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header setPage={setPage} onBack={() => setPage(Page.TailoredInCabin)} variant="white" />
    </div>
  );
};

export default AirPurifierSolutionDetailScreen;
