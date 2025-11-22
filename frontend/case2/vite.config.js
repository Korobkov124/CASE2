import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()], 
  server: {
    https: true,
    host: 'localhost',
    port: 3000
  }
})
