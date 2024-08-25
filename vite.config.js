import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: "/3d-personal-website/",
    build: {
        outDir: './github/workflows' // Set the build output directory here
      }
})