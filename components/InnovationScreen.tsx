import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Page } from '../types';
import Header from './Header';
import { ArrowRightIcon } from './icons';

interface InnovationScreenProps {
  setPage: (page: Page) => void;
}

type CardLayoutType = 1 | 2;

interface ProductCardData {
  title: string;
  layout: CardLayoutType;
  description?: string;
  detailPage?: Page;
  startNewRow?: boolean;
  imageSrc?: string;
}

interface ProductCategory {
  id: string;
  title: string;
  description: string;
  cards: ProductCardData[];
}

const CARD_DIMENSIONS: Record<CardLayoutType, { width: number; height: number }> = {
  1: { width: 350, height: 350 },
  2: { width: 710, height: 350 }
};

const ROW_MAX_WIDTH = 1434;
const CARD_GAP = 10;

const PRODUCT_DETAIL_PAGE_MAP: Partial<Record<string, Page>> = {
  '7" AV': Page.SevenInchAvDetail,
  'Taxi PBV AVNT': Page.TaxiPbvAvntDetail,
  'Commercial Truck Cluster': Page.CommercialTruckClusterDetail,
  'Passenger RSE 2.0': Page.PassengerRseDetail,
  'Train VOD': Page.TrainVodDetail,
  'Roof Monitor': Page.CeilingFoldingMonitorDetail,
  '천장형 폴딩타입 모니터 (승합+상용)': Page.CeilingFoldingMonitorDetail,
  'HMI Display': Page.HmiDisplayDetail,
  'Air Purifier': Page.AirPurifierDetail,
  DSM: Page.DsmDetail,
  'Dash Cam': Page.DashcamDetail,
  'EV Home Charger': Page.EvHomeChargerDetail,
  'Portable Charger': Page.PortableChargerDetail,
  'CV1-DRT': Page.Cv1DrtAiAssistantDetail,
  'SEEDs': Page.SeedsDetail,
  'ADS Platform': Page.AdsPlatformDetail,
  'In-Cabin Adventure': Page.InCabinAdventureDetail,
  'SVM': Page.SvmDetail
};

const PRODUCT_IMAGE_MAP: Record<string, string> = {
  '7" AV': 'images/products/7-av.png',
  '8" AV': 'images/products/8-av.png',
  '10.25" AVN': 'images/products/10-25-avn.png',
  '12.3" AVN': 'images/products/12-3-avn.png',
  'Taxi PBV AVNT': 'images/products/taxi-pbv-avnt.png',
  'Logistics PBV AVNT': 'images/products/logistics-pbv-avnt.png',
  'Commercial Truck Cluster': 'images/products/commercial-truck-cluster.png',
  'E-scooter 7" LCD Cluster': 'images/products/e-scooter-7-lcd-cluster.png',
  'E-scooter 7" PMVA Cluster': 'images/products/e-scooter-7-pmva-cluster.png',
  'Passenger RSE 2.0': 'images/products/passenger-rse-2-0.png',
  'Train VOD': 'images/products/train-vod.png',
  'Premium Bus Display': 'images/products/premium-bus-display.png',
  'Roof Monitor': 'images/products/roof-monitor.png',
  '천장형 폴딩타입 모니터 (승합+상용)': 'images/products/ceiling-folding-monitor.png',
  'HMI Display': 'images/products/hmi-display.png',
  'Air Purifier': 'images/products/air-purifier.png',
  'Wireless Charger': 'images/products/wireless-charger.png',
  'Rear View Camera': 'images/products/rear-view-camera.png',
  'SVM': 'images/products/svm.png',
  DSM: 'images/products/dsm.png',
  'Dash Cam': 'images/products/dash-cam.png',
  'EV Home Charger': 'images/products/ev-home-charger.png',
  'Portable Charger': 'images/products/portable-charger.png',
  'CV1-DRT': 'images/products/cv1-drt-ai-assistant.png',
  'Smart Police Vehicle': 'images/products/smart-police-vehicle.png',
  'SEEDs': 'images/products/seeds.png',
  'ADS Platform': 'images/products/ads-platform.png',
  'Vision AI PBV': 'images/products/vision-ai-pbv.png',
  'In-Cabin Adventure': 'images/products/xrbox.png'
};

const PLACEHOLDER_IMAGE = 'images/products/placeholder.png';

const getDetailPage = (title: string) => PRODUCT_DETAIL_PAGE_MAP[title];
const getProductImage = (title: string) => PRODUCT_IMAGE_MAP[title] ?? PLACEHOLDER_IMAGE;

