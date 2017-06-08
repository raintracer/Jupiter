/**
 * Created by Richard Tyler on 5/27/2017.
 */

function Coordinate(x, y){

    this.x = x;
    this.y = y;

    this.copyCoordinate = function(TargetCoordinate){

        this.x = TargetCoordinate.x;
        this.y = TargetCoordinate.y;

    };

    this.matchesCoordinate = function(TargetCoordinate){

        return ((TargetCoordinate.x === this.x) && (TargetCoordinate.y === this.y));

    };

}