/**
 * Created by Richard Tyler on 5/24/2017.
 */

function Player(tilemap, id, x, y){

    // INHERIT FROM GAMEOBJECT
    GameObject.call(this, tilemap, id, x, y);

    const AI_SPEED = .2;
    let PlayerSpeed = .5;
    let time = 0;

    // PLAYER UPDATE
    this.update = function(){

        // TEST ANIMATE THE PLAYER THROUGH THE PATH
        // let frame = (time % this.path.PathArray.length);
        // this.alignLeftEdge(this.path.PathArray[frame].x*TILE_WIDTH);
        // this.alignTopEdge(this.path.PathArray[frame].y*TILE_HEIGHT);
        // time++;

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

        // RUN STANDARD GAME OBJECT UPDATES
        this.move();

    };

}