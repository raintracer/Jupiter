/**
 * Created by Richard Tyler on 5/24/2017.
 */

function Player(tilelayer, x, y){

    // INHERIT FROM GAMEOBJECT
    GameObject.call(this, tilelayer, x, y);

    let PlayerSpeed = .5;

    // PLAYER UPDATE
    this.playerUpdate = function(){

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

        // AI Test
        let PathArray = [];
        let DesiredPosition = new Coordinate(19,19);
        let CurrentPosition = new Coordinate(,19);


        // RUN STANDARD GAME OBJECT UPDATES
        this.update();

    }

}