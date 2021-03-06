const express = require('express');
const router = express.Router();

const SourceService = require('../services/source-service');
const ArticleService = require('../services/article-service');

const SourceModel = require('../models/source-model');

router.get('/', async (req, res, next) => {
  res.send(await SourceService.findAll());
});

router.get('/all', async (req, res, next) => {
  const sources = await SourceService.findAll();
  res.render('source-all', { sources });
});

router.get('/all/:language', async (req, res, next) => {
  const sources = await SourceModel.find({
    language: req.params.language
  }).populate('articles');

  res.render('source-all-lang', { sources });
});

router.get('/:sourceId', async (req, res, next) => {
  const source = await SourceService.find(req.params.sourceId);
  res.render('source-detail', { source });
});

router.get('/:sourceId/articles', async (req, res, next) => {
  const source = await SourceService.find(req.params.sourceId);

  res.render('source-articles', { source });
});

router.post('/', async (req, res, next) => {
  const source = await SourceService.add(req.body);
  res.send(article);
});

router.post('/:sourceId/articles', async (req, res, next) => {
  const source = await SourceService.find(req.params.sourceId);
  const target = await ArticleService.find(req.body.targetId);

  source.articles.push(target);

  const updatedSource = await source.save();

  res.send(updatedSource);
});

router.delete('/:articleId', async (req, res, next) => {
  await SourceService.del(req.params.articleId);
  res.send('ok');
});

module.exports = router;
