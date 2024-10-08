require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketio = require('socket.io');
const path = require('path');
const io = socketio(http);
const port = process.env.PORT || 3000;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve HTML file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // Adjust the path as needed
});

io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("recive-location", { id: socket.id, ...data });
    });
    console.log("User Connected: " + socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
        io.emit("User-disconnect", socket.id);
    });
});

http.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}/`);
});
