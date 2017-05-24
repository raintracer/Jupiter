/**
 * Created by Richard Tyler on 5/24/2017.
 */

function Scene(){

    this.tilemap = new TileMap();
    let GameObjects = [];

    GameObjects.push(new GameObject(this.tilemap, 20,20));

    this.update = function(){
        this.tilemap.draw();

        for(let i=0; i<GameObjects.length; i++){
            GameObjects[i].draw();
        }

    };

}