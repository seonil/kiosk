import { Variants } from 'framer-motion';
import { Page } from '@/types';

/**
 * 1-depth menu pages (pages directly accessible from home)
 */
const FIRST_DEPTH_PAGES = new Set<Page>([
  Page.Home,
  Page.GroupOverview,
  Page.TailoredInCabin,
  Page.Innovation,
  Page.Contact,
]);

/**
 * Check if transition should use aurora effect
 * Aurora effect only applies to Home <-> 1-depth menu transitions
 */
export const shouldUseAuroraEffect = (fromPage: Page | null, toPage: Page): boolean => {
  if (!fromPage) return false;
  return FIRST_DEPTH_PAGES.has(fromPage) && FIRST_DEPTH_PAGES.has(toPage);
};

/**
 * Aurora-like page transition variants for kiosk screens
 * Creates smooth morphing effect with gradient overlays and blur
 * Uses crossfade approach to avoid going dark
 */
export const auroraPageVariants: Variants = {
  initial: {
    opacity: 0,
    filter: 'blur(12px) brightness(1.1) saturate(1.2)',
    scale: 1.02,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px) brightness(1) saturate(1)',
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1], // Smoother easing
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(12px) brightness(1.1) saturate(1.2)',
    scale: 0.98,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Simple fade transition for detail pages
 * Quick and subtle without aurora effects
 */
export const simpleFadeVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Aurora gradient overlay animation
 * Creates moving radial gradient effect during transitions
 */
export const auroraOverlayVariants: Variants = {
  initial: {
    opacity: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
  },
  animate: {
    opacity: [0, 1, 1, 0],
    background: [
      'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
      'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.25) 0%, transparent 60%)',
      'radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)',
      'radial-gradient(circle at 100% 50%, rgba(59, 130, 246, 0) 0%, transparent 40%)',
    ],
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

/**
 * Transition configuration for AnimatePresence
 */
export const pageTransitionConfig = {
  mode: 'sync' as const, // Pages overlap during transition (crossfade)
  initial: false, // Don't animate on initial mount
};
