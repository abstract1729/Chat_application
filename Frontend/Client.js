const socket = io("http://localhost:8080", { withCredentials: true })

socket.on("connect", () => {
    console.log("Connected Properly");
})

socket.on("sentByServer", (message) => {
    console.log(message);
})