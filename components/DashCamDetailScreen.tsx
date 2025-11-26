import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface DashCamDetailScreenProps {
  setPage: (page: Page) => void;
}

const DashCamDetailScreen: React.FC<DashCamDetailScreenProps> = ({ setPage }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(images/bg-dashcam.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header setPage={setPage} onBack={() => setPage(Page.TailoredInCabin)} variant="white" />
    </div>
  );
};

export default DashCamDetailScreen;
