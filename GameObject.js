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

    this.accelerate = function(xacc, yacc){
        this.xvel += xacc;
        this.yvel += yacc;
    };

    this.move = function(){

        if(Math.abs(this.xvel) < STATIC_FRICTION){
            this.xvel = 0;
        }

        if(Math.abs(this.yvel) < STATIC_FRICTION){
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

            // CHECK FOR COLLISION WITH BOUNDARY ON RIGHT SIDE
            if(this.rightEdge() > width){
                this.alignRightEdge(width);
                this.xvel*=-1;
            }

            // CHECK FOR COLLISION WITH TILE ON RIGHT SIDE
            if (tile_layer.isTileBlocked(this.rightEdge(),this.y) || tile_layer.isTileBlocked(this.rightEdge(),this.topEdge()) || tile_layer.isTileBlocked(this.rightEdge(),this.bottomEdge())){
                this.alignRightEdge(Math.floor(this.rightEdge()/TILE_WIDTH)*TILE_WIDTH);
            }

        } else if (this.xvel < 0){

            // CHECK FOR COLLISION WITH BOUNDARY ON LEFT SIDE
            if(this.leftEdge() < 0){
                this.alignLeftEdge(0);
                this.xvel*=-1;
            }

            // CHECK FOR COLLISION WITH TILE ON LEFT SIDE
            if (tile_layer.isTileBlocked(this.leftEdge(),this.y) || tile_layer.isTileBlocked(this.leftEdge(),this.topEdge()) || tile_layer.isTileBlocked(this.leftEdge(),this.bottomEdge())){
                this.alignLeftEdge(Math.floor((this.leftEdge()/TILE_WIDTH)+1)*TILE_WIDTH);
            }

        }

    };

    this.moveY = function(){

        // MOVE THE OBJECT
        this.y += this.yvel;

        if (this.yvel > 0){

            // CHECK FOR COLLISION WITH BOUNDARY ON BOTTOM SIDE
            if(this.bottomEdge() > height){
                this.alignBottomEdge(height);
                this.yvel*=-1;
            }

            // CHECK FOR COLLISION WITH TILE ON BOTTOM SIDE
            if (tile_layer.isTileBlocked(this.x, this.bottomEdge()) || tile_layer.isTileBlocked(this.leftEdge(), this.bottomEdge()) || tile_layer.isTileBlocked(this.rightEdge(), this.bottomEdge())){
                this.alignBottomEdge(Math.floor((this.bottomEdge()/TILE_HEIGHT))*TILE_HEIGHT);
            }

        } else if (this.yvel < 0){

            // CHECK FOR COLLISION WITH BOUNDARY ON TOP SIDE
            if(this.topEdge() < 0){
                this.alignTopEdge(0);
                this.yvel*=-1;
            }

            // CHECK FOR COLLISION WITH TILE ON TOP SIDE
            if (tile_layer.isTileBlocked(this.x, this.topEdge()) || tile_layer.isTileBlocked(this.leftEdge(), this.topEdge()) || tile_layer.isTileBlocked(this.rightEdge(), this.topEdge())){
                this.alignTopEdge(Math.floor((this.topEdge()/TILE_HEIGHT)+1)*TILE_HEIGHT);
            }

        }

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

    this.alignTopEdge = function(y){
        this.y = y + this.h/2 + 1;
    };

    this.alignBottomEdge = function(y){
        this.y = y - this.h/2 - 1;
    };

    this.alignRightEdge = function(x){
        this.x = x - this.w/2 - 1;
    };

    this.alignLeftEdge = function(x){
        this.x = x + this.w/2 + 1;
    };

    this.containsPoint = function(x, y){
        return (x>this.leftEdge() & x<this.rightEdge() && y>this.topEdge() && y<this.bottomEdge());
    };

}

