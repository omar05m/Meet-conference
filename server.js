const express = require('express');
const app = express();
const server = require('http').Server(app);
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

//le port de serveur 
server.listen(3030);