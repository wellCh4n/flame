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
    var title = req.query.title == null ? "" : req.query.title;
    var page = req.query.page == (null || 0) ? 1 : req.query.page;
    var size = req.query.size == (null || 0) ? config.defaultPageSize : req.query.size;
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
        content: req.body.content
    };
    articleService.addArticle(article, (err) => {
        if (err) {
            formatResponse.sendError(res, err);
        }
        formatResponse.sendSuccess(res, null);
    })
});

router.post('/updateArticle', verifyToken, (req, res) => {
    var condition = {_id: req.body.id};
    var updates = {$set: {title: req.body.title, content: req.body.content}};
    articleService.updateArticle(condition, updates, (err) => {
        if (err) {
            formatResponse.sendError(res, err);
        }
        formatResponse.sendSuccess(res, null);
    })
});

router.post('/removeArticle', verifyToken, (req, res) => {
    var condition = {_id: req.body.id};
    articleService.removeArticle(condition, (err) => {
        if (err) {
            formatResponse.sendError(res, err);
        }
        formatResponse.sendSuccess(res, null);
    })
});

module.exports = router;