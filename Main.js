// GLOBAL VARIABLES
let canvas;
let game;

// GLOBAL CONSTANTS
const STAGE_WIDTH = 600, STAGE_HEIGHT = 500;
const TILE_WIDTH = 40, TILE_HEIGHT = 40;
const FRICTION = .9,  STATIC_FRICTION = .2;

// TILE DATA
const TILE_BLOCK_ARRAY = [0, 1];

// RUNS BEFORE STARTUP
function preload(){

}

// RUNS ON STARTUP
function setup(){

    // DRAW THE STAGE
    canvas = createCanvas(STAGE_WIDTH, STAGE_HEIGHT);

    // INITIALIZE THE GAME
    game = new Game();

}

// RUNS EVERY FRAME
function draw(){

    background(0);
    game.update();

}