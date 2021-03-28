module.exports = {
    isFormFilled: (req, res, next) => {
        if (!req.files.image || !req.body.username || !req.body.title || !req.body.description || !req.body.content)
            return res.redirect('/posts/new');
        next();
    },
    canPost: (req, res, next) => {
        if (req.body.key!=='111') {
            return res.redirect('/posts/new');
        }
        next();
    },
}