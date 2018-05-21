var express = require('express');
var router = express.Router();
var db = require('../model/schema');

/* GET users listing. */
router.get('/', function(req, res, next) {
    const user = {
        username: 'wellch4n',
        password: 'well1995',
        salt: 'well'
    };
    db.User.create(user, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('ok');
        }
    })
});

module.exports = router;
