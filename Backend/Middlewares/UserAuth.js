
const User = require('../Models/UserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwt_key = process.env.JWT_TOKEN_KEY;

const userAuth = async (socket, next) => {
    const token = socket.request.cookies.access_token;
    // console.log(socket.request.cookies)
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, jwt_key);
        console.log('access token verified')
        socket.email = data;
        console.log(data)
        return next();
    } catch {
        socket.disconnect();
    }
}

module.exports = { userAuth }