const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//Get username and room from url
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
});




const socket = io();

//join room
socket.emit('joinRoom',{username,room});

socket.on('message',message =>{
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
    
})

//on Submit
chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    //get msg text
    const msg = e.target.elements.msg.value;
    
    //emit to backend
    socket.emit('chatMessage',msg)
    

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

//get room users
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUser(users);

});

//output msg to DOM

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

//add Roomname to DoM

function outputRoomName(room){
    roomName.innerText = room;
}

//add Users to DOM
function outputUser(users){
    userList.innerHTML = `${users.map(user=> `<li>${user.username}</li>`).join('')}
    `
}