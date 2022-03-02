const path = require('path')

const loginPage = (req, res) => {
    console.log("login page called")
    res.sendFile(path.join(__dirname, '../Static/Login.html'));
}

const registerPage = (req, res) => {
    console.log("Register page called")
    res.sendFile(path.join(__dirname, '../Static/Register.html'));
}

const roomPage = (req, res) => {
    // console.log(req.email)
    res.sendFile(path.join(__dirname, "../Static/Room.html"))
}

module.exports = {
    loginPage,
    registerPage,
    roomPage
}