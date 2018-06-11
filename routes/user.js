var express = require('express');
var router = express.Router();
var db = require('../model/schema');
var jwt = require('jsonwebtoken');
var formatResponse = require('../utils/responseBody');

var createToken = (id, username) => {
    return jwt.sign({
        id: id,
        username: username
    }, 'well', {expiresIn: '7d'})
};

router.post('/login', (req, res) => {
    db.User.findOne({username: req.body.username}, (err, doc) => {
        if (err) {
            formatResponse.sendError(res, err);
        } else if (doc == null){
            formatResponse.sendError(res, '无此用用户');
        } else {
            if (doc.password === req.body.password) {
                const token = createToken(doc._id, doc.username);
                let data = {
                    id: doc._id,
                    name: doc.username,
                    token: token
                };
                formatResponse.sendSuccess(res, data);
            } else {
                formatResponse.sendError(res, '密码错误');
            }
        }
    })
});

module.exports = router;