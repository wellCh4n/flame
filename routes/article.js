var express = require('express');
var router = express.Router();
var verifyToken = require('../middlewares/verifyToken');
var formatResponse = require('../utils/responseBody');

router.get('/getArticle', (req, res) => {
    db.Article.findOne({aid: req.query.id}, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            formatResponse.send(res, true, '执行成功', {
                title: doc.title,
                content: doc.content
            })
        }
    })
});

router.post('/addArticle', (req, res) => {
    // db.Article.create({})
});

module.exports = router;