const makeCard = (
  title: string,
  layout: CardLayoutType,
  overrides: Partial<ProductCardData> = {}
): ProductCardData => ({
  title,
  layout,
  detailPage: getDetailPage(title),
  imageSrc: getProductImage(title),
  ...overrides
});

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'center-display',
    title: 'Center Display',
    description:
      'We provide localization and map & app customization, supporting wireless connectivity including Android Auto and CarPlay.',
    cards: [
      makeCard('7" AV', 1),
      makeCard('8" AV', 1),
      makeCard('10.25" AVN', 1),
      makeCard('12.3" AVN', 1),
      makeCard('Taxi PBV AVNT', 2),
      makeCard('Logistics PBV AVNT', 2)
    ]
  },
  {
    id: 'digital-cluster',
    title: 'Digital Cluster',
    description:
      'Purpose-built clusters for commercial trucks and light mobility, complete with localized UX and custom applications.',
    cards: [
      makeCard('Commercial Truck Cluster', 2),
      makeCard('E-scooter 7" LCD Cluster', 1),
      makeCard('E-scooter 7" PMVA Cluster', 1)
    ]
  },
  {
    id: 'rear-seat-entertainment',
    title: 'Rear Seat Entertainment',
    description:
      'Passenger displays optimized for premium shuttles and rail, offering curated content, localization, and global navigation support.',
    cards: [
      makeCard('Passenger RSE 2.0', 1),
      makeCard('Train VOD', 1),
      makeCard('Premium Bus Display', 1),
      makeCard('Roof Monitor', 1)
    ]
  },
  {
    id: 'comfort-solution',
    title: 'Comfort Solution',
    description:
      'In-cabin comfort experiences that blend localized UX, connected services, and seamlessly integrated hardware add-ons.',
    cards: [
      makeCard('HMI Display', 2),
      makeCard('Air Purifier', 1),
      makeCard('Wireless Charger', 1)
    ]
  },
  {
    id: 'vision-solution',
    title: 'Vision Solution',
    description:
      'Comprehensive camera and monitoring products delivering enhanced visibility, safety, and data for any vehicle platform.',
    cards: [
      makeCard('Rear View Camera', 1),
      makeCard('SVM', 1),
      makeCard('DSM', 1),
      makeCard('Dash Cam', 1)
    ]
  },
  {
    id: 'ev-solution',
    title: 'EV Solution',
    description:
      'Energy infrastructure that covers home and portable charging, backed by localized services and network compatibility.',
    cards: [
      makeCard('EV Home Charger', 2),
      makeCard('Portable Charger', 2)
    ]
  },
  {
    id: 'pbv-solution',
    title: 'PBV Solution',
    description: 'Specialized PBV conversions with AI assistants and police-ready solutions built on our mobility platform.',
    cards: [
      makeCard('CV1-DRT', 2),
      makeCard('Smart Police Vehicle', 2)
    ]
  },
  {
    id: 'future-mobility',
    title: 'Future Mobility Solution',
    description: 'Concept platforms exploring SEEDs, vision AI PBVs, immersive cabins, and ADS-ready architectures.',
    cards: [
      makeCard('SEEDs', 1),
      makeCard('ADS Platform', 1),
      makeCard('Vision AI PBV', 1),
      makeCard('In-Cabin Adventure', 1)
    ]
  }
];

interface ProductCardProps {
  card: ProductCardData;
  onNavigate: (page: Page) => void;
}

const buildCardRows = (cards: ProductCardData[]): ProductCardData[][] => {
  const rows: ProductCardData[][] = [];
  let currentRow: ProductCardData[] = [];
  let currentWidth = 0;

  cards.forEach(card => {
    if (card.startNewRow && currentRow.length > 0) {
      rows.push(currentRow);
      currentRow = [];
      currentWidth = 0;
    }

    const cardWidth = CARD_DIMENSIONS[card.layout].width;
    const widthWithGap = currentRow.length === 0 ? cardWidth : cardWidth + CARD_GAP;
    if (currentWidth + widthWithGap > ROW_MAX_WIDTH && currentRow.length > 0) {
      rows.push(currentRow);
      currentRow = [card];
      currentWidth = cardWidth;
    } else {
      currentRow.push(card);
      currentWidth += widthWithGap;
    }
  });

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
};

