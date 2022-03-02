const socket = io()
const createRoomButton = document.getElementById("createRoom")
const roomName = document.getElementById("roomName")
const Youremail = document.getElementById("Youremail")
const memEmail = document.getElementById("memberEmail")
const addMemberButton = document.getElementById("addMember")

socket.on("connect", () => {
    console.log("Connected Properly");
})

socket.on('Prompt', (message) => {
    alert(message)
})

createRoomButton.addEventListener("click", () => {
    console.log("createRoom function called")
    if (roomName.value === "" || roomName.value === "Fill this field")
        roomName.value = "Fill this field"
    else {
        socket.emit("createRoom", roomName.value)
        roomName.value = ""
    }
})


//Need to wrap the emit function into another function.
// Else, it gets called automatically.
addMemberButton.addEventListener("click", () => {
    console.log("addMember function called")
    console.log(memEmail.value + "-----")
    if (memEmail.value === "" || memEmail.value === "Fill this field")
        memEmail.value = "Fill this field"
    else {
        socket.emit("addMember", memEmail.value)
        memEmail.value = ""
    }
})