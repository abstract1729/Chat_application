const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        token: { type: String }
    }
)

const User = mongoose.model('User', userSchema, 'Comment2')

module.exports = User