const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema(
    {
        roomname: { type: String, unique: true },
        members: [{ type: String }]
    }
)

const Room = mongoose.model('Room', roomSchema, 'Comment3')

module.exports = Room