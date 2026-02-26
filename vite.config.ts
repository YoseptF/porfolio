import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  plugins: [react(), glsl()],
  server: {
    port: 3000,
    open: true,
  },
})
