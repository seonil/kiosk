import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isAndroid = mode === 'android';
    return {
      // Base path for GitHub Pages deployment (repo name)
      base: isAndroid ? './' : (mode === 'production' ? '/kiosk/' : '/'),
      server: {
        port: 3006,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.FIGMA_TOKEN': JSON.stringify(env.FIGMA_TOKEN)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        target: 'esnext',
        outDir: 'dist',
        assetsDir: 'assets',
        // Optimize for kiosk - single environment
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: true, // Remove console logs in production
          }
        },
        rollupOptions: {
          output: {
            manualChunks: undefined, // Single chunk for faster kiosk load
          }
        }
      }
    };
});
