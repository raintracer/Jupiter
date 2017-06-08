/**
 * Created by Richard Tyler on 5/27/2017.
 */

function Pathfinder(parent, tilemap){

    this.parent = parent;
    this.tilemap = tilemap;

    // HOLDS ALL OF THE POSSIBLE PATHS
    let SearchArray = [];

    // RETURNS A PATH TO THE DESIRED COORDINATES
    this.resolvePath = function(CurrentPosition, DesiredPosition){

        // CAPTURE THE TILE BLOCK ARRAY
        let BlockArray = [];
        let BlockColumn = [];
        for (let i = 0; i < this.tilemap.w; i++){
            for (let j = 0; j < this.tilemap.h; j++){
                BlockColumn.push(this.tilemap.isTileBlocked(i,j));
            }
            BlockArray.push(BlockColumn);
            BlockColumn = [];
        }

        // CHECK FOR A STRAIGHT LINE PATH

        // DEFINE A STRAIGHT LINE
        let m = (DesiredPosition.y - CurrentPosition.y) / (DesiredPosition.x - CurrentPosition.x);
        let b = (DesiredPosition.y + TILE_HEIGHT/2) - m * (DesiredPosition.x + TILE_WIDTH/2);

        // DEFINE A STRAIGHT LINE PATH OBJECT
        let straightPath = new Path();
        straightPath.addCoordinate(CurrentPosition.x, CurrentPosition.y);
        let activeCoordinate = new Coordinate(0,0);
        let disabledDirection;
        let x;
        let y;
        let xDir;
        let yDir;

        if (CurrentPosition.x < DesiredPosition.x){
            xDir = 1;
        } else{
            xDir = -1;
        }

        if (CurrentPosition.y < DesiredPosition.y){
            yDir = 1;
        } else{
            yDir = -1;
        }

        while(1) {

            // CHECK EVERY SIDE OF THE ACTIVE COORDINATE TILE FOR LINE INTERSECTION
            activeCoordinate.copyCoordinate(straightPath.endCoordinate());

            // CHECK LEFT SIDE
            if (xDir === -1) {
                x = activeCoordinate.x * TILE_WIDTH;
                y = m * x + b;
                if (y >= (activeCoordinate.y * TILE_HEIGHT) && y <= ((activeCoordinate.y + 1) * TILE_HEIGHT)) {
                    // INTERSECTION AT LEFT EDGE
                    straightPath.addCoordinate(activeCoordinate.x - 1, activeCoordinate.y);
                }
            }

            // CHECK RIGHT SIDE
            if (xDir === 1) {
                x = (activeCoordinate.x + 1) * TILE_WIDTH;
                y = m * x + b;
                if (y >= (activeCoordinate.y * TILE_HEIGHT) && y <= ((activeCoordinate.y + 1) * TILE_HEIGHT)) {
                    // INTERSECTION AT RIGHT EDGE
                    straightPath.addCoordinate(activeCoordinate.x + 1, activeCoordinate.y);
                }
            }

            // CHECK TOP SIDE
            if (yDir === -1) {
                y = (activeCoordinate.y) * TILE_WIDTH;
                x = (y - b) / m;
                if (x >= (activeCoordinate.x * TILE_WIDTH) && x <= ((activeCoordinate.x + 1) * TILE_WIDTH)) {
                    // INTERSECTION AT TOP EDGE
                    straightPath.addCoordinate(activeCoordinate.x, activeCoordinate.y - 1);
                }
            }

            // CHECK BOTTOM SIDE
            if (yDir === 1) {
                y = (activeCoordinate.y + 1) * TILE_WIDTH;
                x = (y - b) / m;
                if (x >= (activeCoordinate.x * TILE_WIDTH) && x <= ((activeCoordinate.x + 1) * TILE_WIDTH)) {
                    // INTERSECTION AT BOTTOM EDGE
                    straightPath.addCoordinate(activeCoordinate.x, activeCoordinate.y + 1);
                }
            }

            console.log(activeCoordinate);

            // IF THE NEXT COORDINATE IS BLOCKED, ABORT THE OPERATION
            if (tilemap.isTileBlockedAtCoordinate(straightPath.endCoordinate().x, straightPath.endCoordinate().y)){
                break;
            }

            // IF THE DESTINATION HAS BEEN FOUND
            if(straightPath.endCoordinate().x === DesiredPosition.x && straightPath.endCoordinate().y === DesiredPosition.y){
                return straightPath;
            }

            // IF THE NEW COORDINATE IS THE SAME AS THE LAST
            if (straightPath.endCoordinate().matchesCoordinate(activeCoordinate)){
                break;
            }

        }

        // IF A STRAIGHT PATH ISN'T FOUND, USE THE SNAKE PATH SEARCH

        // INITIATE THE SEARCH ARRAY
        SearchArray.push(new Path());

        // ADD THE STARTING COORDINATE
        SearchArray[0].addCoordinate(CurrentPosition.x, CurrentPosition.y);

        // LOOP THROUGH THE PATHS
        let resolution = false;
        while (resolution === false) {

            // PULL THE PROPERTIES OF THE FIRST PATH FOR READABILITY
            let x = SearchArray[0].endCoordinate().x;
            let y = SearchArray[0].endCoordinate().y;

            // CHECK FOR A MATCH WITH THE DESIRED POSITION
            if (x === DesiredPosition.x && y === DesiredPosition.y) {

                // RETURN THE CURRENT SEARCH PATH, WHICH IS A SUCCESSFUL PATH
                return SearchArray[0];
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
                if (x < this.tilemap.w-1) {
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
                if (y < this.tilemap.h-1) {
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
                SearchArray.shift();

                // CHECK FOR AN EMPTY ARRAY WHICH SIGNIFIES THAT THE PATHING FAILED
                if (SearchArray.length === 0){

                    // NO PATHING IS POSSIBLE, RETURN THE CURRENT POSITION
                    let FailPath = new Path();
                    FailPath.addCoordinate(CurrentPosition.x, CurrentPosition.y);
                    return FailPath;
                }

            }
        }

    }

}