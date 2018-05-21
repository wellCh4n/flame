var jwt = require('jsonwebtoken');
var formatResponse = require('../utils/responseBody');

var confirmToken = (req, res, next) => {
    if (!req.cookies.flame_token) {
        formatResponse.send(res, false, 'no token', null);
    } else {
        var token = req.cookies.flame_token;
        jwt.verify(token, 'well', function (err) {
            if (err) {
                formatResponse.send(res, false, '鉴权失败', null);
            }
        })
    }
    next();
};

module.exports = confirmToken;