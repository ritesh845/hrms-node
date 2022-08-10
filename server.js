require('dotenv').config();
const http = require('http');
const app = require('./app')

const PORT = process.env.PORT || 8080;
const httpserver = http.createServer(app);
const io = require('socket.io')(httpserver);

io.on('connection',(socket) => {
    console.log("connection");
    socket.on("messageChanged", () => {
        console.log("hello",'messagechanges');
    });
    socket.on('disconnect', function () {
        console.log('A user disconnected');
     });
})

httpserver.listen(PORT);