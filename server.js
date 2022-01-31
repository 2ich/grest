var blobs = []

function Blob(id, x, y, r) {
    this.id = id
    this.x = x
    this.y = y
    this.r = r
}


var express = require('express')

var app = express()
var server = app.listen(process.env.PORT || 50000)

app.use(express.static('public'))

console.log('Mysocket server')

var socket = require('socket.io')
var io = socket(server)

setInterval(heartbeat, 50)

function heartbeat() {
    // socket.broadcast.emit('heartbeat', blobs)
    io.emit('heartbeat', blobs)
}

io.on('connection', function(socket) {
    console.log('new connection', socket.id)

    var blob = new Blob(socket.id, 0, 0)
    blobs.push(blob)

    socket.on('start', function (data) {
        console.log(socket.id + ' (' + data.x + ', ' + data.y + ') r = ' + data.r)
        blob = new Blob(socket.id, data.x, data.y, data.r)
        // socket.broadcast.emit('mouse', data)
    })

    socket.on('update', function (data) {
        console.log(socket.id + ' (' + data.x + ', ' + data.y + ') r = ' + data.r)
        // socket.broadcast.emit('mouse', data)
        //var blob
        for (var i = 0; i < blobs.length; i++) {
            if (socket.id == blobs[i].id) {
                blob = blobs[i]
            }
        }
        blob.x = data.x
        blob.y = data.y
        blob.r = data.r
    })

    socket.on('disconnect', (reason) => {
        // blobs.forEach(blb => {
        //     if (blb.id == socket.id) {

        //     }
        // })
        for (let i = blobs.length - 1; i >= 0; i--) {
            if (blobs[i].id == socket.id) {
                blobs.splice(i, 1)
            }
        }
    })

})