



class Ball {
  
    constructor() {
       
        this.x = WIDTH / 2;
        this.y = HEIGHT / 2;
        this.r = BALLRADIUS;
        this.colour = BALLCOLOUR;
 
    }
    
    draw() {
        
        ellipseMode(CENTER);
        fill(this.colour);
        ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
        
    }
  
}
