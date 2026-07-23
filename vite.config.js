import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        reference: resolve(__dirname, 'index.html'),
        react: resolve(__dirname, 'react.html'),
      },
    },
  },
});
