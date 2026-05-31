import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  clean: true,
  sourcemap: true,
  minify: false,
  target: 'es2020',
  splitting: false,
  treeshake: true
});
