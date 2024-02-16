const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {v4: uuidv4} = require('uuid');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server,{
    debug: true
});

//specifie moteur
app.set('view engine','ejs');
app.use(express.static('public'));

app.use('/peerjs',peerServer);

app.get('/',(req , res) => {
res.redirect(`/${uuidv4()}`);
});

//creation roomID
app.get('/:room',(req, res) =>{
    res.render('room',{ roomId: req.params.room});
});

//configuration sockets
io.on('connection', socket =>{
    socket.on('join-room', (roomId)=>{
        socket.join(roomId);
        // Broadcast to everyone in the room except the sender
        socket.to(roomId).emit("user-connected");
    })
})

//le port de serveur 
server.listen(3030);