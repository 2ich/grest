var blob;
var blobs = []

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

    translate(width/2 - blob.pos.x, height/2 - blob.pos.y)
    
    scale(64 / blob.r)
    blob.show()

    blob.update()
    for (var i = blobs.length - 1; i >= 0; i--) {
        blobs[i].show()
        if (blob.eats(blobs[i])) {
            blobs.splice(i, 1)
        }
    }
}