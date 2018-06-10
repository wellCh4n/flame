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
            console.log(err);
        } else {
            if (doc.password === req.body.password) {
                const token = createToken(doc._id, doc.username);
                res.cookie('flame_token', token, {httpOnly: true});
                formatResponse.send(res, true, '登录成功', {
                    id: doc._id,
                    name: doc.username,
                    token: token
                });
            } else {
                formatResponse.send(res, false, '登录失败', null);
            }
        }
    })
});

module.exports = router;