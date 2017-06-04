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
    };

    this.setZoom = function(zoom){
        this.zoom = zoom;
    };

    this.screenLeftEdge = function(){
        return this.x - width/2;
    };

    this.screenRightEdge = function(){
        return this.x + width/2;
    };

    this.screenTopEdge = function(){
        return this.y - height/2;
    };

    this.screenBottomEdge = function(){
        return this.y + height/2;
    };

}