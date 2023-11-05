const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin,getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');


const app = express();

const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname,'views')));
const botName = 'chatApp';


//When client connected
io.on('connection', socket =>{

    socket.on('joinRoom',({username,room})=>{

        const user = userJoin(socket.id,username,room);
        socket.join(user.room);

        //Greet current user
        socket.emit('message', formatMessage(botName,'welcome to chat app'));

        //When user connects - Broadcast
        socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${username} has joined chat`));


        //send users info 
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        });


         //when client disconnects 
        socket.on('disconnect',()=>{
            const user = userLeave(socket.id);
            
            console.log(user);
            if(user){
                io.to(user.room).emit('message',formatMessage(botName,`${username} has left the chat`));
                io.to(user.room).emit('roomUsers',{
                    room:user.room,
                    users:getRoomUsers(user.room)
                });
            }   
        });
    });

    //listen chatMessage
    socket.on('chatMessage',(msg)=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username,msg));
    })
});

const PORT = 8000 || process.env.PORT;

server.listen(PORT,()=>{
    console.log(`Server running at ${PORT}` );
})