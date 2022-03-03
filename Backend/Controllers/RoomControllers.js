const Room = require('../Models/RoomSchema')

const addUserToRoom = async (roomname, email) => {
    try {
        const oldRoom = await Room.findOne({ roomname });
        if (oldRoom) {
            Room.updateOne({ roomname: roomname },
                {
                    $push: { members: email }
                })
            return true;
        }
        //If room is not found : Provide prompt to the user.
        return false
    }
    catch (err) {
        console.log(err)
    }
}

const createRoom = async (roomname, email) => {
    try {
        const oldRoom = await Room.findOne({ roomname });
        if (!oldRoom) {
            const data = await Room.create(
                {
                    roomname: roomName,
                    members: [email]
                }
            )
            console.log("Room Created")
            return true
        }
        return false
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    addUserToRoom,
    createRoom
}