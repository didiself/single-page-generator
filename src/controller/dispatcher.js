import express from 'express';
import Cache from './cache';
import { createPage } from './generate';

const router = express.Router();
let cache = new Cache();

router.get('/generate', (req, res, next) => {
  createPage((err) => {
    cache.setter({});
    res.send({ code: 1, msg: err ? JSON.stringify(err) : '页面成功生成' });
  });
});

router.get('/getCache', (req, res) => {
  res.send(JSON.stringify(cache.getter()));
});

router.post('/saveCache', (req, res) => {
  cache.setter(req.body);
  res.send('success');
});

module.exports = router;
