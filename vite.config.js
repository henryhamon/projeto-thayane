import { defineConfig } from 'vite'

// Se o nome do seu repositório for "projeto-thayane", a base deve ser essa:
export default defineConfig({
    base: '/projeto-thayane/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets'
    }
})