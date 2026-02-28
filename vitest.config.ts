import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'

const shaderStub: Plugin = {
  name: 'shader-stub',
  transform(_code, id) {
    if (/\.(vert|frag|glsl)$/.test(id)) {
      return { code: 'export default ""' }
    }
  },
}

export default defineConfig({
  plugins: [react(), shaderStub],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
