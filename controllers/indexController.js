const Post = require('../database/models/Post');
const Auth = require('../database/models/Auth');
const md5 = require('md5');
const image = require('../utils/image');
const text = require('../utils/text');

var self = module.exports = {
    home: async (req, res) => {
        res.render('index');
    },
    createNewPost: async (req, res) => {
        if (req.method === 'GET') return res.render('create');
        
        let obj = await image.prepareObj(req.body);
        obj.content = await text.convertToHTML(obj.content);

        await Post.create(obj);
        res.redirect('/');
    },
    post: async (req, res) => {
        let post = await Post.findById(req.params.id);
        res.render('post', {post});
    },
    editPost: async (req, res) => {
        let post = await Post.findById(req.params.id);
        post.content = await text.convertToText(post.content);
        if (req.method === 'GET') return res.render('editPost', {post});

        let obj = await image.prepareObj(req.body);
        obj.content = await text.convertToHTML(obj.content);

        await Post.findByIdAndUpdate(req.params.id, {$set: obj}, {new: true});
        res.redirect('/');
    },
    deletePost: async (req, res) => {
        let post = await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    },
    register: (req, res) => {
        if (req.method === 'GET') return res.render('register', {errors: req.flash('registrationErrors')});

        const obj = {
            username: req.body.username,
            email: req.body.email,
            password: md5(req.body.password)
        }
        Auth.create(obj, (error, auth) => {
            if (error) {
                //const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message);

                req.flash('registrationErrors', error.message);
                return res.redirect('/register');
            }
            res.redirect('/login');
        })
    },
    login: (req, res) => {
        if (req.method === 'GET') return res.render('login');

        const obj = {
            username: req.body.username,
            password: md5(req.body.password)
        }
        Auth.findOne(obj, (err, auth) => {
            if (auth) {
                req.session.userId = auth._id;
                return res.redirect('/admin');
            }
            res.redirect('/login')
        })
    },
    logout: (req, res) => {
       req.session.destroy(() => res.redirect('/'));
    },
    admin: async (req, res) => {
        let posts = await Post.find({}); //all the posts in database
        posts.reverse();
        res.render('admin', {posts});
    },
    team: async (req, res) => {
        let posts = await Post.find({}); //all the posts in database
        posts.reverse();
        res.render('team', {posts});
    }
}