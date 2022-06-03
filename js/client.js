const socket=io('http://localhost:3000');



//get DOM elemenst in respective js variable

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer=document.querySelector('.container')
var audio=new Audio('ting.mp3');
 

//funtion which append event info to the container
const append=(message,position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position=='left'){
        audio.play();
    }
}

//ask new user for his/her name and let the server know
const  username =prompt("Enter your name to  join");
socket.emit("newuserjoined",username);



// if a new user joins,receive the his/her name  from the server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')

})
//if server sends the msg receive it  
socket.on('receive',data=>{
    append(`${data.name} :${data.message}`,'left')

})
//if user leaves the chat ,append the info to the container
socket.on('left',name=>{
    append(`${name} left the chat`,'right')

})
//
//if form get submitted send the msg to the sesrver
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
})


