/**
 * Created by Richard Tyler on 5/24/2017.
 */

function Player(tilelayer, x, y){

    // INHERIT FROM GAMEOBJECT
    GameObject.call(this, tilelayer, x, y);

    const AI_SPEED = .2;
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

        // CAPTURE THE TILE BLOCK ARRAY
        let BlockArray = [];
        let BlockColumn = [];
        for (let i = 0; i < this.tile_layer.w; i++){
            for (let j = 0; j < this.tile_layer.h; j++){
                BlockColumn.push(this.tile_layer.isTileBlocked(i,j));
            }
            BlockArray.push(BlockColumn);
            BlockColumn = [];
        }

        // for (let i = 0; i < this.tile_layer.w; i++){
        //     for (let j = 0; j < this.tile_layer.h; j++){
        //         console.log(BlockArray[i][j]);
        //     }
        // }

        // INITIATE THE PATH ARRAY
        PathArray.push(this.tilePosition);

        console.log(PathArray[0].x);
        console.log(PathArray[0].y);

        // ADD PATH PROPERTIES
        PathArray[0].parentPath = "None";
        PathArray[0].distance = 0;

        //console.log("Down: " + BlockArray[PathArray[0].x][PathArray[0].y+1]);

        // LOOP THROUGH THE PATHS
        let resolution = false;
        while (resolution === false) {

            // PULL THE PROPERTIES OF THE FIRST PATH FOR READABILITY
            let x = PathArray[0].x;
            let y = PathArray[0].y;
            let parentPath = PathArray[0].parentPath;
            let distance = PathArray[0].distance;

            console.log(x);
            console.log(y);
            console.log(parentPath);
            console.log(distance);

            // CHECK FOR A MATCH WITH THE DESIRED POSITION
            if (x === DesiredPosition.x && y === DesiredPosition.y) {

                resolution = true;
                switch (parentPath) {
                    case "None":
                        // DO NOTHING, THE OBJECT IS IN THE DESIRED POSITION
                        break;
                    case "Up":
                        this.accelerate(0, -AI_SPEED);
                        console.log("Path Resolved: UP");
                        break;
                    case "Down":
                        this.accelerate(0, AI_SPEED);
                        console.log("Path Resolved: DOWN");
                        break;
                    case "Left":
                        this.accelerate(-AI_SPEED, 0);
                        console.log("Path Resolved: LEFT");
                        break;
                    case "Right":
                        this.accelerate(AI_SPEED, 0);
                        console.log("Path Resolved: RIGHT");
                        break;
                }

                alert (parentPath);
                // END THE LOOP
                break;
            }
            else{
                // IF THERE IS NO MATCH, GENERATE NEW POSSIBLE PATHS ABOVE, BELOW, LEFT AND RIGHT.
                // ELIMINATE THE CURRENT PATH AS AN OPTION
                BlockArray[x][y] = 1;
                // console.log(BlockArray[x][y]);

                // ADD LEFT IF NOT BLOCKED OR ELIMINATED
                if (x > 0) {
                    if (BlockArray[x - 1][y] === 0) {
                        PathArray.push(new Coordinate(x - 1, y));
                        PathArray[PathArray.length - 1].distance = distance + 1;
                        if (parentPath = "None") {
                            PathArray[PathArray.length - 1].parentPath = "Left";
                        } else {
                            PathArray[PathArray.length - 1].parentPath = parentPath;
                        }
                        BlockArray[x - 1][y] = 1;
                        // console.log("New Path Generated at " + (x-1) + ", " + y);

                    }
                }

                // ADD RIGHT IF NOT BLOCKED OR ELIMINATED
                if (x < 19) {
                    if (BlockArray[x + 1][y] === 0) {
                        PathArray.push(new Coordinate(x + 1, y));
                        PathArray[PathArray.length - 1].distance = distance + 1;
                        if (parentPath = "None") {
                            PathArray[PathArray.length - 1].parentPath = "Right";
                        } else {
                            PathArray[PathArray.length - 1].parentPath = parentPath;
                        }
                        BlockArray[x + 1][y] = 1;
                        // console.log("New Path Generated at " + (x+1) + ", " + y);

                    }
                }

                // ADD UP IF NOT BLOCKED OR ELIMINATED
                if (y > 0) {
                    if (BlockArray[x][y-1] === 0) {
                        PathArray.push(new Coordinate(x, y-1));
                        PathArray[PathArray.length - 1].distance = distance + 1;
                        if (parentPath = "None") {
                            PathArray[PathArray.length - 1].parentPath = "Up";
                        } else {
                            PathArray[PathArray.length - 1].parentPath = parentPath;
                        }
                        BlockArray[x][y-1] = 1;
                        // console.log("New Path Generated at " + (x) + ", " + (y-1));
                    }
                }

                // ADD DOWN IF NOT BLOCKED OR ELIMINATED
                if (y < 19) {
                    if (BlockArray[x][y+1] === 0) {
                        PathArray.push(new Coordinate(x, y+1));
                        PathArray[PathArray.length - 1].distance = distance + 1;
                        if (parentPath = "None") {
                            PathArray[PathArray.length - 1].parentPath = "Down";
                        } else {
                            PathArray[PathArray.length - 1].parentPath = parentPath;
                        }
                        BlockArray[x][y+1] = 1;
                        // console.log("New Path Generated at " + (x) + ", " + (y+1));

                    }
                }

                // SHIFT THE PATH ARRAY TO LOAD THE NEXT POSSIBLE PATH
                PathArray.shift();

            }
        }

        this.floatToTileCenter();

        // RUN STANDARD GAME OBJECT UPDATES
        this.update();

    }

}