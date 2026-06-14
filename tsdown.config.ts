import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.ts'],
  failOnWarn: true,
  format: ['cjs', 'esm'],
  nodeProtocol: true,
  platform: 'neutral'
});
