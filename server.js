const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socketio')(server);
const {v4: uuidv4} = require('uuid');

//specifie moteur
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',(req , res) => {
res.redirect(`/${uuidv4()}`);
});

//creation roomID
app.get('/:room',(req, res) =>{
    res.render('room',{ roomId: req.params.room});
});

//configuration sockets
io.on('connection', socket =>{
    socket.on('join-room', ()=>{
        console.log('joined the room');
    })
})

//le port de serveur 
server.listen(3030);