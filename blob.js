function Blob(x, y, r) {
    this.pos = createVector(x, y)
    this.r = r

    this.update = () => {
        var vel = createVector(mouseX - width/2, mouseY - height/2)
        vel.setMag(3)
        this.pos.add(vel)
    }

    this.eats = function(other) {
        var d = p5.Vector.dist(this.pos, other.pos)
        if (d < this.r + other.r) {
            this.r += other.r * 0.2
            return true
        }
        return false
    }

    this.show = function() {
        fill(255)
        noStroke()
        stroke(127)
        strokeWeight(3)
        ellipse(this.pos.x, this.pos.y, this.r * 2)
        //fontSize(40)
        //p5.text(this.pos.x + ', ' + this.pos.y, 0, 0)
        //console.log(this.pos.x, this.pos.y)
    }
}