const express = require('express')
const { request } = require('http')
const app = express()
const server = require('http').createServer(app)
const port = 8080
const path = require("path")
const router = require('./Routes/UserRoutes.js')
const roomCtrl = require("./Controllers/RoomControllers")
const UserCtrl = require('./Controllers/UserControllers')
const UserAuth = require('./Middlewares/UserAuth')
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')
const jwt_key = process.env.JWT_TOKEN_KEY;


require('./DBConfig/DBConnection')



app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

app.use('/', router)
app.use(express.static('Static'))
app.use(cookieParser())
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

const io = require("socket.io")(server)

io.use(wrap(cookieParser()))
io.use(UserAuth.userAuth)

io.on('connection', socket => {
    console.log("Socket connection established", socket.id)
    const email = socket.email
    socket.emit("activeRooms",)
    socket.emit("activeMembers",)
    socket.on("createRoom", (roomName) => {
        const result = roomCtrl.createRoom(roomName, email)
        console.log(result)
        if (!result)
            socket.emit("Prompt", "Room with this name already present")

    })

    socket.on("addMember", (email) => {
        console.log(email)
        const result = roomCtrl.addUserToRoom(roomName, email)
        if (!result)
            socket.emit("Prompt", "Room Not Found")
    })

    socket.on("disconnect", () => {
        //remove the users disconnected.
        // socket.request.cookies.access_token = ""
        console.log(socket.id + " disconnected")
    })
})

server.listen(port, () => {
    console.log(`Server running at  http://localhost:${port}`)
    console.log(`Login @  http://localhost:${port}/login`)
    console.log(`Register @  http://localhost:${port}/register`)
})