import express from 'express';
import webpack from 'webpack';
import history from 'connect-history-api-fallback';
import compression from 'compression';
import bodyParser from 'body-parser';

import config from './build/webpack.dev.config';
import dispatcher from './src/controller/dispatcher';
import { dev as devConfig } from './config';

const app = express();
const compiler = webpack(config);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  quiet: true,
  hot: true,
  stats: {
    colors: true
  }
});
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

app.use(bodyParser.json());
app.use('/app', dispatcher);
app.use(compression());
app.use(history());
app.use(devMiddleware);
app.use(hotMiddleware);

app.use(express.static('dist'));

app.listen(devConfig.port || 8080, () => {
  console.log(`server started at localhost:${devConfig.port}`);
});
