const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

// connecting our server with socket.io
const io = new Server(server, {
    // for resolving cors issue of socket.io
  cors: {
    //   to accept socket connection with this origin
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// looking for "connection" event
io.on("connection", (socket) => {
    // if someone visits the website, they will be connected
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});