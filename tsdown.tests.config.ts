import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/index.ts'],
  failOnWarn: true,
  format: 'es',
  fixedExtension: false,
  nodeProtocol: true,
  platform: 'node',
  unbundle: true
});
