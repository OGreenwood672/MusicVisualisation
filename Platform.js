

class Platform {
    
    constructor(_x, _y, _w, _h, exit_velocity, time) {
    
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
        this.colour = PLATFORMCOLOUR;
        
        this.dx = VELOCITY;
        this.exit_velocity = exit_velocity;
        this.time = time;
        
    }
     
        
    draw() {
        fill(this.colour);
        rect(this.x, this.y, this.w, this.h);
    
    }
    
    
    // Assumes constant velocity forwards
    generateNext(next_time) {
        
        let dt = (next_time - this.time);

        let next_x = this.dx * dt + this.x + (PLATFORMWIDTH / 2);

        let next_v = this.exit_velocity + GRAVITY * dt;

        let old_y = this.exit_velocity >= 0 ? this.y + PLATFORMHEIGHT + BALLRADIUS: this.y - BALLRADIUS;
        let next_h = old_y + this.exit_velocity * dt + 0.5 * GRAVITY * dt * dt;

        let next_exit_velocity;
        if (next_v <= 0) {
            next_exit_velocity = hitTop(next_v);
            next_h -= (PLATFORMHEIGHT + BALLRADIUS);
        } else {
            next_exit_velocity = hitBottom(next_v)
            next_h += BALLRADIUS;
        }

        // console.log("next x", next_x)
        // console.log("old_y", old_y)
        // console.log("dt", dt)
        // console.log("gravity compoonent", 0.5 * GRAVITY * dt * dt)
        // console.log("velocity component", this.exit_velocity * dt)
        // console.log("next h", next_h)
        // console.log("next_v", next_v)
        // console.log("old-exit-vel", this.exit_velocity);
        // console.log("new-exit-vel", next_exit_velocity)
        
        return new Platform(next_x - PLATFORMWIDTH / 2, next_h, PLATFORMWIDTH, PLATFORMHEIGHT, next_exit_velocity, next_time);

    }
   
   
    
}
