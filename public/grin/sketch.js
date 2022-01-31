// keep track of socket connection
var socket

var blob;
var blobs = []
var oldblobs = []
var zoom = 1

var selfid = 'NO_ID_HERE'

//var blerk = 0.4 // 0.5, 0.5, 0.2 idk for 50 ms heartbeat
// var blerk = 0.005 // for 1000 ms
var blerk = 0.2

var lerpk = blerk

function setup() {
    createCanvas(600, 600)
   
    socket = io.connect()

    socket.emit('getselfid', function(sidq) {
        console.log('sidq', sidq)
        blob.id = sidq
        selfid = sidq
    })
    console.log(socket.id)

    blob = new Blob(socket.id, random(width), random(height), random(16, 48))

    var data = {
        id: blob.id,
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    }
    socket.emit('start', data)

    console.log('start client blob', blob)

    socket.on('heartbeat', function(data) {
        //console.log(data)

        oldblobs = blobs
        blobs = data

        lerpk = blerk
        
        var datafromclient = {
            id: blob.id,
            x: blob.pos.x,
            y: blob.pos.y,
            r: blob.r
        }
        socket.emit('update', datafromclient)
    })

    socket.on('dead', () => {
                
        // blob = new Blob(socket.id, random(width), random(height), random(16, 32))
        blob.pos.x = random(width)
        blob.pos.y = random(height)
        blob.r = random(16, 32)

        var data = {
            id: blob.id,
            x: blob.pos.x,
            y: blob.pos.y,
            r: blob.r
        }

        console.log('dead', data)
        //socket.emit('dead', data, oldblobs[i].id)
        socket.emit('dead', data)
        //socket.emit('start', data)
        //socket.emit('connection')
    })

    // socket.on('killed', () => {
    //     console.log('killed')
    //     blob.r *= 2
    // })

    // for (var i = 0; i < 70; i++) {
    //     var x = random(-width, width)
    //     var y = random(-height, height)
    //     blobs[i] = new Blob(x, y, 16)
    // }
}

function draw() {
    background(14)

    //rect(0, 0, 20)

    //translate(width/2 - blob.pos.x, height/2 - blob.pos.y)
    //console.log('before', blob.pos.x, blob.pos.y)

    translate(width/2, height/2) 
    var newscale = 16 / blob.r
    zoom = lerp(zoom, newscale, 0.1)
    //rect(0, 0, 60)
    scale(zoom)
    translate(-blob.pos.x, -blob.pos.y)


    rect(0, 0, 20)
    fill(255, 20)
    rect(0, 0, width, height)
    //console.log('after', blob.pos.x, blob.pos.y)
    
    // idk about that
    if (oldblobs.length != blobs.length) {
        oldblobs = blobs
        console.log('less length in oldblobs')
    }

    for (var i = blobs.length - 1; i >= 0; i--) {

        if (blobs[i].id == selfid) {
            fill(50, 50, 50)
            //console.log('here')
        }
        else {
            fill(209, 178, 49)
        }
        // ellipse(blobs[i].x, blobs[i].y, blobs[i].r * 2)

        // using i's to can cause problems, bettery hashmap/dictionary/object of objects
        // don't actually think interpolating like that is a good idea
        // cause it's not actually linear: the closer it is to the target the lower the change
        oldblobs[i].x = lerp(oldblobs[i].x, blobs[i].x, lerpk)
        oldblobs[i].y = lerp(oldblobs[i].y, blobs[i].y, lerpk)
        oldblobs[i].r = lerp(oldblobs[i].r, blobs[i].r, lerpk)

        var d = p5.Vector.dist(blob.pos, createVector(oldblobs[i].x, oldblobs[i].y))
        line(blob.pos.x, blob.pos.y, oldblobs[i].x, oldblobs[i].y)
        if (d < blob.r && oldblobs[i].id != socket.id) {
            if (blob.r > oldblobs[i].r) {
                socket.emit('kill', oldblobs[i].id, blob.id, (cb) => {
                    blob.r = blob.r + cb * 0.2
                })
                console.log('kill', d)

            }
            // else {
                
            //     blob = new Blob(socket.id, random(width), random(height), random(16, 32))

            //     var data = {
            //         id: blob.id,
            //         x: blob.pos.x,
            //         y: blob.pos.y,
            //         r: blob.r
            //     }
            //     console.log('dead', data)
            //     socket.emit('dead', data, oldblobs[i].id)
            //     //socket.emit('start', data)
            //     //socket.emit('connection')
            // }
        }
        //console.log(oldblobs[0])

        ellipse(oldblobs[i].x, oldblobs[i].y, oldblobs[i].r * 2)



        // fill(255)
        // textAlign(CENTER)
        // textSize(20)
        // text(blobs[i].id)
        
        // blobs[i].show()
        // if (blob.eats(blobs[i])) {
        //     blobs.splice(i, 1)
        //     blobs.push(new Blob(random(-width, width), random(-height, height), 32))
        // }
    }

    // lerpk = lerpk * 1.1
    lerpk = lerpk * 1.9

    blob.show()
    blob.update()
    
    // var data = {
    //     x: blob.pos.x,
    //     y: blob.pos.y,
    //     r: blob.r
    // }
    // socket.emit('update', data)
}