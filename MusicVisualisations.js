

let ball;
let platforms = [];

function setup() {
  
    createCanvas(WIDTH, HEIGHT);
    ball = new Ball();
    
    let size = 50;
    platforms.push(
        new Platform(0, HEIGHT - size, WIDTH, size)
    );
    
  
}


function draw() {
  
    background(BACKGROUND);
    ball.draw();
    platforms.forEach(platform => {
        platform.draw();
    });
        
    

}
