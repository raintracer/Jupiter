/**
 * Created by Richard Tyler on 5/24/2017.
 */

function Player(tilelayer, x, y){

    // INHERIT FROM GAMEOBJECT
    GameObject.call(this, tilelayer, x, y);

    const AI_SPEED = .2;
    let PlayerSpeed = .5;
    let time = 0;

    // PLAYER UPDATE
    this.playerUpdate = function(){

        // TEST ANIMATE THE PLAYER THROUGH THE PATH
        let frame = (time % this.path.PathArray.length);
        this.alignLeftEdge(this.path.PathArray[frame].x*TILE_WIDTH);
        this.alignTopEdge(this.path.PathArray[frame].y*TILE_HEIGHT);
        time++;

        // CHECK FOR KEY PRESSES
        if (keyIsDown(LEFT_ARROW)){
            this.accelerate(-PlayerSpeed,0);
        }
        else if (keyIsDown(RIGHT_ARROW)){
            this.accelerate(PlayerSpeed,0);
        }
        if (keyIsDown(UP_ARROW)){
            this.accelerate(0, -PlayerSpeed);
        }
        else if (keyIsDown(DOWN_ARROW)){
            this.accelerate(0, PlayerSpeed);
        }

        this.floatToTileCenter();

        // RUN STANDARD GAME OBJECT UPDATES
        this.update();

    };

    // TEST RESOLVE PATH TO BOTTOM RIGHT OF SCREEN
    this.playerSetup = function(){
        let pathfind = new Pathfinder(this, this.tile_layer);
        this.path.loadPath(pathfind.resolvePath(this.getTilePosition(), new Coordinate(19,19)));
    }

}