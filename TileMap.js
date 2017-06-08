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
        let screenLeftTileIndex = pixelsToTileX(gameCamera.screenLeftEdge());
        let screenRightTileIndex = pixelsToTileX(gameCamera.screenRightEdge());
        let screenTopTileIndex = pixelsToTileY(gameCamera.screenTopEdge());
        let screenBottomTileIndex = pixelsToTileY(gameCamera.screenBottomEdge());

        // LIMIT THE TILES BASED ON THE TILEMAP SIZE
        if (screenLeftTileIndex < 0){
            screenLeftTileIndex = 0;
        }
        if (screenTopTileIndex < 0){
            screenTopTileIndex = 0;
        }
        if (screenRightTileIndex > this.w-1){
            screenRightTileIndex = this.w-1;
        }
        if (screenBottomTileIndex > this.h-1){
            screenBottomTileIndex = this.h-1;
        }

        // FOR EACH VISIBLE COLUMN IN THE TILE MAP ARRAY
        for(let i = screenLeftTileIndex; i <= screenRightTileIndex; i++) {

            // FOR EACH VISIBLE ROW IN THE TILE MAP ARRAY
            for(let j = screenTopTileIndex; j <= screenBottomTileIndex; j++) {

                let tileID = this.TileArray[i][j];
                // if (tileID > 0) {

                // DRAW THE TILE
                try {
                    image(TILE_GRAPHIC_ARRAY[tileID], TILE_WIDTH * i - gameCamera.x + width / 2, TILE_HEIGHT * j - gameCamera.y + height / 2);

                    // // DRAW COORDINATE OVER TILE WITH TEXT
                    // fill(255);
                    // text(i + ", " + j, TILE_WIDTH * i - gameCamera.x + width / 2, TILE_HEIGHT * j - gameCamera.y + height / 2, TILE_WIDTH, TILE_HEIGHT);

                }
                catch(err) {
                    console.log(err.message);
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
        if (tileX < 0){
            tileX = 0;
            console.log("Warning: A negative tileX value was passed to Tilemap->tileID. Corrected to 0.");
        }
        if (tileY < 0){
            tileY = 0;
            console.log("Warning: A negative tileY value was passed to Tilemap->tileID. Corrected to 0.");
        }
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