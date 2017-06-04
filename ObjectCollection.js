/**
 * Created by Richard Tyler on 5/27/2017.
 */

function ObjectCollection(tileLayer){

    this.tileLayer = tileLayer;
    this.objectQuantity = 0;
    this.objectsMade = 0;
    this.gameObjects = [];

    this.createObject = function(objectType,x,y){

        let object;

        if (objectType === "Player"){

            object = new Player(this, this.tileLayer, this.objectsMade, x, y);

        }else if (objectType === "NPC"){

            object = new GameObject(this, this.tileLayer, this.objectsMade, x, y);

        }
        else {
            console.log(`Unrecognized object: ${objectType}`);
        }

        this.gameObjects.push(object);

        this.objectsMade++;
        this.objectQuantity++;

        return this.gameObjects[this.gameObjects.length-1];

    };

    this.deleteObject = function(id){

        for (let i = 0; i < this.objectQuantity; i++){

            if (this.gameObjects[i].id === id){

                this.gameObjects.splice(i,1);
                this.objectQuantity--;
                break;

            }

        }

    };

    // RETURNS A LIST OF ALL THE OBJECTS MATCHING THE SPECIFIED TYPE
    this.getObjectTypes = function(type){

        let objects = [];
        for (let i = 0; i<this.objectQuantity; i++){
            if (this.gameObjects[i].type === type){
                objects.push(this.gameObjects[i]);
            }
        }

        return objects;

    };

    this.update = function(){

        for (i in this.gameObjects){
            this.gameObjects[i].update();
        }

    };

    this.draw = function(gameCamera){

        for (i in this.gameObjects){
            this.gameObjects[i].draw(gameCamera);
        }

    };

    this.setPathTargets = function(TargetCoordinate){

        // CREATE A NEW OBJECT IN A RANDOM OPEN TILE
        let RandomCoordinate = new Coordinate(0,0);
        for (i in this.gameObjects){
            RandomCoordinate.copyCoordinate(this.tileLayer.randomOpenTile());
            this.gameObjects[i].setPathTarget(RandomCoordinate);
        }
    }

}