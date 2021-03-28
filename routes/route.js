const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const middleware = require('../utils/indexMiddleware');

module.exports = function (app) {
    router.get('/', indexController.home);

    router.get('/posts/new', indexController.createNewPost);
    router.post('/posts/store', middleware.canPost, middleware.isFormFilled, indexController.createNewPost);
    router.get('/posts/:id', indexController.post);
    
    router.get('/posts/edit/:id', indexController.editPost);
    router.post('/posts/edit/:id', middleware.canPost, middleware.isFormFilled, indexController.editPost);
    router.get('/posts/delete/:id', indexController.deletePost);

    router.get('/admin', indexController.admin);
    router.get('/team', indexController.team);

    return app.use('/', router);
}