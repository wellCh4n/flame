var express = require('express');
var router = express.Router();
var verifyToken = require('../middlewares/verifyToken');

router.post('/test', verifyToken, function (req, res) {
    res.send('test');
});

module.exports = router;
