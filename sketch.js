var blob;
var blobs = []

function setup() {
    createCanvas(600, 600)
    blob = new Blob(width/2, height/2, 64)
    for (var i = 0; i < 100; i++) {
        var x = random(-width, width * 2)
        var y = random(-height, height * 2)
        blobs[i] = new Blob(x, y, 16)
    }
}

function draw() {
    background(14)

    translate(width/2 - blob.pos.x, height/2 - blob.pos.y)
    blob.show()

    blob.update()
    for (var i = blobs.length - 1; i >= 0; i--) {
        blobs[i].show()
        if (blob.eats(blobs[i])) {
            blobs.splice(i, 1)
        }
    }
}