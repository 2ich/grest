
var express = require('express')

var app = express()
var server = app.listen(process.env.PORT || 50000)

app.use(express.static('public'))

console.log('Mysocket server')

var socket = require('socket.io')
var io = socket(server)

io.on('connection', newConnection)

function newConnection(socket) {
    console.log('new connection', socket.id)

    socket.on('mouse', mouseMsg)

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data)
        console.log(data)
    }


}