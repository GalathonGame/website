const Post = require('../database/models/Post');
const image = require('../utils/image');

var self = module.exports = {
    home: async (req, res) => {
        res.render('index');
    },
    createNewPost: async (req, res) => {
        if (req.method === 'GET') return res.render('create');
        
        let obj = await image.prepareObj(req.body, req.files.image);
        await Post.create(obj);
        res.redirect('/');
    },
    post: async (req, res) => {
        let post = await Post.findById(req.params.id);
        res.render('post', {post});
    },
    editPost: async (req, res) => {
        let post = await Post.findById(req.params.id);
        if (req.method === 'GET') return res.render('editPost', {post});

        await image.deleteImg(post.image);
        let obj = await image.prepareObj(req.body, req.files.image);
        await Post.findByIdAndUpdate(req.params.id, {$set: obj}, {new: true});
        res.redirect('/');
    },
    deletePost: async (req, res) => {
        let post = await Post.findByIdAndDelete(req.params.id);
        await image.deleteImg(post.image);
        res.redirect('/');
    },
    admin: async (req, res) => {
        let posts = await Post.find({}); //all the posts in database
        res.render('admin', {posts});
    },
    team: async (req, res) => {
        let posts = await Post.find({}); //all the posts in database
        res.render('team', {posts});
    }
}