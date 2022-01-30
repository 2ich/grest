function Blob(x, y, r) {
    this.pos = createVector(x, y)
    this.r = r

    this.update = () => {
        var vel = createVector(mouseX, mouseY)
        vel.sub(this.pos)
        vel.setMag(3)
        this.pos.add(vel)
    }

    this.show = function() {
        fill(255)
        noStroke()
        stroke(127)
        strokeWeight(3)
        ellipse(this.pos.x, this.pos.y, this.r * 2)
    }
}