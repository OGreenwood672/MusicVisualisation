
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
        // song.pause();
        pausedTime = millis();
    } else {
        // song.play();
        startTime += millis() - pausedTime;
    }

    isPlaying = !isPlaying;
}

function preload() {
    // song = loadSound(`mp3s/${SONG}`);
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

    platforms.push(start_platform.generateNext(song_beats[song_beat_index]));
    song_beat_index++;

    while (
        platforms.length < 2
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

        ball.updatePosition(deltaTime / 1000, platforms);

        platforms.forEach(platform => {

            platform.updatePosition(deltaTime / 1000);

        });

        if (
            platforms[0].x < -1 * PLATFORMWIDTH
        ) {
            platforms.shift(0)
            platforms.push(platforms[platforms.length - 1].generateNext(song_beats[song_beat_index]));
            song_beat_index++;
        }
    }

}
