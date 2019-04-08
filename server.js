var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static(__dirname))
// serves to client the index, __dirname serves the entire directory

var messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'}
]

app.get('/messages', (req, res) =>{
    res.send(messages)
})
// creates path localhost:3000/messages where variable message value can be seen

app.post('/messages', (req, res) =>{
    console.log(req.body)
    res.sendStatus(200)
})
// in order to make a post request, use POSTMAN. Express doesn't have a body parser so use
// npm i -d body-parser to parse the post request


var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})