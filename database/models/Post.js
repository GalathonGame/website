const mongoose = require('mongoose');
const { collection } = require('./Auth');

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    username: String,
    image: String,
    createdAt: {type: Date, default: new Date()}
}, { collection: 'Posts' });

module.exports = mongoose.model('Posts', PostSchema);