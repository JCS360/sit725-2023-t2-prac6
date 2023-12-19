let express = require('express');
let app = express();

require('./dbConnection');

let port = process.env.port || 3000;

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Missing Start Database



let router = require('./routers/router');
app.use('/api/cat',router);

const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);


io.on('connection',(socket)=>{
    console.log('something');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    setInterval(()=>{
        socket.emit('number', parseInt(Math.random()*10));
    }, 1000)
});


app.get('/', function (req,res) {
    res.render('index.html');
});

http.listen(port, ()=>{
    console.log('express server started');
});
