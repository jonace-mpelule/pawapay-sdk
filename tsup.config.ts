import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['./src/index.ts'],
    clean: true,
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: true,
    target: 'es2022',
    outDir: 'dist',
})