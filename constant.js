


const WIDTH = 1500;
const HEIGHT = 900;

const FRAMERATE = 100;

// const SONG = "beat";
// const SONG = "past_lives";
// const SONG = "dont let me down";
// const SONG = "Under my Skin";
// const SONG = "Jungle Book";
const SONG = "wii";
// const SONG = "winter";

// VISUALS

const BALLRADIUS = 12;
const TRAILLENGTH = 28;

//Colour Schemes

const BACKGROUND = [34, 34, 34, 255];
const BALLCOLOUR = 255;
const PLATFORMCOLOUR = [210, 209, 209, 255];

const TRAILCOLOURS = [
    [255,0,0,255],
    [255,0,50,255],
    [255,0,100,255],
    [255,0,150,255],
    [255,0,200,255],
    [255,0,255,255],
    [200,0,255,255],
    [150,0,255,255],
    [100,0,255,255],
    [50,0,255,255],
    [0,0,255,255],
    [0,50,255,255],
    [0,100,255,255],
    [0,150,255,255],
    [0,200,255,255],
    [0,255,255,255],
    [0,255,200,255],
    [0,255,150,255],
    [0,255,100,255],
    [0,255,50,255],
    [0,255,0,255],
    [50,255,0,255],
    [100,255,0,255],
    [150,255,0,255],
    [200,255,0,255],
    [255,255,0,255],
    [255,200,0,255],
    [255,150,0,255],
    [255,100,0,255],
    [255,50,0,255],
]

// PLATFORMS
const PLATFORMHEIGHT = 800;
const PLATFORMWIDTH = 4;

// PHYSICS

const GRAVITY = 900;

const VELOCITY = 300;

const hitBottom = v => -1 * Math.pow(v, 0.9);
const hitTop = v => -1 * v;

