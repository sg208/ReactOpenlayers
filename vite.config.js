import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const page = (path) => fileURLToPath(new URL(`./src/${path}`, import.meta.url))

export default defineConfig({
    root: 'src',
    base: '/',
    plugins: [react()],
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: page('index.html'),
                notFound: page('404.html'),
                accessibility: page('accessibility/index.html'),
                privacy: page('privacy/index.html'),
                terms: page('terms/index.html'),
            },
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules/ol/')) return 'ol'
                    if (id.includes('node_modules/react')) return 'react'
                    return undefined
                },
            },
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./setupTests.js'],
    },
})
