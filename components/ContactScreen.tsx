
import React from 'react';
import { Page } from '../types';
import Header from './Header';

interface ContactScreenProps {
  setPage: (page: Page) => void;
}

const QRCodeCard: React.FC<{ title: string; subtitle: string; qrCodeUrl: string }> = ({ title, subtitle, qrCodeUrl }) => (
  <div
    className="relative flex flex-col items-center justify-center"
    style={{ width: '586px', height: '580px' }}
  >
    {/* Outer glow container */}
    <div
      className="absolute inset-0 rounded-3xl"
      style={{
        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)',
        filter: 'blur(20px)'
      }}
    />

    {/* Card background */}
    <div
      className="absolute inset-0 bg-white rounded-3xl"
      style={{
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}
    />

    {/* Inner gradient glow */}
    <div
      className="absolute rounded-3xl"
      style={{
        top: '41px',
        left: '11px',
        right: '11px',
        bottom: '42px',
        background: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.08) 0%, transparent 70%)',
        borderRadius: '24px'
      }}
    />

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
      <h3
        className="font-semibold text-center mb-10"
        style={{
          fontSize: '38px',
          lineHeight: '1.5',
          color: '#09294A',
          fontFamily: 'Albert Sans'
        }}
      >
        {title}
      </h3>

      <div
        className="bg-gray-100 rounded-xl mb-10 flex items-center justify-center overflow-hidden"
        style={{ width: '245px', height: '245px' }}
      >
        <img
          src={qrCodeUrl}
          alt={`${title} QR Code`}
          className="w-full h-full object-contain"
        />
      </div>

      <p
        className="text-center"
        style={{
          fontSize: '24px',
          lineHeight: '1.5',
          color: '#6B7280',
          fontFamily: 'Albert Sans'
        }}
      >
        {subtitle}
      </p>
    </div>
  </div>
);

const ContactScreen: React.FC<ContactScreenProps> = ({ setPage }) => {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#0A0F1A'
      }}
    >
      {/* Background image with mesh pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(images/contact-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Overlay gradient */}


      <Header setPage={setPage} onBack={() => setPage(Page.Home)} />

      {/* Title section */}
      <div
        className="relative z-10 text-center mb-12"
        style={{
          marginTop: '130px'
        }}
      >




      </div>

      {/* QR Cards Grid */}
      <div
        className="relative z-10 flex items-center justify-center gap-8"
        style={{
          marginBottom: '100px'
        }}
      >
        <QRCodeCard
          title="Official Website"
          subtitle="Scan for detailed information"
          qrCodeUrl="images/contact-home.png"
        />
        <QRCodeCard
          title="LinkedIn"
          subtitle="Connect with us on LinkedIn"
          qrCodeUrl="images/contact-linkedin.png"
        />
        <QRCodeCard
          title="Business Inquiry"
          subtitle="Scan to send us an email"
          qrCodeUrl="images/contact-email.png"
        />
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center"
        style={{
          height: '100px'
        }}
      >
        
      </div>
    </div>
  );
};

export default ContactScreen;
