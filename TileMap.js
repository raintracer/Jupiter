/**
 * Created by Richard Tyler on 5/24/2017.
 */

function TileMap(){

    this.w = 20;
    this.h = 20;
    this.TileArray = [];

    // BUILD A RANDOM TILE MAP
    this.buildMap = function(){

        TileColumn = [];

        // FOR EACH COLUMN IN THE TILE MAP ARRAY
        for(let i = 0; i < this.w; i++) {

            // FOR EACH ROW IN THE TILE MAP ARRAY
            for(let j = 0; j < this.h; j++) {

                // PUSH A RANDOM VALUE ONTO THE TILE COLUMN
                TileColumn.push(Math.ceil(Math.Random*2-1));
            }

            // PUSH THE TILE COLUMN TO THE TILE MAP ARRAY
            this.TileArray.push(TileColumn);

        }

    };

    this.buildMap();

}