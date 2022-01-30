var blob;
var blobs = []

function setup() {
    createCanvas(600, 600)
    blob = new Blob(width/2, height/2, 64)
    for (var i = 0; i < 60; i++) {
        blobs[i] = new Blob(random(width * 2), random(height * 2), 16)
    }
}

function draw() {
    background(14)

    translate(width/2 - blob.pos.x, height/2 - blob.pos.y)
    blob.show()

    blob.update()
    for (var i = 0; i < blobs.length; i++) {
        blobs[i].show()
    }
}