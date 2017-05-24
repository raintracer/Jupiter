// GLOBAL VARIABLES
let canvas;

// GLOBAL CONSTANTS
const STAGE_WIDTH = 600, STAGE_HEIGHT = 600;
const TILE_WIDTH = 40, TILE_HEIGHT = 40;

// RUNS BEFORE STARTUP
function preload(){
}

// RUNS ON STARTUP
function setup(){

    // DRAW THE STAGE
    canvas = createCanvas(STAGE_WIDTH, STAGE_HEIGHT);

    // INITIALIZE THE GAME
    let game = new Game();

}

// RUNS EVERY FRAME
function draw(){

    background(0);

}