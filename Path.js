/**
 * Created by Richard Tyler on 5/27/2017.
 */

function Path() {

    // A LIST OF SEQUENTIAL TILE COORDINATES THAT MAKE UP A PATH
    this.PathArray = [];

    // "COPY CONSTRUCTOR" FOR PATHS
    this.loadPath = function (path) {
        this.clearPath();
        for(let i = 0; i < path.PathArray.length; i++){
            this.addCoordinate(path.PathArray[i].x, path.PathArray[i].y);
        }
    };

    // RETURNS THE FIRST PATH COORDINATE
    this.startCoordinate = function () {
        return this.PathArray[0];
    };

    // RETURNS THE END COORDINATE
    this.endCoordinate = function () {
        return this.PathArray[this.PathArray.length - 1];
    };

    // REMOVES THE FIRST PATH COORDINATE
    this.shiftCoordinate = function () {
        this.PathArray.shift();
    };

    // ADDS A NEW COORDINATE AT THE END OF THE PATH
    this.addCoordinate = function (x,y) {
        this.PathArray.push(new Coordinate(x,y));
    };

    // CLEARS THE CURRENT PATH
    this.clearPath = function () {
        this.PathArray = [];
    };

}