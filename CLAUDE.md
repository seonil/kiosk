# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based interactive kiosk application for CES 2026, showcasing MOTREX's intelligent in-cabin solutions and automotive innovations. Built with React 19, TypeScript, and Vite, styled with Tailwind CSS (via CDN).

**Key purpose**: Interactive touchscreen kiosk for trade show visitors to explore MOTREX products, including EZ-Cockpit, NIDUS, and affiliated companies (MEV, EFM, MTR, Junjin Robotics).

## Kiosk Display Specifications

**CRITICAL**: This application is designed for a **fixed 1920x1080 kiosk display only**.

- **Resolution**: 1920x1080 pixels (Full HD)
- **Viewport**: Fixed, non-responsive
- **No mobile/tablet support**: All layouts are optimized for 1920x1080 only
- **User interactions**: Touch-optimized with disabled text selection, context menus, and zoom
- **Display mode**: Fullscreen kiosk mode

### Design Constraints

- DO NOT implement responsive design or media queries
- DO NOT use viewport-relative units (vw, vh) for critical layouts
- All components should be designed for exactly 1920x1080 pixels
- Use fixed pixel values for precise positioning when needed
- Test all layouts at exactly 1920x1080 resolution

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://0.0.0.0:3006)
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## Environment Setup

Set `GEMINI_API_KEY` in `.env.local` (required for Gemini API access):
```
GEMINI_API_KEY=your_api_key_here
```

The Vite config exposes this as both `process.env.API_KEY` and `process.env.GEMINI_API_KEY`.

## Architecture

### Navigation System

State-based navigation using a single `page` state variable in [App.tsx](App.tsx):
- Pages are defined in the `Page` enum in [types.ts](types.ts)
- Navigation: `setPage(Page.SomeScreen)` - passed down to all screen components
- No routing library - simple state switching via switch statement

### Screen Components Pattern

All screen components in `components/` folder follow this pattern:
```typescript
interface SomeScreenProps {
  setPage: (page: Page) => void;
}
```

**Screen types:**
1. **Full-screen landing**: [HomeScreen.tsx](components/HomeScreen.tsx) - home page with background image and navigation cards
2. **Overview screens**: [GroupOverviewScreen.tsx](components/GroupOverviewScreen.tsx) - content + video + sub-navigation buttons
3. **Detail screens**: [ProductDetailScreen.tsx](components/ProductDetailScreen.tsx) - reusable component for product videos and descriptions
4. **Specialized screens**: [TailoredInCabinScreen.tsx](components/TailoredInCabinScreen.tsx), [SvmScreen.tsx](components/SvmScreen.tsx), [InnovationScreen.tsx](components/InnovationScreen.tsx), [ContactScreen.tsx](components/ContactScreen.tsx)

### Shared Components

- **Header**: [Header.tsx](components/Header.tsx) - Back button + Home button overlay, used in all non-home screens
- **Icons**: [icons.tsx](components/icons.tsx) - SVG icon components (ArrowLeft, ArrowRight, Home, Play)

### Styling Approach

- **Typography**: **Albert Sans** (Google Fonts) - ALL text uses this font family
- **Tailwind CSS via CDN** (loaded in [index.html](index.html)) - NO build-time Tailwind configuration
- **Global CSS**: [index.css](index.css) - Kiosk-specific styles (fixed dimensions, disabled user interactions, font family)
- Design system colors:
  - Background: `#0A0F1A` (dark navy) or `#F0F2F5` (light gray for detail screens)
  - Glass morphism: `bg-white/5`, `backdrop-blur-md`, `border-white/20`
  - Text: white on dark, `text-gray-900`/`text-gray-600` on light
- Primarily inline Tailwind classes with global CSS for kiosk-specific overrides

### Path Aliasing

TypeScript and Vite configured with `@/` alias pointing to project root:
```typescript
import { Page } from '@/types';
```

## Important Patterns

1. **Video placeholders**: Uses `https://picsum.photos/seed/{id}/1280/720` for placeholder videos/images
2. **Incomplete navigation**: Some buttons use `alert("Navigate to...")` - placeholders for future implementation
3. **ProductDetailScreen reusability**: Used for multiple products (EZ-Cockpit, NIDUS, MOTREX) with different props
4. **Import maps in HTML**: React dependencies loaded via AI Studio CDN import maps in [index.html](index.html:10-18)

## Key Files

- [App.tsx](App.tsx) - Main app component with page switching logic
- [types.ts](types.ts) - Page enum definition
- [vite.config.ts](vite.config.ts) - Vite configuration with dev server (port 3006), build settings, env variables, and path aliases
- [index.html](index.html) - Entry point with fixed 1920x1080 viewport, Tailwind CDN, and import maps
- [index.css](index.css) - Global kiosk styles (fixed dimensions, disabled interactions)
