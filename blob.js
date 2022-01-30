const { text } = require("body-parser")

function Blob() {
    this.pos = createVector(width / 2, height / 2)
    this.r = 64

    this.show = function() {
        fill(255)
        noStroke()
        ellipse(this.pos.x, this.pos.y, this.r * 2)
        //text('hello', 200, 200)
    }
}