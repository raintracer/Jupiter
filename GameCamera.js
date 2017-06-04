/**
 * Created by Richard Tyler on 6/4/2017.
 */

function GameCamera(coordinate, zoom){

    this.x = coordinate.x;
    this.y = coordinate.y;
    this.zoom = zoom;

    this.setPosition = function(coordinate){
        this.x = coordinate.x;
        this.y = coordinate.y;
    }

    this.setZoom = function(zoom){
        this.zoom = zoom;
    }

}