const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new PeerServer(undefined,{
    path: '/peerjs',
    host: '/',
    port: '3030'
});

let myVideoStream;

//function pour recuperer les appareil tel que video et mic
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream =>{
    myVideoStream = stream;
    addVideoStream(myVideo,stream)
});

socket.emit('join-room',Room_ID);

socket.on('user-connected',() =>{
    connecToNewUser();
})

const connecToNewUser = () =>{
    console.log('new user');
}

const addVideoStream = (video, stream) =>{
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',() => {
        video.play();
    })
    videoGrid.append(video);
}
