
import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  setPage: (page: Page) => void;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ setPage, onBack }) => {
  return (
    <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-10">
      <button
        onClick={onBack}
        className="cursor-pointer transition-all duration-300 hover:opacity-80"
      >
        <img
          src="/images/btn-back.png"
          alt="Back"
          style={{ height: 'auto', width: 'auto' }}
        />
      </button>
      <button
        onClick={() => setPage(Page.Home)}
        className="cursor-pointer transition-all duration-300 hover:opacity-80"
      >
        <img
          src="/images/btn-home.png"
          alt="Home"
          style={{ height: 'auto', width: 'auto' }}
        />
      </button>
    </header>
  );
};

export default Header;
