const Auth = require('../database/models/Auth');

module.exports = {
    canCreatePost: (req, res, next) => {
        Auth.findById(req.session.userId, (err, auth) => {
            if (err || !auth) return res.redirect('/');
            next();
        })
    },
    canRegister: (req, res, next) => {
        if (req.body.regId != 'danhtai123') return res.redirect('/register');
        next();
    },
    isLogin: (req, res, next) => {
        if (!req.session.userId) return res.redirect('/');
        next();
    },
    isFormFilled: (req, res, next) => {
        if (!req.body.username || !req.body.title || !req.body.description || !req.body.content)
            return res.redirect('/posts/new');
        next();
    }
}