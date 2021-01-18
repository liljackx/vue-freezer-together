const app = require('express')();
const http = require('http').createServer(app);
const shortid = require('shortid');
const fs = require("fs");

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8080",
        allowedHeaders: ["*"],
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log("Got a connection")

    socket.on("createRoom", () => {
        console.log("Requested room creation")
        const currRoomId = shortid.generate();
        socket.join(currRoomId);
        socket.emit("roomId", { id:currRoomId});
    })

    // console.log("[!] New connection!")
    // console.log("[!] Creating new room ")
    
    // const newRoomId = shortid.generate();
    
    // socket.join(newRoomId);

    socket.on("newTrack", (track) => {
        console.log("newTrack")
        io.in(track.roomId).emit("trackChanged", track.track);
    })

    socket.on("joinRoom", (room) => {
        console.log(room);
        socket.join(room.id);
        console.log("Joining room...")
        socket.emit("roomId", {id:room.id});
        io.in(room.id).emit("message", "User joined room");
        io.in(room.id).emit("joined");
        io.in(room.id).emit("requestCurrent")
    })

    socket.on("disconnecting", () => {
        socket.emit("userDisconnected") // In future add which user has disconnected
        console.log("user disconnected")
    })

    socket.on("current", (audio) => {
        console.log("Received new current time")
        // console.log(time)
        io.emit("audioUpdate", {audio: audio});
    })

    socket.on("playback", (data) => {
        io.emit("play", data)
    })
});

http.listen(4000, () => {
    console.log("Listening on port 4000...");
})
