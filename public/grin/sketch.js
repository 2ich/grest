// keep track of socket connection
var socket

var blob;
var blobs = []
var oldblobs = []
var zoom = 1

//var blerk = 0.4 // 0.5, 0.5, 0.2 idk for 50 ms heartbeat
// var blerk = 0.005 // for 1000 ms
var blerk = 0.2

var lerpk = blerk

function setup() {
    createCanvas(600, 600)
   
    socket = io.connect()

    blob = new Blob(random(width), random(height), 16)

    var data = {
        x: blob.pos.x,
        y: blob.pos.y,
        r: blob.r
    }
    socket.emit('start', data)

    socket.on('heartbeat', function(data) {
        //console.log(data)

        oldblobs = blobs
        blobs = data

        lerpk = blerk
        
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
    if (oldblobs.length < blobs.length) {
        oldblobs = blobs
        console.log('less length')
    }

    for (var i = blobs.length - 1; i >= 0; i--) {

        if (blobs[i].id == socket.id) {
            fill(50, 50, 50)
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
    lerpk = lerpk * 2

    blob.show()
    blob.update()
    
    // var data = {
    //     x: blob.pos.x,
    //     y: blob.pos.y,
    //     r: blob.r
    // }
    // socket.emit('update', data)
}