
//  node server which    will handle Socket.io connection 
const io = require('socket.io')(3000,
    {
        cors: {
            origin: '*',
        }
    });

const users = {};

io.on('connection', socket => { // it will listen all the connection like when  joined chat it will listen simlarly if rohit joinedchat it wil listen 


    socket.on("newuserjoined", name => {  // for a particular connection what it should do like when user joined just set the name as the user id 

        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);  //tell this user joined to all client  

    });
    socket.on('send', message => {//if soneone sends the msg broadcast to everyone
        socket.broadcast.emit('receive', { message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {// if soneone leaves the chat let others know
        socket.broadcast.emit('left', users[socket.id] );
        delete users[socket.id];
    });


})

