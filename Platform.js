



class Platform {
    
    constructor(_x, _y, _w, _h) {
    
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
        this.colour = PLATFORMCOLOUR;
        
        this.dx = VELOCITY;
        
    }
     
        
     draw() {
        
         fill(this.colour);
         rect(this.x, this.y, this.w, this.h);
       
     }
     
     updatePosition(dt) {
         
         this.x -= this.dx * dt;
        
     }
     
     generateNext() {
         console.log("Hi");
         return new Platform(WIDTH, HEIGHT - 50, WIDTH, 50);
     }
   
   
    
}
