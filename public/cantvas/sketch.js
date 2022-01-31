var socket

function setup() {
    createCanvas(400, 400)
    background(51)

    // opening a connection to the server that has a socket server on it
    socket = io()
    socket.on('mouse', newDrawing)
}

function newDrawing(data) {
    noStroke()
    fill(255, 0, 100)
    rect(data.x, data.y, 20, 20)
}
function mouseDragged() {
    console.log('Sending: ' + mouseX + ', ' + mouseY)

    var data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit('mouse', data)

    noStroke()
    fill(255)
    rect(mouseX, mouseY, 20, 20)
}

function draw() {
}