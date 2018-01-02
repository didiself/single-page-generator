import { join } from 'path';
import { dev as devConfig } from '../config';
import vueLoaderConfig from './vue-loader.config';

const resolve = (dir) => join(__dirname, '..', dir);
const assetsPath = (_path) => join(devConfig.assetsSubDirectory, _path);

module.exports = {
  entry: {
    // 'babel-polyfill',
    app: ['./src/main.js'],
    output: ['babel-polyfill','./src/output/main.js']
  },
  output: {
    path: devConfig.assetsRoot,
    filename: '[name].js',
    publicPath: devConfig.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: resolve('node_modules'),
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.css$/,
        include: resolve('node_modules'),
        use: ['style-loader', 'css-loader']
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: assetsPath('img/[name].[hash:7].[ext]')
      //   }
      // },
      // {
      //   test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: assetsPath('media/[name].[hash:7].[ext]')
      //   }
      // },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};
