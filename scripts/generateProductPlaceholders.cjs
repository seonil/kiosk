'use strict';

const fs = require('fs');
const path = require('path');

const products = [
  { title: '7" AV', slug: '7-av' },
  { title: '8" AV', slug: '8-av' },
  { title: '10.25" AVN', slug: '10-25-avn' },
  { title: '12.3" AVN', slug: '12-3-avn' },
  { title: 'Taxi PBV AVNT', slug: 'taxi-pbv-avnt' },
  { title: 'Logistics PBV AVNT', slug: 'logistics-pbv-avnt' },
  { title: 'Commercial Truck Cluster', slug: 'commercial-truck-cluster' },
  { title: 'E-scooter 7" LCD Cluster', slug: 'e-scooter-7-lcd-cluster' },
  { title: 'E-scooter 7" PMVA Cluster', slug: 'e-scooter-7-pmva-cluster' },
  { title: 'Passenger RSE 2.0', slug: 'passenger-rse-2-0' },
  { title: 'Train VOD', slug: 'train-vod' },
  { title: 'Premium Bus Display', slug: 'premium-bus-display' },
  { title: '천장형 폴딩타입 모니터 (승합+상용)', slug: 'ceiling-folding-monitor' },
  { title: 'Roof Monitor', slug: 'roof-monitor' },
  { title: 'HMI Display', slug: 'hmi-display' },
  { title: 'Air Purifier', slug: 'air-purifier' },
  { title: 'Wireless Charger', slug: 'wireless-charger' },
  { title: 'Rear View Camera', slug: 'rear-view-camera' },
  { title: 'SVM (Surround View Monitor)', slug: 'svm' },
  { title: 'DSM', slug: 'dsm' },
  { title: 'Dash Cam', slug: 'dash-cam' },
  { title: 'EV Home Charger', slug: 'ev-home-charger' },
  { title: 'Portable Charger', slug: 'portable-charger' },
  { title: 'CV1-DRT & AI Assistant', slug: 'cv1-drt-ai-assistant' },
  { title: 'Smart Police Vehicle', slug: 'smart-police-vehicle' },
  { title: 'SEEDs', slug: 'seeds' },
  { title: 'ADS Platform', slug: 'ads-platform' },
  { title: 'Vision AI PBV', slug: 'vision-ai-pbv' },
  { title: 'In-Cabin Adventure', slug: 'in-cabin-adventure' }
];

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'products');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const escapeHtml = text =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const svgTemplate = (label, accentHue = 210) => `
<svg width="640" height="360" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(22, 36, 66, 0.95)" />
      <stop offset="100%" stop-color="rgba(9, 41, 74, 0.7)" />
    </linearGradient>
  </defs>
  <rect width="640" height="360" fill="url(#grad)" rx="32" />
  <rect x="40" y="40" width="560" height="280" rx="24" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
  <circle cx="540" cy="80" r="26" stroke="rgba(255,255,255,0.35)" stroke-width="2" fill="none" />
  <circle cx="540" cy="80" r="18" stroke="rgba(255,255,255,0.45)" stroke-width="2" fill="none" />
  <line x1="520" y1="80" x2="560" y2="80" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round" />
  <g font-family="Albert Sans, 'Pretendard', 'Inter', sans-serif" fill="#FFFFFF" text-anchor="start">
    <text x="70" y="160" font-size="28" font-weight="600" opacity="0.85">Product Placeholder</text>
    <text x="70" y="210" font-size="48" font-weight="700">${escapeHtml(label)}</text>
  </g>
</svg>
`.trim();

products.forEach((product, index) => {
  const hue = 180 + (index * 12) % 180;
  const svg = svgTemplate(product.title, hue);
  const filePath = path.join(OUTPUT_DIR, `${product.slug}.svg`);
  fs.writeFileSync(filePath, svg, 'utf8');
  console.log(`Generated placeholder for ${product.title} -> ${product.slug}.svg`);
});

const placeholderPath = path.join(OUTPUT_DIR, `placeholder.svg`);
if (!fs.existsSync(placeholderPath)) {
  const genericSvg = svgTemplate('Placeholder', 200);
  fs.writeFileSync(placeholderPath, genericSvg, 'utf8');
  console.log(`Generated fallback placeholder.svg`);
}
