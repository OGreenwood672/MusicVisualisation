

let ball;
let platforms = [];

function setup() {
  
    createCanvas(WIDTH, HEIGHT);
    ball = new Ball();
    
    let size = 50;
    platforms.push(
        new Platform(0, HEIGHT - size, WIDTH, size)
    );
    
    frameRate(FRAMERATE);
    
  
}


function draw() {
  
    background(BACKGROUND);
        
    platforms.forEach(platform => {
        platform.updatePosition(deltaTime);
        if (platform.x + platform.w < 0) {
            platforms.shift(0);
            platforms.push(platform.generateNext());
        }
        platform.draw();
    });
    
    ball.draw();
    
    ball.updatePosition(deltaTime, platforms);
        

}
