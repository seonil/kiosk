import React from 'react';
import { Page } from '../types';
import { PRODUCT_DETAIL_CONFIGS, DetailSection, ProductDetailConfig } from '../data/productDetailConfig';
import { ArrowLeftIcon, HomeIcon } from './icons';

interface ProductDetailPageProps {
  setPage: (page: Page) => void;
  detailPage: Page;
}

const renderFeatureTable = (config: ProductDetailConfig['featureTable']) => {
  if (!config) return null;
  return (
    <section>
      <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
        <span
          style={{
            fontSize: '24px',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#2B1573'
          }}
        >
          {config.leftHeader}
        </span>
        <span
          style={{
            fontSize: '18px',
            color: '#2B1573',
            opacity: 0.8,
            fontWeight: 500,
            letterSpacing: '0.1em'
          }}
        >
          {config.rightHeader}
        </span>
      </div>
      {config.rows.map(row => (
        <div
          key={row.labelLines.join('-')}
          style={{
            display: 'grid',
            gridTemplateColumns: '260px minmax(0, 1fr)',
            gap: '24px',
            borderTop: '1px solid rgba(9, 41, 74, 0.2)',
            paddingTop: '24px',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 500,
              color: '#09294A',
              lineHeight: '150%'
            }}
          >
            {row.labelLines.map(line => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <div>
            <ul style={{ fontSize: '20px', color: '#09294A', lineHeight: '150%' }}>
              {row.details.map(item => (
                <li key={item} style={{ marginBottom: '6px' }}>
                  {item}
                </li>
              ))}
            </ul>
            {row.detailMedia && row.detailMedia.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
                  gap: '12px',
                  marginTop: '16px'
                }}
              >
                {row.detailMedia.map(media => (
                  <div
                    key={media.alt}
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      borderRadius: '18px',
                      background: 'rgba(255,255,255,0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      border: '1px solid rgba(9, 41, 74, 0.1)'
                    }}
                  >
                    <img
                      src={media.src}
                      alt={media.alt}
                      style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

const renderSection = (section: DetailSection) => {
  if (section.type === 'text') {
    return (
      <section
        key={section.title}
        style={{ padding: '24px 0', borderTop: '1px solid rgba(9, 41, 74, 0.2)' }}
      >
        <h3
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#09294A',
            marginBottom: '12px'
          }}
        >
          {section.title}
        </h3>
        <p style={{ fontSize: '19px', color: '#09294A', lineHeight: '155%' }}>
          {section.description}
        </p>
        {section.highlight && (
          <p
            style={{
              color: '#D45050',
              fontWeight: 600,
              fontSize: '19px',
              marginTop: '8px'
            }}
          >
            • {section.highlight}
          </p>
        )}
      </section>
    );
  }

  if (section.type === 'columns') {
    return (
      <section
        key={section.title}
        style={{ paddingTop: '32px', borderTop: '1px solid rgba(9, 41, 74, 0.2)' }}
      >
        <h3
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#09294A',
            marginBottom: '12px'
          }}
        >
          {section.title}
        </h3>
        <div style={{ display: 'flex', gap: '40px' }}>
          {section.columns.map((column, columnIndex) => (
            <ul
              key={`${section.title}-col-${columnIndex}`}
              style={{
                listStyle: 'disc',
                paddingLeft: '18px',
                fontSize: '19px',
                color: '#09294A',
                lineHeight: '150%'
              }}
            >
              {column.map(item => (
                <li key={item} style={{ marginBottom: '6px' }}>
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      key={section.title}
      style={{ paddingTop: '32px', borderTop: '1px solid rgba(9, 41, 74, 0.2)' }}
    >
      <h3
        style={{
          fontSize: '22px',
          fontWeight: 600,
          color: '#09294A',
          marginBottom: '12px'
        }}
      >
        {section.title}
      </h3>
      <div style={{ display: 'flex', gap: '24px' }}>
        {section.items.map(item => (
          <div
            key={item.alt}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div
              style={{
                width: '160px',
                height: '200px',
                borderRadius: '24px',
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(9, 41, 74, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                style={{ width: '80%', height: '80%', objectFit: 'contain' }}
              />
            </div>
            {item.caption && (
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: item.caption.includes('NEW') ? '#2B4CCB' : '#09294A'
                }}
              >
                {item.caption}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ setPage, detailPage }) => {
  const config = PRODUCT_DETAIL_CONFIGS[detailPage];

  if (!config) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0A0F1A] text-white">
        Detail configuration missing.
      </div>
    );
  }

  const { title, heroImage, featureTable, sections } = config;
  const heroImageStyle = {
    width: 360,
    height: 620,
    objectFit: 'contain' as const,
    ...(heroImage.image ?? {})
  };

  const hasDetailContent =
    Boolean(featureTable) || Boolean(sections && sections.length > 0);

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/bg-detail.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >

      <div className="relative flex flex-col h-full" style={{ padding: '60px 90px 40px' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPage(Page.Innovation)}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.35)',
                border: '1px solid rgba(255,255,255,0.4)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ArrowLeftIcon className="w-7 h-7 text-[#2B1573]" />
            </button>
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 700,
                fontFamily: 'Albert Sans',
                color: '#09294A',
                textShadow: '0 12px 25px rgba(9, 41, 74, 0.25)'
              }}
            >
              {title}
            </h1>
          </div>
          <button
            onClick={() => setPage(Page.Home)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <HomeIcon className="w-7 h-7 text-[#2B1573]" />
          </button>
        </div>

        {hasDetailContent ? (
          <div className="flex flex-1 items-start gap-16 mt-16">
            <div
              style={{
                flex: '0 0 920px',
                background: 'rgba(255,255,255,0.75)',
                borderRadius: '40px',
                padding: '48px',
                boxShadow: '0 30px 50px rgba(6, 17, 37, 0.15)',
                border: '1px solid rgba(255,255,255,0.6)',
                overflowY: 'auto'
              }}
            >
              {renderFeatureTable(featureTable)}
              {sections?.map(renderSection)}
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={heroImage.src} alt={heroImage.alt} style={{ ...heroImageStyle, maxWidth: '80%', maxHeight: '85%' }} />
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center mt-16">
            <img src={heroImage.src} alt={heroImage.alt} style={{ ...heroImageStyle, maxWidth: '80%', maxHeight: '85%' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
