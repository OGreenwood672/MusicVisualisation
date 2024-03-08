
let isPlaying = false;
let startTime;
let pausedTime = 0;

let ball;
let platforms = [];

let song;
let song_beats;
let song_beat_index = 0;
let data;

let totalx = 0;

function mousePressed() {
    if (isPlaying) {
        song.pause();
        pausedTime = millis();
    } else {
        song.play();
        startTime += millis() - pausedTime;
    }

    isPlaying = !isPlaying;
}

function preload() {
    song = loadSound(`mp3s/${SONG}`);
    data = loadJSON("songs.json");
}

function setup() {

    song_beats = data[SONG];

    createCanvas(WIDTH, HEIGHT);
    startTime = millis();

    ball = new Ball();
    
    start_platform = new Platform(
        ball.x - PLATFORMWIDTH / 2,
        ball.y - ball.r - PLATFORMHEIGHT,
        PLATFORMWIDTH,
        PLATFORMHEIGHT,
        0,
        0
    );

    platforms.push(start_platform.generateNext(song_beats[song_beat_index], 0));
    song_beat_index++;
    
    frameRate(FRAMERATE);
  
}


function draw() {
  
    background(BACKGROUND);
        
    platforms.forEach(platform => {
        platform.draw();
    });
    
    ball.draw();

    if (isPlaying) {

        updatePosition(deltaTime / 1000, platforms);

        if (
            platforms[platforms.length - 1].x < WIDTH / 2 - PLATFORMWIDTH
        ) {
            platforms.push(platforms[platforms.length - 1].generateNext(song_beats[song_beat_index], totalx));
            song_beat_index++;
        }
        if (
            platforms.length > 0 &&
            platforms[0].x < -1 * PLATFORMWIDTH
        ) {
            platforms.shift(0);
        }

    }

}

function updatePosition(dt, platforms) {
    
    ball.dy += ball.ay * dt;
    totalx += ball.dx * dt;
    
    platforms.forEach(platform => {

        platform.y -= ball.dy * dt;
        platform.x -= ball.dx * dt; 

        if (ball.isIntersecting(platform)) {
            // console.log("time:", platform.time, "actual:", (millis() - startTime) / 1000)

            let top_difference = Math.abs(ball.y + ball.r - platform.y);
            let bottom_difference = Math.abs(platform.y + platform.h - ball.y + ball.r);

            let leftDifference = Math.abs(ball.x + ball.r - platform.x);
            let rightDifference = Math.abs(platform.x + platform.w - ball.x + ball.r);
            
            let distances = [leftDifference, rightDifference, top_difference, bottom_difference].sort((a, b) => a - b)
            
            // console.log(platform.time, (millis() - startTime) / 1000, (millis() - startTime) / 1000 - platform.time);

            if (distances[0] == leftDifference) {

                platforms.forEach(p => p.x += leftDifference);
                ball.dx *= -1;

            } else if (distances[0] == rightDifference) {
                
                platforms.forEach(p => p.x += rightDifference)
                ball.dx *= -1;

            } else 
            if (ball.dy >= 0) {

                platforms.forEach(p => {
                    p.y += top_difference;
                    // if (!platform.landed) { p.x += ball.x - (platform.x + platform.w / 2); }
                });
                ball.dy = platform.exit_velocity;


            } else {
                // Hits block while still going up, but will go down onto block after 
                if (platform.exit_velocity < 0) { return; } 

                platforms.forEach(p => {
                    p.y -= bottom_difference;
                    // if (!platform.landed) { p.x += ball.x - (platform.x + platform.w / 2); }
                });
                ball.dy = platform.exit_velocity;

            }
            platform.landed = true;
        }

    })
}
