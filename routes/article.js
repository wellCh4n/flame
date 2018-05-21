var express = require('express');
var router = express.Router();
var db = require('../model/schema');
var formatResponse = require('../utils/responseBody');
var verifyToken = require('../middlewares/verifyToken');

router.get('/getArticle', (req, res) => {
    db.Article.findOne({_id: req.query.id}, (err, doc) => {
        if (err) {
            console.log(err);
            formatResponse.send(res, false, '执行失败', err);
        } else {
            formatResponse.send(res, true, '执行成功', {
                title: doc.title,
                content: doc.content
            })
        }
    })
});

router.post('/addArticle', verifyToken, (req, res) => {
    const article = {
        title: req.body.title,
        content: req.body.content
    };
    db.Article.create(article, (err) => {
        if (err) {
            console.log(err);
            formatResponse.send(res, false, '执行失败', err);
        } else {
            formatResponse.send(res, true, '执行成功', null);
        }
    })
})

module.exports = router;