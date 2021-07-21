const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
}, { collection: 'Auths' })

module.exports = mongoose.model('Auths', AuthSchema);