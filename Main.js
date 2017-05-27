// GLOBAL VARIABLES
let canvas;
let game;

// GLOBAL CONSTANTS
const STAGE_WIDTH = 600, STAGE_HEIGHT = 600;
const TILE_WIDTH = 30, TILE_HEIGHT = 30;
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

    // TESTING A SINGLE FRAME
    // noLoop();

}

function mousePressed(){
    let tileX = Math.floor(mouseX/TILE_WIDTH);
    let tileY = Math.floor(mouseY/TILE_HEIGHT);
    game.scene.player.setPathTarget(new Coordinate(tileX, tileY));
}