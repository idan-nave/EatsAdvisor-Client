import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import basicSSL from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), basicSSL()],
  server: {
    port: 3001, // Change to port 3001
    https: true
  },
})
