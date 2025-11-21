
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
    title: 'MOTREX Group Overview',
    description: 'MOTREX leads advanced automotive electronics, with affiliated companies including MOTREX EV(EV Charging), MOTREX efm(Interior Materials), MTR (Special Vehicle Conversions), and JUNJIN (Construction Automation). Together, they represent a unified ecosystem for the future of mobility.',
    videoUrl: '/videos/motrex.mp4',
    buttonImage: '/images/btn-motrex.png'
  },
  {
    id: 'motrex',
    title: 'MOTREX',
    description: 'Experience EZ-Cockpit, MOTREX\'s next-generation digital cockpit brand that integrates the cluster and center display into one intelligent system - offering a unified visual flow, real-time safety alerts, and an Easy Mode for senior-friendly operation.',
    videoUrl: '/videos/motrex.mp4',
    buttonImage: '/images/btn-motrex.png'
  },
  {
    id: 'motrex-ev',
    title: 'MOTREX EV',
    description: 'MOTREX EV provides comprehensive energy solutions for electric vehicles, including advanced charging infrastructure and battery management systems for the future of sustainable mobility.',
    videoUrl: '/videos/motrex-ev.mp4',
    buttonImage: '/images/btn-motrex-ev.png'
  },
  {
    id: 'motrex-efm',
    title: 'MOTREX efm',
    description: 'MOTREX efm specializes in high-quality interior materials for automotive applications, combining aesthetic design with functional excellence to create premium in-cabin experiences.',
    videoUrl: '/videos/motrex-efm.mp4',
    buttonImage: '/images/btn-motrex-efm.png'
  },
  {
    id: 'mtr',
    title: 'MTR',
    description: 'MTR leads in special vehicle conversion and in-cabin integration, transforming standard vehicles into specialized solutions for various industries and applications.',
    videoUrl: '/videos/mtr.mp4',
    buttonImage: '/images/btn-mtr.png'
  },
  {
    id: 'junjin',
    title: 'JUNJIN Robotics',
    description: 'JUNJIN Robotics pioneers construction automation and robotic solutions, revolutionizing the construction industry with advanced autonomous systems and smart machinery.',
    videoUrl: '/videos/junjin.mp4',
    buttonImage: '/images/btn-junjin.png'
  }
];

const GroupOverviewScreen: React.FC<GroupOverviewScreenProps> = ({ setPage }) => {
  const [currentSubsidiary, setCurrentSubsidiary] = useState<SubsidiaryId>('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const content = subsidiaries.find(s => s.id === currentSubsidiary) || subsidiaries[0];

  useEffect(() => {
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
        backgroundImage: 'url(/images/bg-detail.png)',
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
        className="absolute"
        style={{
          top: '141px',
          left: '0',
          width: '748px',
          height: '162px',
        }}
      >
        <img
          src="/images/group-title.png"
          alt="Why Motrex"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
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
        }}
        onClick={handlePlayClick}
      >
        <video
          ref={videoRef}
          src={content.videoUrl}
          style={{
            width: '1072px',
            height: '617px',
            objectFit: 'cover',
            borderRadius: '24px',
          }}
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
