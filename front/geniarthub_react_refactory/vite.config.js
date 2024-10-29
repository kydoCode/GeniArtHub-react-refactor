import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/GeniArtHub-react-refactor/front/geniarthub_react_refactory/',
  plugins: [react()],
})
