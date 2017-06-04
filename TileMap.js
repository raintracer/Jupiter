/**
 * Created by Richard Tyler on 5/24/2017.
 */

function TileMap(w,h){

    this.w = w;
    this.h = h;

    this.width = this.w * TILE_WIDTH;
    this.height = this.h * TILE_HEIGHT;

    this.TileArray = [];

    // BUILD A RANDOM TILE MAP
    this.buildMap = function(){

        let TileColumn = [];

        // FOR EACH COLUMN IN THE TILE MAP ARRAY
        for(let i = 0; i < this.w; i++) {

            // FOR EACH ROW IN THE TILE MAP ARRAY
            for(let j = 0; j < this.h; j++) {

                // PUSH A RANDOM VALUE ONTO THE TILE COLUMN
                TileColumn.push(Math.ceil(Math.random()*5)-1);
            }

            // PUSH THE TILE COLUMN TO THE TILE MAP ARRAY
            this.TileArray.push(TileColumn);
            TileColumn = [];

        }

        // CARVE A RANDOM PATH FROM THE TOP LEFT CORNER TO THE BOTTOM RIGHT
        let i = 0;
        let j = 0;
        let choice;
        while (i!==(this.w-1) || j!==(this.h-1)){
            // alert( i + "-" + j)
            choice = Math.ceil(Math.random()*3.99);
            switch (choice){
                case 1:
                    i++;
                    break;
                case 2:
                    j++;
                    break;
                case 3:
                    i--;
                    break;
                case 4:
                    j--;
                    break;

            }

            if(i<0){
                i=0;
            }
            if(j<0){
                j=0;
            }
            if(i>this.w-1){
                i=this.w-1;
            }
            if(j>this.h-1){
                j=this.h-1;
            }

            this.TileArray[i][j] = 0;
        }

    };

    // DRAW THE TILE MAP
    this.draw = function(gameCamera){

        // DETERMINE WHICH TILES ARE VISIBLE ON THE STAGE
        let screenLeftTile = pixelsToTileX(gameCamera.screenLeftEdge());
        let screenRightTile = pixelsToTileX(gameCamera.screenRightEdge());
        let screenTopTile = pixelsToTileY(gameCamera.screenTopEdge());
        let screenBottomTile = pixelsToTileY(gameCamera.screenBottomEdge());

        // LIMIT THE TILES BASED ON THE TILEMAP SIZE
        if (screenLeftTile < 0){
            screenLeftTile = 0;
        }
        if (screenTopTile < 0){
            screenTopTile = 0;
        }
        if (screenRightTile > this.w){
            screenRightTile = this.w;
        }
        if (screenBottomTile > this.h){
            screenBottomTile = this.h;
        }

        // FOR EACH VISIBLE COLUMN IN THE TILE MAP ARRAY
        for(let i = screenLeftTile; i < screenRightTile; i++) {

            // FOR EACH VISIBLE ROW IN THE TILE MAP ARRAY
            for(let j = screenTopTile; j < screenBottomTile; j++) {

                let tileID = this.TileArray[i][j];
                if (tileID > 0) {

                    // DRAW THE TILE

                    noStroke();
                    fill(TILE_RED_COLOR[tileID], TILE_GREEN_COLOR[tileID], TILE_BLUE_COLOR[tileID]);

                    rect(TILE_WIDTH * i - gameCamera.x + width / 2, TILE_HEIGHT * j - gameCamera.y + height / 2, TILE_WIDTH + 1, TILE_HEIGHT + 1);
                }
            }

        }

    };

    this.tileX = function(x){
        if (x<0){
            console.log("Negative x value passed for TileX: " + x);
            x = 0;
        }
        // else if(x>this.x*TILE_WIDTH){
        //     console.log("Negative x value passed for TileX: " + x);
        //     x = 0;
        // }
        return Math.floor(x / TILE_WIDTH);
    };

    this.tileY = function(y){
        if (y<0){
            console.log("Negative y value passed for TileY: " + y);
            y = 0;
        }
        return Math.floor(y / TILE_HEIGHT);
    };

    this.isTileBlockedAtCoordinate = function(x, y){
        return TILE_BLOCK_ARRAY[this.tileID(this.tileX(x),this.tileY(y))];
    };

    this.isTileBlocked = function(x, y){
        return TILE_BLOCK_ARRAY[this.tileID(x,y)];
    };

    this.tileID = function(tileX, tileY){
        return this.TileArray[tileX][tileY];
    };

    this.randomOpenTile = function(){

        let x;
        let y;

        do{

            x = Math.floor(Math.random()*(this.w-.001));
            y = Math.floor(Math.random()*(this.h-.001));

        } while(this.isTileBlocked(x,y));

        // console.log ("Random x: " + x);
        // console.log ("Random x: " + y);

        return new Coordinate(x, y);

    };

    this.buildMap();

}