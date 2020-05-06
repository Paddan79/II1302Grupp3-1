const socket = io();

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


// Get room and username from URL
const {username, room} = Qs.parse(location.search , {
    ignoreQueryPrefix: true
});

// Join chatroom
socket.emit('joinRoom' , {username, room});

// Get the room and users
socket.on('roomUsers', ({users, room}) => {
    outputRoomName(room);
    outputUsers(users);
})

// Message from server
socket.on('message', message => {
  console.log(message);  
  outputMessage(message);

  // scroll the chat down to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// submit message

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text from form
    const msg = e.target.elements.msg.value;

    // Emit message to the server
    socket.emit('chatMessage' ,msg);

    // Clear the input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});



//ouput message to DOMView
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM view
function outputRoomName(room) {
    roomName.innerText = room;
}

// add user to the userlist in the DOM view
function outputUsers(users) {
    userList.innerHTML = `
       ${users.map(user => `<li>${user.username}</li>`).join('')}   
    `;
}