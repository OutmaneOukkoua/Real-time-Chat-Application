const express = require('express');
const { join } = require('path');  
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {
    console.log('a user connected with id -->', socket.id);
    
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
    
    io.emit("Send_Message_To_All_User",msg);
    
    });

    socket.on('typing',()=>{
        socket.broadcast.emit('show_typing_status');
      // broadcast to all users that someone is typing except themselves
    })

    socket.on('stoptyping',()=>{
        socket.broadcast.emit('stop_typing_status');
    })

    socket.on('disconnect', () => {
        io.emit('user_disconnected', { userId: socket.id });
    });

});

// emit -->   publish to an event using emit('eventName', data)
// on -->  listen to event using .on('eventName', callback)
 
  


server.listen(4000, () => {
    console.log("Server has started on port 4000");
});



// this concept name is event driven programming