/**
 * Created by Richard Tyler on 5/24/2017.
 */

// GAME OBJECT TREATED AS RECTANGLE
function GameObject(x, y){

    this.x = x;
    this.y = y;

    this.xvel = 0;
    this.yvel = 0;

    const BLOCKED_BY_TILE = true;

    this.update = function(){

    };

    this.move = function(){

        this.moveX();
        this.moveY();

    };

    this.moveX = function(){

    };

    this.moveY = function(){

    };

    this.draw = function(){

    };

}