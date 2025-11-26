import React from 'react';
import { Page } from '../types';
import { PRODUCT_DETAIL_CONFIGS, DetailSection, ProductDetailConfig } from '../data/productDetailConfig';
import Header from './Header';

interface ProductDetailPageProps {
  setPage: (page: Page) => void;
  detailPage: Page;
}

const renderFeatureTable = (config: ProductDetailConfig['featureTable']) => {
  if (!config) return null;
  return (
    <section>
      <div className="flex items-center" style={{ marginBottom: '16px' }}>
        <span
          style={{
            color: '#000',
            fontFamily: 'Albert Sans',
            fontSize: '25px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal'
          }}
        >
          {config.leftHeader}
        </span>
        <span
          style={{
            color: '#000',
            fontFamily: 'Albert Sans',
            fontSize: '25px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            marginLeft: '200px'
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
              lineHeight: '150%',
              fontFamily: 'Albert Sans'
            }}
          >
            {row.labelLines.map(line => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <ul style={{ fontSize: '20px', color: '#09294A', lineHeight: '150%', fontFamily: 'Albert Sans', flex: row.detailMedia && row.detailMedia.length > 0 ? '1' : 'auto' }}>
              {row.details.map((item, index) => (
                <li key={`${item}-${index}`} style={{ marginBottom: '6px' }} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
            {row.detailMedia && row.detailMedia.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexShrink: 0
                }}
              >
                {row.detailMedia.map(media => (
                  <div
                    key={media.alt}
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={media.src}
                      alt={media.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
            marginBottom: '12px',
            fontFamily: 'Albert Sans'
          }}
        >
          {section.title}
        </h3>
        <p style={{ fontSize: '19px', color: '#09294A', lineHeight: '155%', fontFamily: 'Albert Sans' }}>
          {section.description}
        </p>
        {section.highlight && (
          <p
            style={{
              color: '#D45050',
              fontWeight: 600,
              fontSize: '19px',
              marginTop: '8px',
              fontFamily: 'Albert Sans'
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
            marginBottom: '12px',
            fontFamily: 'Albert Sans'
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
                lineHeight: '150%',
                fontFamily: 'Albert Sans'
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
          marginBottom: '12px',
          fontFamily: 'Albert Sans'
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
                  color: item.caption.includes('NEW') ? '#2B4CCB' : '#09294A',
                  fontFamily: 'Albert Sans'
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
        backgroundImage: 'url(images/bg-detail.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Header setPage={setPage} onBack={() => setPage(Page.Innovation)} />

      <div className="relative flex flex-col h-full" style={{ paddingTop: '140px', paddingLeft: '90px', paddingRight: '90px', paddingBottom: '40px' }}>
        <div className="flex items-center" style={{ marginLeft: '30px', marginTop: '30px', position: 'relative' }}>
          <img
            src="images/title-effect.png"
            alt="Title effect"
            style={{
              position: 'absolute',
              left: '-200px',
              top: 'calc(50% + 20px)',
              transform: 'translateY(-50%) scale(0.6)',
              transformOrigin: 'left center',
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
              {title}
            </h1>
          </div>
        </div>

        {hasDetailContent ? (
          <div className="flex flex-1 items-start gap-16">
            <div
              style={{
                flex: '0 0 1100px',
                borderRadius: '40px',
                padding: '48px',
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
