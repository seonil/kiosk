
import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import Header from './Header';
import { PlayIcon } from './icons';

interface GroupOverviewScreenProps {
  setPage: (page: Page) => void;
}

type SubsidiaryId = 'overview' | 'motrex' | 'motrex-ev' | 'motrex-efm' | 'mtr' | 'junjin';

interface SubsidiaryContent {
  id: SubsidiaryId;
  title: string;
  description: string;
  videoUrl: string;
  buttonImage: string;
}

const subsidiaries: SubsidiaryContent[] = [
  {
    id: 'overview',
    title: 'MOTREX Group',
    description: 'MOTREX leads advanced automotive electronics, with affiliated companies including MOTREX EV(EV Charging), MOTREX efm(Interior Materials), MTR (Special Vehicle Conversions), and JUNJIN (Construction Automation). Together, they represent a unified ecosystem for the future of mobility.',
    videoUrl: 'videos/motrex.mp4',
    buttonImage: 'images/btn-motrex.png'
  },
  {
    id: 'motrex',
    title: 'MOTREX',
    description: 'MOTREX, driven by the expertise of its skilled employees, is leading the automotive parts industry while offering a diverse range of products based on advanced software technology. With a commitment to innovation and challenges, MOTREX aspires to become a global leader in the future mobility market by creating exceptional value for its customers.',
    videoUrl: 'videos/motrex.mp4',
    buttonImage: 'images/btn-motrex.png'
  },
  {
    id: 'motrex-ev',
    title: 'MOTREX EV',
    description: 'MOTREX EV is a leading company in the \'Energy Hub\' industry, based on smart grid networks, energy management, and EV charging solutions.',
    videoUrl: 'videos/motrex-ev.mp4',
    buttonImage: 'images/btn-motrex-ev.png'
  },
  {
    id: 'motrex-efm',
    title: 'MOTREX efm',
    description: 'MOTREX efm leads Korea\'s interior materials market, holding the No.1 share in automotive floor carpets.',
    videoUrl: 'videos/motrex-efm.mp4',
    buttonImage: 'images/btn-motrex-efm.png'
  },
  {
    id: 'mtr',
    title: 'MTR',
    description: 'MTR is the best PBV solution provider, backed by extensive experience and proven expertise in special-featured vehicle development.',
    videoUrl: 'videos/mtr.mp4',
    buttonImage: 'images/btn-mtr.png'
  },
  {
    id: 'junjin',
    title: 'JUNJIN C&R',
    description: 'JUNJIN is the foremost company in Korea for concrete pump trucks, and it is at the forefront of the construction equipment industry.',
    videoUrl: 'videos/junjin.mp4',
    buttonImage: 'images/btn-junjin.png'
  }
];

const GroupOverviewScreen: React.FC<GroupOverviewScreenProps> = ({ setPage }) => {
  const [currentSubsidiary, setCurrentSubsidiary] = useState<SubsidiaryId>('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const content = subsidiaries.find(s => s.id === currentSubsidiary) || subsidiaries[0];

  useEffect(() => {
    setIsVideoLoaded(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSubsidiary]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSubsidiaryClick = (id: SubsidiaryId) => {
    setCurrentSubsidiary(id);
  };

  const buttons = subsidiaries.slice(1); // Exclude overview from buttons

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: '1920px',
        height: '1080px',
        backgroundImage: 'url(images/bg-detail.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Header */}
      <div
        className="absolute"
        style={{
          top: '0',
          left: '0',
          right: '0',
          height: '130px',
        }}
      >
        <Header setPage={setPage} onBack={() => setPage(Page.Home)} />
      </div>

      {/* Title */}
      <div
        className="flex items-center"
        style={{
          position: 'absolute',
          top: '171px',
          left: '120px',
        }}
      >
        <img
          src="images/title-effect.png"
          alt="Title effect"
          style={{
            position: 'absolute',
            left: '50%',
            top: 'calc(50% + 20px)',
            transform: 'translate(-50%, -50%) scale(2)',
            zIndex: 0,
            opacity: 1
          }}
        />
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h1
            style={{
              fontFamily: 'Albert Sans',
              fontSize: '60px',
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '110%',
              letterSpacing: '0.6px',
              background: 'linear-gradient(90deg, #09294A 0.77%, #5725D0 60.9%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              zIndex: 1,
              WebkitBoxReflect: 'below -20px linear-gradient(transparent 50%, rgba(255, 255, 255, 0.4))'
            }}
          >
            {content.title}
          </h1>
        </div>
      </div>

      {/* Description Text */}
      <p
        className="absolute"
        style={{
          top: '372px',
          left: '60px',
          width: '688px',
          fontFamily: 'Albert Sans',
          fontSize: '24px',
          lineHeight: '1.5',
          color: '#09294A',
        }}
      >
        {content.description}
      </p>

      {/* Video Container */}
      <div
        className="absolute cursor-pointer"
        style={{
          top: '141px',
          right: '60px',
          width: '1072px',
          height: '617px',
          overflow: 'hidden',
          borderRadius: '24px',
          backgroundColor: '#000',
        }}
        onClick={handlePlayClick}
      >
        <video
          ref={videoRef}
          src={content.videoUrl}
          poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
          autoPlay
          muted
          playsInline
          preload="auto"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: isVideoLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in',
            background: '#000',
          }}
          onLoadedData={() => setIsVideoLoaded(true)}
          onEnded={() => setIsPlaying(false)}
        />
        {!isPlaying && (
          <>
            <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white opacity-80 hover:opacity-100 hover:scale-110 transition-transform duration-300">
              <PlayIcon className="w-24 h-24" />
            </div>
          </>
        )}
      </div>

      {/* Button Row */}
      <div
        className="absolute flex"
        style={{
          bottom: '50px',
          left: '60px',
          gap: '25px',
        }}
      >
        {buttons.map((sub) => (
          <div
            key={sub.id}
            onClick={() => handleSubsidiaryClick(sub.id)}
            className="cursor-pointer transition-all duration-300 hover:opacity-80"
            style={{
              width: '340px',
              height: '210px',
            }}
          >
            <img
              src={sub.buttonImage}
              alt={sub.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupOverviewScreen;
