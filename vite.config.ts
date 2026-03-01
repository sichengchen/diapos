/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './packages/diapos/src'),
      'diapos/themes/geneva': resolve(__dirname, './packages/diapos/src/themes/geneva/index.ts'),
      'diapos/themes/milan': resolve(__dirname, './packages/diapos/src/themes/milan/index.ts'),
      'diapos/themes/vienna': resolve(__dirname, './packages/diapos/src/themes/vienna/index.ts'),
      'diapos': resolve(__dirname, './packages/diapos/src/index.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./packages/diapos/src/test-setup.ts'],
  },
})
