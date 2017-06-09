/**
 * Created by Richard Tyler on 5/24/2017.
 */

function Scene(){

    this.tileMap = new TileMap(20,20);
    this.objectCollection  = new ObjectCollection(this.tileMap);
    this.player = this.objectCollection.createObject("Player",TILE_WIDTH/2,TILE_HEIGHT/2);

    this.gameCamera = new GameCamera(new Coordinate(0,0), 1);

    let GameObjects = [];
    let time = 0;

    this.update = function(){

        time++;

        // UPDATE OBJECTS
        this.objectCollection.update();
        this.gameCamera.setPosition(new Coordinate(this.player.x, this.player.y));

        // DRAW OBJECTS
        this.tileMap.draw(this.gameCamera);
        this.objectCollection.draw(this.gameCamera);

    };

    this.mouseClicked = function(absMouseX, absMouseY){

        // INTERPRET THE COORDINATES THROUGH THE CAMERA POSITION
        let stageMouseCoordinate = new Coordinate(absMouseX, absMouseY);

        let sceneMouseCoordinate = new Coordinate(0,0);
        sceneMouseCoordinate.copyCoordinate(this.gameCamera.stageToScenePosition(stageMouseCoordinate));

        // CREATE A NEW OBJECT IN A RANDOM OPEN TILE
        // let RandomCoordinate = new Coordinate(0,0);
        // RandomCoordinate.copyCoordinate(this.tileMap.randomOpenTile());

        // console.log(RandomCoordinate.x);
        // console.log(RandomCoordinate.y);

        // this.objectCollection.createObject("NPC", tileToPixelsX(RandomCoordinate.x), tileToPixelsY(RandomCoordinate.y));

        if (PATH_DEBUG_MODE === "Select"){

            // PATH ALL OBJECTS TO THE CLICKED TILE
            let tileX = Math.floor(sceneMouseCoordinate.x/TILE_WIDTH);
            let tileY = Math.floor(sceneMouseCoordinate.y/TILE_HEIGHT);
            this.objectCollection.setPathTargets(new Coordinate(tileX, tileY))

        } else if (PATH_DEBUG_MODE === "Random"){

            // PATH ALL GAME OBJECTS TO A RANDOM OPEN TILE
            let RandomCoordinate = new Coordinate(0,0);
            for (let i in this.gameObjects){
                RandomCoordinate.copyCoordinate(this.tileLayer.randomOpenTile());
                this.objectCollection.gameObjects[i].setPathTarget(RandomCoordinate);
            }

        }

    }

}