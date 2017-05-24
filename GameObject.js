/**
 * Created by Richard Tyler on 5/24/2017.
 */

// GAME OBJECT TREATED AS RECTANGLE
function GameObject(tile_layer, x, y){

    this.tile_layer = tile_layer;

    this.x = x;
    this.y = y;

    this.w = TILE_WIDTH * .9;
    this.h = TILE_HEIGHT * .9;

    this.xvel = 0;
    this.yvel = 0;

    const BLOCKED_BY_TILE = true;

    this.update = function(){

        this.move();

    };

    this.move = function(){

        if(Math.abs(this.xvel) < STATIC_FRICTION){
            this.xvel = 0;
        }

        if(Math.abs(this.xvel) < STATIC_FRICTION){
            this.yvel = 0;
        }

        this.moveX();
        this.moveY();

        this.xvel *= FRICTION;
        this.yvel *= FRICTION;

    };

    this.moveX = function(){

        // MOVE THE OBJECT
        this.x += this.xvel;

        if (this.xvel > 0){
            // CHECK FOR COLLISION WITH TILE ON RIGHT SIDE

        } else if (this.xvel < 0){
            // CHECK FOR COLLISION WITH TILE ON LEFT SIDE

        }

    };

    this.moveY = function(){



    };

    this.draw = function(){

        fill(255,0,0);
        rect(this.leftEdge(), this.topEdge(), this.w, this.h);

    };

    this.leftEdge = function(){
        return this.x - this.w/2;
    };

    this.rightEdge = function(){
        return this.x + this.w/2;
    };

    this.topEdge = function(){
        return this.y - this.h/2;
    };

    this.bottomEdge = function(){
        return this.y + this.h/2;
    };

    this.containsPoint = function(x, y){
        return (x>this.leftEdge() & x<this.rightEdge() && y>this.topEdge() && y<this.bottomEdge());
    };

}

