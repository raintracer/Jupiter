/**
 * Created by Richard Tyler on 5/24/2017.
 */

function Scene(){

    this.tilemap = new TileMap();
    let GameObjects = [];
    let time = 0;

    this.player = new Player(this.tilemap, 20,20);
    this.player.setPathTarget(new Coordinate(19,19));

    this.update = function(){

        time++;
        this.player.playerUpdate();

        this.tilemap.draw();
        for(let i=0; i<GameObjects.length; i++){
            GameObjects[i].draw();
        }
        this.player.draw();

    };

}