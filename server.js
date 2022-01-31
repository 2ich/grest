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

    var blob = new Blob(socket.id, 0, 0, 8)
    blobs.push(blob)

    socket.on('start', function (data) {
        //console.log(socket.id + ' (' + data.x + ', ' + data.y + ') r = ' + data.r)
        blob = new Blob(socket.id, data.x, data.y, data.r)
        // socket.broadcast.emit('mouse', data)
        //blobs.push(blob)
        console.log('start blobs', blobs)
    })

    socket.on('update', function (data) {
        //console.log(socket.id + ' (' + data.x + ', ' + data.y + ') r = ' + data.r)
        // socket.broadcast.emit('mouse', data)
        //var blob
        for (var i = 0; i < blobs.length; i++) {
            if (socket.id == blobs[i].id) {
                blob = blobs[i]
            }
        }
        blob.id = data.id
        blob.x = data.x
        blob.y = data.y
        blob.r = data.r

        //console.log(blob)
    })

    socket.on('disconnect', (reason) => {
        // blobs.forEach(blb => {
        //     if (blb.id == socket.id) {

        //     }
        // })
        console.log('disc before splice')
        for (let i = blobs.length - 1; i >= 0; i--) {
            console.log(blobs[i])
            if (blobs[i].id == socket.id) {
                console.log('disconnect here')
                blobs.splice(i, 1)
            }
        }
    })

    socket.on('kill', (deadid, murda, callback) => {
        //deadid.disconnect()
        //console.log('kill')


        

        for (let i = blobs.length - 1; i >= 0; i--) {
            if (blobs[i].id == deadid) {
                callback(blobs[i].r)
                blobs.splice(i, 1)
            }
        }

        
        io.to(deadid).emit('dead')


        // for (let i = blobs.length - 1; i >= 0; i--) {
        //     if (blobs[i].id == deadid) {
        //         blobs.splice(i, 1)
        //     }
        // }
    })

    // socket.on('dead', (data, murda) => {
    //     for (let i = blobs.length - 1; i >= 0; i--) {
    //         if (blobs[i].id == socket.id) {
    //             blobs.splice(i, 1)
    //         }
    //     }
    //     blob = new Blob(socket.id, data.x, data.y, data.r)
    //     blobs.push(blob)

    //     console.log(murda.id)
    //     io.to(murda.id).emit('killed')
    //     // blobs.push(new Blob(socket.id, 0, 0))

    // })

    // socket.on('respawn', () => {
    //     blobs.push(new Blob(socket.id, 0, 0))
    // })

    socket.on('getselfid', (callback) => {
        callback(socket.id)
    })

    socket.on('dead', data => {
        blob = new Blob(data.id, data.x, data.y, data.r)
        blobs.push(blob)
    })

})