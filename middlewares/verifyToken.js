var jwt = require('jsonwebtoken');
var formatResponse = require('../utils/responseBody');

var confirmToken = (req, res, next) => {
    // if (!req.cookies.flame_token) {
    //     formatResponse.send(res, false, 'no token', null);
    // } else {
    //     var token = req.cookies.flame_token;
    //     jwt.verify(token, 'well', function (err) {
    //         if (err) {
    //             formatResponse.send(res, false, '鉴权失败', null);
    //         } else {
    //             next();
    //         }
    //     })
    // }
    if (!req.headers.authorization) {
        console.log('no token request');
        formatResponse.sendError(res, 'no token~');
    } else {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'well', (err) => {
            if (err) {
                console.log('check token error');
                formatResponse.sendError(res, '鉴权失败');
            } else {
                next();
            }
        })
    }
};

module.exports = confirmToken;