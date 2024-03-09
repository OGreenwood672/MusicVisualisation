


const WIDTH = 900;
const HEIGHT = 600;

const FRAMERATE = 100;

// const SONG = "beat.mp3";
// const SONG = "made-up.mp3";
// const SONG = "past_lives.mp3";
// const SONG = "dont let me down.mp3";
// const SONG = "Under my Skin.mp3";
const SONG = "Jungle Book.mp3";

// VISUALS

const BALLRADIUS = 15;

//Colour Schemes

const BACKGROUND = 10;
const BALLCOLOUR = 255;
const PLATFORMCOLOUR = [150, 10, 15, 255];


// PLATFORMS
const PLATFORMHEIGHT = 50;
const PLATFORMWIDTH = 35;

// PHYSICS

const GRAVITY = 900;

const VELOCITY = 300;

const hitBottom = v => -1 * Math.pow(v, 0.9);
const hitTop = v => -1 * v;

