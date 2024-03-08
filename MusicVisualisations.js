
let isPlaying = false;
let startTime;
let pausedTime = 0;
let lastUpdate = 0;

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
        lastUpdate = millis();
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

    platforms.push(start_platform.generateNext(song_beats[song_beat_index], 0, startTime));
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

        updatePosition((millis() - lastUpdate) / 1000, platforms);

        while (
            platforms[platforms.length - 1].x < WIDTH
        ) {
            platforms.push(platforms[platforms.length - 1].generateNext(song_beats[song_beat_index], totalx, startTime));
            song_beat_index++;
        }
        lastUpdate = millis();

    }

}

function updatePosition(dt, platforms) {
    
    ball.dy += ball.ay * dt;
    totalx += ball.dx * dt;
    
    platforms.forEach(platform => {

        platform.y -= ball.dy * dt;
        platform.x -= ball.dx * dt;

        if (ball.isIntersecting(platform)) {

            let top_difference = Math.abs(ball.y + ball.r - platform.y);
            let bottom_difference = Math.abs(platform.y + platform.h - ball.y + ball.r);

            let leftDifference = Math.abs(ball.x + ball.r - platform.x);
            let rightDifference = Math.abs(platform.x + platform.w - ball.x + ball.r);
            
            let distances = [leftDifference, rightDifference, top_difference, bottom_difference].sort((a, b) => a - b)
            
            console.log(platform.time, (millis() - startTime) / 1000, (millis() - startTime) / 1000 - platform.time);

            if (distances[0] == leftDifference) {

                platforms.forEach(p => p.x += leftDifference);
                ball.dx *= -1;

            } else if (distances[0] == rightDifference) {
                
                platforms.forEach(p => p.x += rightDifference)
                ball.dx *= -1;

            } else if (ball.dy > 0) {

                platforms.forEach(p => {
                    p.y += top_difference;
                    // p.x += ball.x - (platform.x + platform.w / 2)
                });
                ball.dy = platform.exit_velocity;

            } else {

                platforms.forEach(p => p.y -= bottom_difference);
                ball.dy = platform.exit_velocity;

            }
        }

    })
}
