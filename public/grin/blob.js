function Blob(id, x, y, r) {
    this.id = id
    this.pos = createVector(x, y)
    this.r = r
    this.vel = createVector(0, 0)

    this.update = () => {
        var newvel = createVector(mouseX - width/2, mouseY - height/2)
        newvel.setMag(7)
        this.vel.lerp(newvel, 1)
        this.pos.add(this.vel)
        this.constrain()

    }

    this.eats = function(other) {
        var d = p5.Vector.dist(this.pos, other.pos)
        if (d < this.r + other.r) {
            var sum = PI * this.r * this.r + PI * other.r * other.r
            this.r = sqrt(sum / PI)
            console.log(this.r)
            //this.r += other.r * 0.2
            return true
        }
        return false
    }

    this.constrain = function() {
        blob.pos.x = constrain(blob.pos.x, -width, width)
        blob.pos.y = constrain(blob.pos.y, -height, height)
    }

    this.show = function() {
        fill(100, 127, 255)
        noStroke()
        //stroke(100, 127, 255)
        stroke(255)
        strokeWeight(6) // 5
        ellipse(this.pos.x, this.pos.y, this.r * 2)
        //fontSize(40)
        //p5.text(this.pos.x + ', ' + this.pos.y, 0, 0)
        //console.log(this.pos.x, this.pos.y)
    }
}