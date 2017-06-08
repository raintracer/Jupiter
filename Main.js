// GLOBAL VARIABLES
let canvas;
let game;
let sprite;

// GLOBAL CONSTANTS
const STAGE_WIDTH = 600, STAGE_HEIGHT = 600;
const TILE_WIDTH = 30, TILE_HEIGHT = 30;
const FRICTION = .9,  STATIC_FRICTION = .2;
const SHOW_PATHING = true;

// TILE DATA
let TILE_GRAPHIC_ARRAY = [];
const TILE_BLOCK_ARRAY  = [0,   1,   1,   1,   1];

// RUNS BEFORE STARTUP
function preload(){

    sprite = createGraphics(96, 128);
    sprite.loadImage("assets/kittysprites.png");

}

// RUNS ON STARTUP
function setup(){

    // TILE GRAPHIC DATA
    for (let i =0; i < 5; i++){
        TILE_GRAPHIC_ARRAY.push(createGraphics(TILE_WIDTH, TILE_HEIGHT));
    }

    TILE_GRAPHIC_ARRAY[0].fill(0,0,0);
    TILE_GRAPHIC_ARRAY[0].noStroke();
    TILE_GRAPHIC_ARRAY[0].rect(0, 0, TILE_WIDTH+1, TILE_HEIGHT+1);

    TILE_GRAPHIC_ARRAY[1].fill(150,150,150);
    TILE_GRAPHIC_ARRAY[1].noStroke();
    TILE_GRAPHIC_ARRAY[1].rect(0, 0, TILE_WIDTH+1, TILE_HEIGHT+1);

    TILE_GRAPHIC_ARRAY[2].fill(100,0,0);
    TILE_GRAPHIC_ARRAY[2].noStroke();
    TILE_GRAPHIC_ARRAY[2].rect(0, 0, TILE_WIDTH+1, TILE_HEIGHT+1);

    TILE_GRAPHIC_ARRAY[3].fill(0,100,0);
    TILE_GRAPHIC_ARRAY[3].noStroke();
    TILE_GRAPHIC_ARRAY[3].rect(0, 0, TILE_WIDTH+1, TILE_HEIGHT+1);

    TILE_GRAPHIC_ARRAY[4].fill(0,0,100);
    TILE_GRAPHIC_ARRAY[4].noStroke();
    TILE_GRAPHIC_ARRAY[4].rect(0, 0, TILE_WIDTH+1, TILE_HEIGHT+1);

    // DRAW THE STAGE
    canvas = createCanvas(STAGE_WIDTH, STAGE_HEIGHT);

    // INITIALIZE THE GAME
    game = new Game();
    background(0);
}

// RUNS EVERY FRAME
function draw(){

    // background(0,0,0,100);
    background(40,40,40);
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