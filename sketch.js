var blob;
var blobs = []
var zoom = 1

function setup() {
    createCanvas(600, 600)
    blob = new Blob(0, 0, 64)
    for (var i = 0; i < 100; i++) {
        var x = random(-width, width)
        var y = random(-height, height)
        blobs[i] = new Blob(x, y, 16)
    }
}

function draw() {
    background(14)

    //rect(0, 0, 20)

    //translate(width/2 - blob.pos.x, height/2 - blob.pos.y)
    //console.log('before', blob.pos.x, blob.pos.y)

    translate(width/2, height/2) 
    var newscale = 64 / blob.r
    zoom = lerp(zoom, newscale, 0.1)
    //rect(0, 0, 60)
    scale(zoom)
    translate(-blob.pos.x, -blob.pos.y)


    rect(0, 0, 20)
    //console.log('after', blob.pos.x, blob.pos.y)
    
    for (var i = blobs.length - 1; i >= 0; i--) {
        blobs[i].show()
        if (blob.eats(blobs[i])) {
            blobs.splice(i, 1)
        }
    }
    blob.show()
    blob.update()
}