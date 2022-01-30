// keep track of socket connection
var socket

var blob;
var blobs = []
var zoom = 1

function setup() {
    createCanvas(600, 600)
   
    socket = io.connect()

    blob = new Blob(random(width), random(height), random(8, 24))

    var data = {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    }
    socket.emit('start', data)

    socket.on('heartbeat', function(data) {
        //console.log(data)
        blobs = data
        
        var datafromclient = {
            x: blob.pos.x,
            y: blob.pos.y,
            r: blob.r
        }
        socket.emit('update', datafromclient)
    })
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
    var newscale = 32 / blob.r
    zoom = lerp(zoom, newscale, 0.1)
    //rect(0, 0, 60)
    scale(zoom)
    translate(-blob.pos.x, -blob.pos.y)


    rect(0, 0, 20)
    fill(255, 20)
    rect(0, 0, width, height)
    //console.log('after', blob.pos.x, blob.pos.y)
    
    for (var i = blobs.length - 1; i >= 0; i--) {
        fill(255, 127, 127)
        ellipse(blobs[i].x, blobs[i].y, blobs[i].r * 2)

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
    blob.show()
    blob.update()
    
    // var data = {
    //     x: blob.pos.x,
    //     y: blob.pos.y,
    //     r: blob.r
    // }
    // socket.emit('update', data)
}