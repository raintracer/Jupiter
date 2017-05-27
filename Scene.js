/**
 * Created by Richard Tyler on 5/24/2017.
 */

function Scene(){

    this.tileMap = new TileMap();
    this.objectCollection  = new ObjectCollection(this.tileMap);
    this.player = this.objectCollection.createObject("Player",20,20);

    let GameObjects = [];
    let time = 0;

    this.update = function(){

        time++;

        // UPDATE OBJECTS
        this.objectCollection.update();

        // DRAW OBJECTS
        this.tileMap.draw();
        this.objectCollection.draw();

    };

    this.mouseClicked = function(mouseX, mouseY){
        let tileX = Math.floor(mouseX/TILE_WIDTH);
        let tileY = Math.floor(mouseY/TILE_HEIGHT);
        this.player.setPathTarget(new Coordinate(tileX, tileY));
    }

}