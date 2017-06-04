/**
 * Created by Richard Tyler on 5/24/2017.
 */

// GAME OBJECT TREATED AS RECTANGLE
function GameObject(tilemap, id, x, y){

    this.tilemap = tilemap;
    this.speed = 1;

    this.id = id;

    this.x = x;
    this.y = y;

    this.w = TILE_WIDTH * .9;
    this.h = TILE_HEIGHT * .9;

    this.path = new Path();
    this.pathing = false;

    this.xvel = 0;
    this.yvel = 0;

    this.tilePosition = new Coordinate(0,0);

    const BLOCKED_BY_TILE = true;

    this.update = function(){

        this.move();

    };

    this.accelerate = function(xacc, yacc){
        this.xvel += xacc;
        this.yvel += yacc;
    };

    this.move = function(){

        //  MOVE BASED ON PATH IF THERE IS PATHING
        if (this.pathing === true){

            let xTarget = this.path.startCoordinate().x;
            let yTarget = this.path.startCoordinate().y;

            let xDifference = (xTarget*TILE_WIDTH + TILE_WIDTH/2) - this.x;
            let yDifference = (yTarget*TILE_HEIGHT + TILE_HEIGHT/2) - this.y;

            // console.log(xDifference);
            // console.log(yDifference);
            // console.log("----");

            if (xDifference > 0) {
                this.accelerate(this.speed, 0);
            }
            if (xDifference < 0) {
                this.accelerate(-this.speed, 0);
            }
            if (yDifference > 0) {
                this.accelerate(0, this.speed);
            }
            if (yDifference < 0) {
                this.accelerate(0, -this.speed);
            }

            // SHIFT THE PATH IF THE OBJECT HAS ARRIVED
            if (this.getTilePosition().x === this.path.startCoordinate().x && this.getTilePosition().y === this.path.startCoordinate().y){
                // console.log("Shift coordinate");
                if (this.path.PathArray.length>1) {
                    this.path.shiftCoordinate();
                }
            }

            // END THE PATHING IF THE OBJECT HAS ARRIVED TO ITS TARGET DESTINATION
            if (this.path.PathArray.length === 1){
                this.pathing = false;
            }

        }

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
            if(this.rightEdge() > this.tilemap.width){
                this.alignRightEdge(this.tilemap.width);
                this.xvel*=-1;
            }

            // CHECK FOR COLLISION WITH TILE ON RIGHT SIDE
            if (tilemap.isTileBlockedAtCoordinate(this.rightEdge(),this.y) || tilemap.isTileBlockedAtCoordinate(this.rightEdge(),this.topEdge()) || tilemap.isTileBlockedAtCoordinate(this.rightEdge(),this.bottomEdge())){
                this.alignRightEdge(Math.floor(this.rightEdge()/TILE_WIDTH)*TILE_WIDTH);
            }

        } else if (this.xvel < 0){

            // CHECK FOR COLLISION WITH BOUNDARY ON LEFT SIDE
            if(this.leftEdge() < 0){
                this.alignLeftEdge(0);
                this.xvel*=-1;
            }

            // CHECK FOR COLLISION WITH TILE ON LEFT SIDE
            if (tilemap.isTileBlockedAtCoordinate(this.leftEdge(),this.y) || tilemap.isTileBlockedAtCoordinate(this.leftEdge(),this.topEdge()) || tilemap.isTileBlockedAtCoordinate(this.leftEdge(),this.bottomEdge())){
                this.alignLeftEdge(Math.floor((this.leftEdge()/TILE_WIDTH)+1)*TILE_WIDTH);
            }

        }

    };

    this.moveY = function(){

        // MOVE THE OBJECT
        this.y += this.yvel;

        if (this.yvel > 0){

            // CHECK FOR COLLISION WITH BOUNDARY ON BOTTOM SIDE
            if(this.bottomEdge() > this.tilemap.height){
                this.alignBottomEdge(this.tilemap.height);
                this.yvel*=-1;
            }

            // CHECK FOR COLLISION WITH TILE ON BOTTOM SIDE
            if (tilemap.isTileBlockedAtCoordinate(this.x, this.bottomEdge()) || tilemap.isTileBlockedAtCoordinate(this.leftEdge(), this.bottomEdge()) || tilemap.isTileBlockedAtCoordinate(this.rightEdge(), this.bottomEdge())){
                this.alignBottomEdge(Math.floor((this.bottomEdge()/TILE_HEIGHT))*TILE_HEIGHT);
            }

        } else if (this.yvel < 0){

            // CHECK FOR COLLISION WITH BOUNDARY ON TOP SIDE
            if(this.topEdge() < 0){
                this.alignTopEdge(0);
                this.yvel*=-1;
            }

            // CHECK FOR COLLISION WITH TILE ON TOP SIDE
            if (tilemap.isTileBlockedAtCoordinate(this.x, this.topEdge()) || tilemap.isTileBlockedAtCoordinate(this.leftEdge(), this.topEdge()) || tilemap.isTileBlockedAtCoordinate(this.rightEdge(), this.topEdge())){
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



    this.updateTilePosition = function(){
        this.tilePosition.x = Math.floor(this.x/TILE_WIDTH);
        this.tilePosition.y = Math.floor(this.y/TILE_HEIGHT);
    };

    this.getTilePosition = function(){
        this.updateTilePosition();
        return this.tilePosition;
    };

    // START PATHING AND SET A TARGET COORDINATE
    this.setPathTarget = function(TargetCoordinate){
        this.pathing = true;
        this.resolvePath(TargetCoordinate);
    };

    // TEST RESOLVE PATH TO TARGET
    this.resolvePath = function(TargetCoordinate){
        let pathfind = new Pathfinder(this, this.tilemap);
        this.path.loadPath(pathfind.resolvePath(this.getTilePosition(), TargetCoordinate));
    }

}

