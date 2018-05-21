const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    nickname: String,
    password: String,
    salt: String  // salt
},{versionKey: false});

const articleSchema = new Schema({
    aId: {type: Number, index: {unique: true}},
    title: String,
    description: String,
    content: String,
    tag: [String],
    commentCount: Number,
    isPublished: Boolean,
    modifyTime: Date,
    createTime: Date
},{versionKey: true});

const commentSechema = new Schema({
    cId: {type: Number, index: {unique: true}},
    nickname: String,
    content: String,
    aId: Number,
    blocked: Boolean,
    createTime: Date
});

const tagSechema = new Schema({
    name: {type: String, index: {unique: true}},
    aId: Number,
    aTitle: String,
    aDescription: String,
    createTime: Date
});

const Models = {
    User: mongoose.model('User', userSchema),
    Article: mongoose.model('Article', articleSchema),
    Comment: mongoose.model('Comment,', commentSechema),
    Tag: mongoose.model('Tag', tagSechema)
};

mongoose.connect('mongodb://127.0.0.1/Blog');

mongoose.connection.on('connected', function () {
    console.log('数据库连接成功');
});

mongoose.connection.on('error', function (err) {
    console.log(err);
});

mongoose.connection.on('disconnected', function () {
    console.log('连接失败');
});


module.exports = Models;