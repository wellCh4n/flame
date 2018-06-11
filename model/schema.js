const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    nickname: String,
    password: String,
    salt: String
}, {versionKey: false});

const articleSchema = new Schema({
    title: String,
    description: String,
    content: String,
    markdown: String,
    tag: [String],
    commentCount: Number,
    isPublished: Boolean,
    modifyTime: Date,
    createTime: Date
}, {versionKey: false});
articleSchema.plugin(mongoosePaginate);

const commentSechema = new Schema({
    nickname: String,
    content: String,
    aId: String,
    blocked: Boolean,
    createTime: Date
}, {versionKey: false});

const tagSechema = new Schema({
    name: {type: String, index: {unique: true}},
    aId: String,
    aTitle: String,
    aDescription: String,
    createTime: Date
}, {versionKey: false});

const Models = {
    User: mongoose.model('User', userSchema),
    Article: mongoose.model('Article', articleSchema),
    Comment: mongoose.model('Comment', commentSechema),
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