/**
 * Created by Richard Tyler on 5/24/2017.
 */

function Scene(){

    this.tileMap = new TileMap();
    this.objectCollection  = new ObjectCollection(this.tileMap);
    this.player = this.objectCollection.createObject("Player",20,20);

    this.camera = new Camera(new Coordinate(0,0), 1);

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

        // CREATE A NEW OBJECT IN A RANDOM OPEN TILE
        let RandomCoordinate = new Coordinate(0,0);
        RandomCoordinate.copyCoordinate(this.tileMap.randomOpenTile());

        // console.log(RandomCoordinate.x);
        // console.log(RandomCoordinate.y);

        this.objectCollection.createObject("NPC", tileToPixelsX(RandomCoordinate.x), tileToPixelsY(RandomCoordinate.y));

        // PATH ALL OBJECTS TO THE CLICKED TILE
        let tileX = Math.floor(mouseX/TILE_WIDTH);
        let tileY = Math.floor(mouseY/TILE_HEIGHT);
        this.objectCollection.setPathTargets(new Coordinate(tileX, tileY))

    }

}