const ProductCard: React.FC<ProductCardProps> = ({ card, onNavigate }) => {
  const { width, height } = CARD_DIMENSIONS[card.layout];
  const imageSrc = card.imageSrc ?? PLACEHOLDER_IMAGE;

  return (
    <button
      type="button"
      onClick={() => {
        if (card.detailPage) {
          onNavigate(card.detailPage);
        }
      }}
      className="flex flex-col justify-between p-6 relative overflow-hidden text-left"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: '1.5rem',
        background: 'rgba(255, 255, 255, 0.35)',
        backdropFilter: 'blur(15px)',
        border: 'none',
        cursor: card.detailPage ? 'pointer' : 'default'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '1.5rem',
          pointerEvents: 'none',
          border: '2px solid rgba(255,255,255,1)',
          WebkitMaskImage:
            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 45%, rgba(0,0,0,0) 100%)',
          maskImage:
            'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 45%, rgba(0,0,0,0) 100%)',
          background: 'transparent',
          zIndex: 0
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            display: 'block',
            marginBottom: '16px'
          }}
        >
          <span
            style={{
              color: '#09294A',
              textAlign: 'center',
              fontFamily: '"Albert Sans"',
              fontSize: '1.375rem',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '150%',
              letterSpacing: '-0.01375rem',
              display: 'block'
            }}
          >
            {card.title}
          </span>
          {card.description && (
            <p
              style={{
                marginTop: '10px',
                fontSize: '18px',
                fontWeight: 300,
                fontFamily: 'Outfit',
                color: '#3E4E63',
                lineHeight: '26px'
              }}
            >
              {card.description}
            </p>
          )}
        </div>
        <div
          style={{
            width: '100%',
            height: '220px',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.1)',
            marginTop: '10px',
            marginBottom: '20px'
          }}
        >
          <img
            src={imageSrc}
            alt={`${card.title} visual`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              backgroundColor: 'transparent'
            }}
            loading="lazy"
          />
        </div>
        <div style={{ flexGrow: 1 }} />
      </div>
      {card.detailPage && (
        <div
          className="absolute flex items-center justify-center"
          style={{
            zIndex: 1,
            bottom: '30px',
            right: '30px'
          }}
        >
          <ArrowRightIcon />
        </div>
      )}
    </button>
  );
};

const SCROLLBAR_HEIGHT = 240; // 15rem
const SCROLLBAR_WIDTH = 20; // 1.25rem
const CONTENT_TOP_OFFSET = 220;
const CONTENT_BOTTOM_OFFSET = 30;
const SCROLLBAR_RIGHT_OFFSET = 22;

