import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts', 'store.ts'],
  splitting: false,
  dts: true,
  clean: true,
  format: ['cjs', 'esm'],
})
