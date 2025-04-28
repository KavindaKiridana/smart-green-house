import { defineConfig } from 'vite'

export default defineConfig({
    base: '/smart-green-house/',   // 👈 Keep your base path for GitHub Pages
    build: {
        target: 'esnext'              // 👈 Add target to fix "top-level await" error
    }
})
