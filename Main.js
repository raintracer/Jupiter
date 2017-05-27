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
    game.mouseClicked(mouseX, mouseY);
}


// FUNCTIONS TO CONVERT BETWEEN DIFFERENT COORDINATE SYSTEMS

function pixelsToTileX(x){
    return Math.floor(x / TILE_WIDTH);
}

function pixelsToTileY(y){
    return Math.floor(y / TILE_HEIGHT);
}

function pixelsToCoordinate(x,y){
    return new Coordinate(pixelsToTileX(x), pixelsToTileY(y));
}

function tileToPixelsX(tileX){
    return tileX * TILE_WIDTH + TILE_WIDTH / 2;
}

function tileToPixelsY(tileY){
    return tileY * TILE_HEIGHT + TILE_HEIGHT / 2;
}