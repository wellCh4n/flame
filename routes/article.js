var express = require('express');
var router = express.Router();
var verifyToken = require('../middlewares/verifyToken');
var formatResponse = require('../utils/responseBody');
var articleService = require('../service/articleService');
var config = require('../config/config');

router.get('/getArticle', (req, res) => {
    articleService.getArticle(req.query.id, (err, data) => {
        if (err) {
            formatResponse.sendError(res, err);
        }
        formatResponse.sendSuccess(res, data);
    })
});

router.get('/getArticleList', (req, res) => {
    let title = req.query.title == undefined ? "" : req.query.title;
    let page = req.query.page == undefined ? 1 : req.query.page;
    let size = req.query.size == undefined ? config.defaultPageSize : req.query.size;
    articleService.getArticleList(title, page, size, (err, data) => {
        if (err) {
            formatResponse.sendError(res, err);
        }
        formatResponse.sendSuccess(res, data);
    })
});

router.post('/addArticle', verifyToken, (req, res) => {
    const article = {
        title: req.body.title,
        content: req.body.content,
        markdown: req.body.markdown,
        tags: req.body.tags
    };
    articleService.addArticle(article, (err) => {
        if (err) {
            formatResponse.sendError(res, err);
        }
        formatResponse.sendSuccess(res);
    })
});

router.post('/updateArticle', verifyToken, (req, res) => {
    let condition = {_id: req.body.id};
    let updates = {$set: {title: req.body.title, content: req.body.content, markdown: req.body.markdown}};
    articleService.updateArticle(condition, updates, (err) => {
        if (err) {
            formatResponse.sendError(res, err);
        }
        formatResponse.sendSuccess(res);
    })
});

router.post('/removeArticle', verifyToken, (req, res) => {
    let condition = {_id: req.body.id};
    articleService.removeArticle(condition, (err) => {
        if (err) {
            formatResponse.sendError(res, err);
        }
        formatResponse.sendSuccess(res);
    })
});

module.exports = router;