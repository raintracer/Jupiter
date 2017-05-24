// GLOBAL VARIABLES
let canvas;
let game;
let tilelibrary;

// GLOBAL CONSTANTS
const STAGE_WIDTH = 800, STAGE_HEIGHT = 800;
const TILE_WIDTH = 40, TILE_HEIGHT = 40;

// TILE DATA
const TILE_BLOCK_ARRAY = [1, 0];

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
    game.scene.tilemap.draw();
    noLoop()

}