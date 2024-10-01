import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src/', import.meta.url)),
      },
      {
        find: 'components',
        replacement: fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),
      },
      {
        find: 'hooks',
        replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)),
      },
    ],
  },
  plugins: [react(), svgr()],
  base: '/inmyroom/',
})
