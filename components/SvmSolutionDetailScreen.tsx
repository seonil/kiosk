import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface SvmSolutionDetailScreenProps {
  setPage: (page: Page) => void;
}

const SvmSolutionDetailScreen: React.FC<SvmSolutionDetailScreenProps> = ({ setPage }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(/images/bg-svm.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header setPage={setPage} onBack={() => setPage(Page.TailoredInCabin)} variant="white" />
    </div>
  );
};

export default SvmSolutionDetailScreen;
