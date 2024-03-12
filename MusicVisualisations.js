
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

let chunks = [];
let recorder;

function mousePressed() {
    if (isPlaying) {
        song.pause();
        pausedTime = millis();
        recorder.stop();
    } else {
        song.play();
        startTime += millis() - pausedTime;
        record();
    }

    isPlaying = !isPlaying;
}

function record() {
    chunks.length = 0;
    let stream = document.querySelector('canvas').captureStream(60);
    recorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9"
    });

    recorder.ondataavailable = e => {
        if (e.data.size) {
            chunks.push(e.data);
        }
    };

    recorder.onstop = exportVideo;
    recorder.start();
}

function exportVideo(e) {
    const blob = new Blob(chunks, {type: "video/webm"});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${SONG}.webm`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}
  

function preload() {
    song = loadSound(`mp3s/${SONG}.mp3`);
    data = loadJSON("songs.json");
}

function setup() {

    song_beats = data[`${SONG}.mp3`];

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
            platforms[platforms.length - 1].x < WIDTH /// 2 - PLATFORMWIDTH
        ) {
            platform = platforms[platforms.length - 1].generateNext(song_beats[song_beat_index], totalx);
            song_beat_index++;
            while (Math.abs(platform.exit_velocity) < 0.1) {
                platform = platforms[platforms.length - 1].generateNext(song_beats[song_beat_index], totalx);
                song_beat_index++;
            }
            platforms.push(platform)
        }

        if (
            platforms.length > 0 &&
            platforms[0].x < -1 * PLATFORMWIDTH
        ) {
            platforms.shift(0);
        }

        ball.past_lives.push([
            ball.x,
            ball.y,
            ball.past_lives.length > 0 ? (ball.past_lives[ball.past_lives.length - 1][2] + 1) % TRAILLENGTH : 0]
        );
        while (ball.past_lives.length > TRAILLENGTH) {
            ball.past_lives.shift(0);
        }

        if ((millis() - startTime) / 1000 > song_beats[song_beats.length - 1] + 5) {
            recorder.stop();
        }

    }

}

function updatePosition(dt, platforms) {
    
    ball.dy += ball.ay * dt;
    totalx += ball.dx * dt;

    ball.past_lives.forEach(b => {
        b[0] -= ball.dx * dt;
        b[1] -= ball.dy * dt;
    });
    
    platforms.forEach(platform => {

        platform.y -= ball.dy * dt;
        platform.x -= ball.dx * dt; 

        if (ball.isIntersecting(platform)) {

            let top_difference = Math.abs(ball.y + ball.r - platform.y);
            let bottom_difference = Math.abs(platform.y + platform.h - ball.y + ball.r);

            // let leftDifference = Math.abs(ball.x + ball.r - platform.x);
            // let rightDifference = Math.abs(platform.x + platform.w - ball.x + ball.r);
            
            // let distances = [leftDifference, rightDifference, top_difference, bottom_difference].sort((a, b) => a - b)
            
            // if (distances[0] == leftDifference) {

            //     platforms.forEach(p => p.x += leftDifference);
            //     ball.dx *= -1;

            // } else if (distances[0] == rightDifference) {
                
            //     platforms.forEach(p => p.x += rightDifference)
            //     ball.dx *= -1;

            // } else 
            if (ball.dy >= 0) {

                platforms.forEach(p => {
                    p.y += top_difference;
                });
                ball.dy = platform.exit_velocity;

            } else {
                // Hits block while still going up, but will go down onto block after 
                if (platform.exit_velocity < 0) { return; }

                platforms.forEach(p => {
                    p.y -= bottom_difference;
                });
                ball.dy = platform.exit_velocity;

            }
        }

    })
}
