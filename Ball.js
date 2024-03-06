



class Ball {
  
    constructor() {
       
        this.x = WIDTH / 2;
        this.y = HEIGHT / 2;
        this.r = BALLRADIUS;
        this.colour = BALLCOLOUR;
        
        this.e = BALLBOUNCE;
        
        this.dy = 0;
        this.ay = GRAVITY;
 
    }
    
    updatePosition(dt, platforms) {
      
        this.dy += this.ay;
        
        platforms.forEach(platform => {

            platform.y -= this.dy * dt;

            if (this.isIntersecting(platform)) {


                let height_top_difference = platform.y - (this.y + this.r);
                let height_bottom_difference = this.y - this.r - platform.y + platform.h;
                
                if (height_bottom_difference > height_top_difference) {
                    this.y = platform.y - this.r;
                    this.dy = Math.log(1 - this.dy);
                } else {
                    this.y = platform.y + platform.h + this.r;
                    this.dy *= -1;
                }
            }

        })
    }

    isIntersecting(platform) {

        // Calculate the distance between the circle's center and the rectangle's center
        let distX = Math.abs(this.x - (platform.x + platform.w / 2));
        let distY = Math.abs(this.y - (platform.y + platform.h / 2));
            
        // If the distance between centers is greater than the sum of their radii, they don't overlap
        if (distX < (platform.w / 2 + this.r) && distY < (platform.h / 2 + this.r)) {
            // Check if the circle overlaps any of the rectangle's corners
            let cornerDistSq = Math.pow(distX - platform.w / 2, 2) + Math.pow(distY - platform.h / 2, 2);
            let onCorners = cornerDistSq <= Math.pow(this.r, 2);

            // If the distance between centers is less than or equal to the sum of their radii, they overlap
            if (distX <= (platform.w / 2) || distY <= (platform.h / 2) || onCorners) {
                
                return true;
            
            }
        }
        return false;

    }
    
    
    
    draw() {
        
        ellipseMode(CENTER);
        fill(this.colour);
        ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
        
    }
  
}
