import { resolve } from 'path';

export const dev = {
  env: {NODE_ENV: '"development"'},
  port: 8080,
  assetsRoot: resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  outputName: 'dynamic/output.html',
  outputChunk: 'output',
  cssSourceMap: true
};
