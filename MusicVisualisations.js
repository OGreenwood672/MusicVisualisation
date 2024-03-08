
let isPlaying = false;
let startTime;
let pausedTime = 0;

let ball;
let platforms = [];

let song;
let song_beats;
let song_beat_index = 0;
let data;

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
    ball = new Ball();
    
    start_platform = new Platform(
        ball.x - PLATFORMWIDTH / 2,
        ball.y - ball.r - PLATFORMHEIGHT,
        PLATFORMWIDTH,
        PLATFORMHEIGHT,
        0,
        0
    );
    console.log("start x", song_beats[song_beat_index]);
    // platforms.push(
    //     new Platform(
    //         0,
    //         HEIGHT - 50,
    //         WIDTH,
    //         50,
    //         0,
    //         0
    //     )
    // );

    platforms.push(start_platform.generateNext(song_beats[song_beat_index]));
    song_beat_index++;

    while (
        platforms.length < 5
    ) {
        console.log("yknow", song_beats[song_beat_index], "bob");
        platforms.push(platforms[platforms.length - 1].generateNext(song_beats[song_beat_index]));
        song_beat_index++;
    }
    
    frameRate(FRAMERATE);

    startTime = millis();
  
}


function draw() {
  
    background(BACKGROUND);
        
    platforms.forEach(platform => {
        platform.draw();
    });
    start_platform.draw();
    
    ball.draw();

    if (isPlaying) {

        updatePosition(deltaTime / 1000, platforms);

        if (
            platforms[0].x < -1 * PLATFORMWIDTH
        ) {
            platforms.shift(0)
            platforms.push(platforms[platforms.length - 1].generateNext(song_beats[song_beat_index]));
            song_beat_index++;
        }
    }

}

function updatePosition(dt, platforms) {
    
    ball.dy += ball.ay * dt;
    
    platforms.forEach(platform => {

        platform.y -= ball.dy * dt;
        platform.x -= ball.dx * dt;

        if (ball.isIntersecting(platform)) {

            let top_difference = Math.abs(ball.y + ball.r - platform.y);
            let bottom_difference = Math.abs(platform.y + platform.h - ball.y + ball.r);

            let leftDifference = Math.abs(ball.x + ball.r - platform.x);
            let rightDifference = Math.abs(platform.x + platform.w - ball.x + ball.r);
            
            let distances = [leftDifference, rightDifference, top_difference, bottom_difference].sort((a, b) => a - b)

            if (distances[0] == leftDifference) {

                platforms.forEach(platform => platform.x += leftDifference);
                ball.dx *= -1;

            } else if (distances[0] == rightDifference) {
                
                platforms.forEach(platform => platform.x += rightDifference)
                ball.dx *= -1;

            } else if (ball.dy > 0) {

                platforms.forEach(platform => platform.y += top_difference)
                ball.dy = hitTop(ball.dy);

            } else {

                platforms.forEach(platform => platform.y -= bottom_difference)
                ball.dy = hitBottom(ball.dy);

            }
        }

    })
}
