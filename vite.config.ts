import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    https: {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      external: [
        '@pages/index',
        'api/api',
      ],
    },
  },
});
