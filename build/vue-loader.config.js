import { getPathFiles } from './util';
import { resolve } from 'path';

module.exports = {
  // postcss: {
  //   config: {
  //     path: resolve(__dirname, '../config'),
  //     ctx: {
  //       autoprefixer: { browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'] },
  //       'postcss-pxtorem': {
  //         rootValue: 100,
  //         propWhiteList: []
  //       }
  //     }
  //   }
  // },
  loaders: {
    // css: 'vue-style-loader!css-loader',
    scss: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: resolve(__dirname, '../config'),
            ctx: {
              autoprefixer: { browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'] },
              'postcss-pxtorem': {
                rootValue: 100,
                propWhiteList: []
              }
            }
          }
        }
      },
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: getPathFiles(resolve(__dirname, '../src/assets/scss/'), 'scss')
        }
      }
    ]
  }
};
