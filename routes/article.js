var express = require('express');
var router = express.Router();
var formatResponse = require('../utils/responseBody');
var verifyToken = require('../middlewares/verifyToken');
var articleService = require('../service/articleService');

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
    articleService.getArticleList(title, (err, data) => {
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