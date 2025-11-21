import { CSSProperties } from 'react';
import detailData from './productDetails.json';
import { Page } from '../types';

export interface DetailMedia {
  src: string;
  alt: string;
  caption?: string;
}

export interface FeatureTableRow {
  labelLines: string[];
  details: string[];
  detailMedia?: DetailMedia[];
}

export type DetailSection =
  | {
      type: 'text';
      title: string;
      description: string;
      highlight?: string;
    }
  | {
      type: 'columns';
      title: string;
      columns: string[][];
    }
  | {
      type: 'comparison';
      title: string;
      items: DetailMedia[];
    };

export interface ProductDetailConfig {
  page: Page;
  title: string;
  background: string;
  overlay?: string;
  heroImage: {
    src: string;
    alt: string;
    image?: CSSProperties;
  };
  featureTable?: {
    leftHeader: string;
    rightHeader: string;
    rows: FeatureTableRow[];
  };
  sections?: DetailSection[];
}

interface RawProductDetail {
  page: string;
  title: string;
  background: string;
  overlay?: string;
  heroImage: {
    src: string;
    alt: string;
    image?: CSSProperties;
  };
  featureTable?: {
    leftHeader: string;
    rightHeader: string;
    rows: FeatureTableRow[];
  };
  sections?: DetailSection[];
}

const mapEntry = (raw: RawProductDetail): ProductDetailConfig | null => {
  const pageKey = raw.page as keyof typeof Page;
  const page = Page[pageKey];
  if (!page) {
    console.warn(`Unknown page "${raw.page}" in product detail data.`);
    return null;
  }

  const defaultImageStyles: CSSProperties = {
    width: 420,
    height: 680,
    objectFit: 'contain'
  };

  return {
    page,
    title: raw.title,
    background: raw.background,
    overlay: raw.overlay,
    heroImage: {
      src: raw.heroImage.src,
      alt: raw.heroImage.alt,
      image: {
        ...defaultImageStyles,
        ...(raw.heroImage.image ?? {})
      }
    },
    featureTable: raw.featureTable,
    sections: raw.sections
  };
};

const PRODUCT_DETAIL_CONFIGS: Partial<Record<Page, ProductDetailConfig>> = {};

detailData.products.forEach(raw => {
  const entry = mapEntry(raw as RawProductDetail);
  if (entry) {
    PRODUCT_DETAIL_CONFIGS[entry.page] = entry;
  }
});

export { PRODUCT_DETAIL_CONFIGS };
