var db = require('../model/schema')

var getArticle = (id, callback) => {
    db.Article.find({_id: id}, (err, doc) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(null, doc);
    })
};

var getArticleList = (title, callback) => {
    db.Article.find({title: new RegExp(title, "i")}, (err, doc) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(null, doc);
    })
};

var addArticle = (article, callback) => {
    db.Article.create(article, (err) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(null);
    })
};

var updateArticle = (condition, updates, callback) => {
    db.Article.update(condition, updates, (err) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(null);
    })
};

var removeArticle = (condition, callback) => {
    db.Article.remove(condition, (err) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(null);
    })
}

module.exports = {
    getArticle,
    getArticleList,
    addArticle,
    updateArticle,
    removeArticle
};