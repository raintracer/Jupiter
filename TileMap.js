/**
 * Created by Richard Tyler on 5/24/2017.
 */

function TileMap(){

    this.w = 20;
    this.h = 20;
    this.TileArray = [];

    // BUILD A RANDOM TILE MAP
    this.buildMap = function(){

        let TileColumn = [];

        // FOR EACH COLUMN IN THE TILE MAP ARRAY
        for(let i = 0; i < this.w; i++) {

            // FOR EACH ROW IN THE TILE MAP ARRAY
            for(let j = 0; j < this.h; j++) {

                // PUSH A RANDOM VALUE ONTO THE TILE COLUMN
                TileColumn.push(Math.ceil(Math.random()*2)-1);
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
                    i--;
                    break;
                case 3:
                    j++;
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
    this.draw = function(){

        // FOR EACH COLUMN IN THE TILE MAP ARRAY
        for(let i = 0; i < this.w; i++) {

            // FOR EACH ROW IN THE TILE MAP ARRAY
            for(let j = 0; j < this.h; j++) {

                // DRAW THE TILE
                let color = this.TileArray[i][j];

                noStroke();
                fill(255*color);
                rect(TILE_WIDTH*i, TILE_HEIGHT*j, TILE_WIDTH+1, TILE_HEIGHT+1);

            }

        }

    };

    this.tileX = function(x){
        if (x<0){
            console.log("Negative x value passed for TileX");
            x = 0;
        }
        return Math.floor(x / TILE_WIDTH);
    };

    this.tileY = function(y){
        if (y<0){
            console.log("Negative y value passed for TileY");
            y = 0;
        }
        return Math.floor(y / TILE_HEIGHT);
    };

    this.isTileBlocked = function(x, y){
        return TILE_BLOCK_ARRAY[this.tileID(this.tileX(x),this.tileY(y))];
    };

    this.tileID = function(tileX, tileY){
          return this.TileArray[tileX][tileY];
    };

    this.buildMap();

}