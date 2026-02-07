import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Base path for GitHub Pages deployment only
  base: mode === 'production' ? '/sports-dashboard/' : '/',
}))
