/**
 * Created by Richard Tyler on 5/24/2017.
 */

function Scene(){

    this.tilemap = new TileMap();
    let GameObjects = [];
    let player = new Player(this.tilemap, 20,20);

    this.update = function(){

        player.playerUpdate();

        this.tilemap.draw();
        for(let i=0; i<GameObjects.length; i++){
            GameObjects[i].draw();
        }
        player.draw();

    };

}