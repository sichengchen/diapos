import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: {
        diapos: resolve(__dirname, 'src/index.ts'),
        'themes/geneva': resolve(__dirname, 'src/themes/geneva/index.ts'),
        'themes/milan': resolve(__dirname, 'src/themes/milan/index.ts'),
        'themes/vienna': resolve(__dirname, 'src/themes/vienna/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.peerDependencies ?? {}),
        'react/jsx-runtime',
      ],
    },
    cssCodeSplit: false,
  },
})