const InnovationScreen: React.FC<InnovationScreenProps> = ({ setPage }) => {
  const [scrollThumbRatio, setScrollThumbRatio] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isDraggingThumb, setIsDraggingThumb] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dragInfoRef = useRef<{ startY: number; startScrollTop: number; pointerId: number } | null>(
    null
  );
  const scrollThumbRef = useRef<HTMLDivElement | null>(null);

  const updateScrollMetrics = useCallback((target: HTMLDivElement) => {
    const maxScrollTop = target.scrollHeight - target.clientHeight;
    const ratio = maxScrollTop > 0 ? target.scrollTop / maxScrollTop : 0;
    setScrollThumbRatio(ratio);
    setIsScrollable(maxScrollTop > 0);
  }, []);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      updateScrollMetrics(target);
      // Save scroll position
      sessionStorage.setItem('innovationScrollPosition', target.scrollTop.toString());
    },
    [updateScrollMetrics]
  );

  // Restore scroll position on mount
  useEffect(() => {
    const target = scrollContainerRef.current;
    if (!target) return;

    const savedScrollPosition = sessionStorage.getItem('innovationScrollPosition');
    if (savedScrollPosition) {
      target.scrollTop = parseFloat(savedScrollPosition);
    }

    updateScrollMetrics(target);

    const handleResize = () => {
      if (scrollContainerRef.current) {
        updateScrollMetrics(scrollContainerRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateScrollMetrics]);

  useEffect(() => {
    if (!isDraggingThumb) return;

    const handlePointerMove = (event: PointerEvent) => {
      const dragInfo = dragInfoRef.current;
      const target = scrollContainerRef.current;
      if (!dragInfo || !target || event.pointerId !== dragInfo.pointerId) return;

      const maxScrollTop = target.scrollHeight - target.clientHeight;
      const maxThumbTravel = Math.max(target.clientHeight - SCROLLBAR_HEIGHT, 0);
      if (maxScrollTop <= 0 || maxThumbTravel <= 0) return;

      const deltaY = event.clientY - dragInfo.startY;
      const ratioDelta = deltaY / maxThumbTravel;
      const nextScrollTop = Math.min(
        Math.max(dragInfo.startScrollTop + ratioDelta * maxScrollTop, 0),
        maxScrollTop
      );
      target.scrollTop = nextScrollTop;
      updateScrollMetrics(target);
    };

    const handlePointerUp = (event: PointerEvent) => {
      const dragInfo = dragInfoRef.current;
      if (dragInfo && event.pointerId === dragInfo.pointerId) {
        scrollThumbRef.current?.releasePointerCapture(event.pointerId);
      }
      dragInfoRef.current = null;
      setIsDraggingThumb(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDraggingThumb, updateScrollMetrics]);

  const handleScrollThumbPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!scrollContainerRef.current || !isScrollable) return;
      event.preventDefault();
      event.stopPropagation();
      const thumb = event.currentTarget;
      scrollThumbRef.current = thumb;
      thumb.setPointerCapture(event.pointerId);
      dragInfoRef.current = {
        startY: event.clientY,
        startScrollTop: scrollContainerRef.current.scrollTop,
        pointerId: event.pointerId
      };
      setIsDraggingThumb(true);
    },
    [isScrollable]
  );

  const scrollContainerHeight = scrollContainerRef.current?.clientHeight ?? 0;
  const maxThumbTravel = Math.max(scrollContainerHeight - SCROLLBAR_HEIGHT, 0);
  const scrollThumbOffset = scrollThumbRatio * maxThumbTravel;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        backgroundImage: 'url(images/bg-detail.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header setPage={setPage} onBack={() => setPage(Page.Home)} />

      <div
        className="absolute flex items-center"
        style={{
          top: '111px',
          left: '50%',
          transform: 'translateX(-50%)'
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
            Product Portfolio
          </h1>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="absolute innovation-scroll"
        onScroll={handleScroll}
        style={{
          top: `${CONTENT_TOP_OFFSET}px`,
          bottom: `${CONTENT_BOTTOM_OFFSET}px`,
          left: 0,
          right: 0,
          overflowY: 'auto',
          padding: '0 60px 160px'
        }}
      >
        <div className="flex flex-col" style={{ gap: '48px' }}>
          {PRODUCT_CATEGORIES.map((category, categoryIndex) => (
            <div key={category.id} style={{ maxWidth: '1800px', margin: '0 auto' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '20.5rem minmax(0, 1fr)',
                  columnGap: '38px',
                  alignItems: 'start'
                }}
              >
                <div
                  style={{
                    width: '20.5rem',
                    padding: 0
                  }}
                >
                  <h2
                    style={{
                      color: '#09294A',
                      fontFamily: '"Albert Sans"',
                      fontSize: '2rem',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      lineHeight: '150%',
                      letterSpacing: '-0.02rem',
                      marginBottom: '16px'
                    }}
                  >
                    {category.title}
                  </h2>
                  <p
                    style={{
                      color: '#09294A',
                      fontFamily: 'Outfit',
                      fontSize: '1.3125rem',
                      fontStyle: 'normal',
                      fontWeight: 300,
                      lineHeight: '145%',
                      letterSpacing: '-0.01313rem'
                    }}
                  >
                    {category.description}
                  </p>
                </div>

                <div className="flex flex-col gap-8">
                  {buildCardRows(category.cards).map((row, rowIndex) => (
                    <div
                      key={`${category.id}-row-${rowIndex}`}
                      className="flex"
                      style={{
                        gap: '10px',
                        width: '100%',
                        maxWidth: '1434px',
                        flexWrap: 'nowrap'
                      }}
                    >
                      {row.map((card, cardIndex) => (
                        <ProductCard
                          key={`${category.id}-card-${rowIndex}-${cardIndex}`}
                          card={card}
                          onNavigate={setPage}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isScrollable && (
        <div
          ref={scrollThumbRef}
          onPointerDown={handleScrollThumbPointerDown}
          style={{
            position: 'absolute',
            top: `${CONTENT_TOP_OFFSET + scrollThumbOffset}px`,
            right: `${SCROLLBAR_RIGHT_OFFSET}px`,
            width: `${SCROLLBAR_WIDTH}px`,
            height: `${SCROLLBAR_HEIGHT}px`,
            borderRadius: '1.5rem',
            background: isDraggingThumb
              ? 'rgba(43, 21, 115, 0.55)'
              : 'rgba(43, 21, 115, 0.30)',
            backdropFilter: 'blur(2px)',
            pointerEvents: 'auto',
            transform: isDraggingThumb ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 120ms ease, background 120ms ease',
            cursor: isDraggingThumb ? 'grabbing' : 'grab'
          }}
        />
      )}

      <div className="absolute bottom-0 left-0 right-0" style={{ height: '90px' }} />
    </div>
  );
};

export default InnovationScreen;
