var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// setting up regular HTTP server with Node that will then share with Express and Socket.IO
var http = require('http').Server(app)
// sets up http server
var io = require('socket.io')(http)
// passes in reference to http; this sets up socket for backend. Now set up in front end

app.use(express.static(__dirname))
// serves to client the index, __dirname serves the entire directory

app.use(bodyParser.json())
// adding middleware; .json() lets body-parser know we expect json coming in with HTTP request

app.use(bodyParser.urlencoded({extended: false}))
// input from browser is URL encoded

var messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'}
]

app.get('/messages', (req, res) =>{
    res.send(messages)
})
// creates path localhost:3000/messages where variable message value can be seen

app.post('/messages', (req, res) =>{
    // console.log(req.body)
    messages.push(req.body)
    io.emit('message', req.body)
    // socket captures new posts
    res.sendStatus(200)
})
// in order to make a post request, use POSTMAN. Express doesn't have a body parser so use
// npm i -d body-parser to parse the post request

io.on('connection', (socket) => {
    console.log('a user connected')
})

var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})