


const WIDTH = 1000;
const HEIGHT = 650;

const FRAMERATE = 60;

const SONG = "beat.mp3";
// const SONG = "made-up.mp3";
// const SONG = "past_lives.mp3";
// VISUALS

const BALLRADIUS = 18;

//Colour Schemes

const BACKGROUND = 10;
const BALLCOLOUR = 255;
const PLATFORMCOLOUR = [150, 10, 15, 255];


// PLATFORMS
const PLATFORMHEIGHT = 100;
const PLATFORMWIDTH = 100;

// PHYSICS

const GRAVITY = 500;

const VELOCITY = 300;

const hitBottom = v => -1 * Math.pow(v, 0.9);
const hitTop = v => -1 * v;

