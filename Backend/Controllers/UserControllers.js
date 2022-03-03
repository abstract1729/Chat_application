const User = require('../Models/UserSchema')
const bcrypt = require('bcryptjs')
const path = require('path')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwt_key = process.env.JWT_TOKEN_KEY;


const sendToken = async (req, res) => {
    try {
        const password = req.body.password
        const email = req.body.email
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            console.log("user validated from database")
            const token = jwt.sign(email, jwt_key)
            res.cookie('access_token', token).status(200).sendFile(
                path.join(__dirname, "../Static/Room.html")
            )
        }
        else {
            res.status(403).send("USER NOT FOUND!!!")
        }
    } catch (error) {
        console.log(error)
    }

}

const userAdd = async (req, res) => {
    try {
        const email = req.body.email;
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encpasswd = await bcrypt.hash(req.body.password, 10);
        try {
            const data = await User.create(
                {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: encpasswd,
                }
            )
            console.log("added correctly")
            res.sendFile(path.join(__dirname, '../Static/Login.html'));
        }
        catch {
            res.sendFile(path.join(__dirname, '../Static/AddProblem.html'))
        }
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = {
    sendToken,
    userAdd,
}