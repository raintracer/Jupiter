/**
 * Created by Richard Tyler on 5/27/2017.
 */

function Pathfinder(parent, tilelayer){

    this.parent = parent;
    this.tilelayer = tilelayer;

    // RETURNS A PATH TO THE DESIRED COORDINATES
    this.resolvePath = function(CurrentPosition, DesiredPosition){

        // HOLDS ALL OF THE POSSIBLE PATHS
        let SearchArray = [];

        // CAPTURE THE TILE BLOCK ARRAY
        let BlockArray = [];
        let BlockColumn = [];
        for (let i = 0; i < this.tilelayer.w; i++){
            for (let j = 0; j < this.tilelayer.h; j++){
                BlockColumn.push(this.tilelayer.isTileBlocked(i,j));
            }
            BlockArray.push(BlockColumn);
            BlockColumn = [];
        }

        // INITIATE THE SEARCH ARRAY
        SearchArray.push(new Path());

        // LOOP THROUGH THE PATHS
        let resolution = false;
        while (resolution === false) {

            // PULL THE PROPERTIES OF THE FIRST PATH FOR READABILITY
            let x = SearchArray[0].endCoordinate().x;
            let y = SearchArray[0].endCoordinate().y;
            let parentPath = SearchArray[0].endCoordinate().parentPath;

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

                        // COPY THE CURRENT SEARCH PATH TO A NEW SEARCH PATH AND ADD A NEW COORDINATE BASED ON THE PARENT AND DIRECTION
                        SearchArray.push(new Path());
                        SearchArray[SearchArray.length-1].loadPath(SearchArray[0]);
                        if (parentPath = "None") {
                            SearchArray[SearchArray.length-1].addCoordinate(x - 1, y, "Left")
                        } else {
                            SearchArray[SearchArray.length-1].addCoordinate(x - 1, y, parentPath)
                        }

                        // PREVENT THIS NEW COORDINATE FROM BEING ADDED TO ANOTHER PATH
                        BlockArray[x - 1][y] = 1;

                    }
                }

                // ADD RIGHT IF NOT BLOCKED OR ELIMINATED
                if (x < 19) {
                    if (BlockArray[x + 1][y] === 0) {

                        // COPY THE CURRENT SEARCH PATH TO A NEW SEARCH PATH AND ADD A NEW COORDINATE BASED ON THE PARENT AND DIRECTION
                        SearchArray.push(new Path());
                        SearchArray[SearchArray.length-1].loadPath(SearchArray[0]);
                        if (parentPath = "None") {
                            SearchArray[SearchArray.length-1].addCoordinate(x + 1, y, "Right")
                        } else {
                            SearchArray[SearchArray.length-1].addCoordinate(x + 1, y, parentPath)
                        }

                        // PREVENT THIS NEW COORDINATE FROM BEING ADDED TO ANOTHER PATH
                        BlockArray[x + 1][y] = 1;

                    }
                }

                // ADD UP IF NOT BLOCKED OR ELIMINATED
                if (y > 0) {
                    if (BlockArray[x][y-1] === 0) {

                        // COPY THE CURRENT SEARCH PATH TO A NEW SEARCH PATH AND ADD A NEW COORDINATE BASED ON THE PARENT AND DIRECTION
                        SearchArray.push(new Path());
                        SearchArray[SearchArray.length-1].loadPath(SearchArray[0]);
                        if (parentPath = "None") {
                            SearchArray[SearchArray.length-1].addCoordinate(x, y-1, "Up")
                        } else {
                            SearchArray[SearchArray.length-1].addCoordinate(x, y-1, parentPath)
                        }

                        // PREVENT THIS NEW COORDINATE FROM BEING ADDED TO ANOTHER PATH
                        BlockArray[x][y-1] = 1;
                    }
                }

                // ADD DOWN IF NOT BLOCKED OR ELIMINATED
                if (y < 19) {
                    if (BlockArray[x][y+1] === 0) {

                        // COPY THE CURRENT SEARCH PATH TO A NEW SEARCH PATH AND ADD A NEW COORDINATE BASED ON THE PARENT AND DIRECTION
                        SearchArray.push(new Path());
                        SearchArray[SearchArray.length-1].loadPath(SearchArray[0]);
                        if (parentPath = "None") {
                            SearchArray[SearchArray.length-1].addCoordinate(x, y+1, "Down")
                        } else {
                            SearchArray[SearchArray.length-1].addCoordinate(x, y+1, parentPath)
                        }

                        // PREVENT THIS NEW COORDINATE FROM BEING ADDED TO ANOTHER PATH
                        BlockArray[x][y+1] = 1;

                    }
                }

                // SHIFT THE PATH ARRAY TO LOAD THE NEXT POSSIBLE PATH
                PathArray.shift();

            }
        }

    }

}