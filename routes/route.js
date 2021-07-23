const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const middleware = require('../utils/indexMiddleware');

module.exports = function (app) {
    router.get('/', indexController.home);

    router.get('/posts/new', middleware.canCreatePost, indexController.createNewPost);
    router.post('/posts/store', middleware.canCreatePost, middleware.isFormFilled, indexController.createNewPost);
    router.get('/posts/:id', indexController.post);
    
    router.get('/posts/edit/:id', middleware.canCreatePost, indexController.editPost);
    router.post('/posts/edit/:id', middleware.canCreatePost, middleware.isFormFilled, indexController.editPost);
    router.get('/posts/delete/:id', middleware.canCreatePost, indexController.deletePost);

    router.get('/register', indexController.register);
    router.post('/register', middleware.canRegister, indexController.register);

    router.get('/login', indexController.login);
    router.post('/login', indexController.login);

    router.get('/logout', indexController.logout);

    router.get('/admin', middleware.isLogin, indexController.admin);
    router.get('/team', indexController.team);
    router.post('/notify', indexController.notify);

    return app.use('/', router);
}