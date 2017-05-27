/**
 * Created by Richard Tyler on 5/24/2017.
 */

function Game(){

    this.scene = new Scene();

    this.update = function(){
        this.scene.update();
    };

    this.mouseClicked = function(mouseX, mouseY){
        this.scene.mouseClicked(mouseX, mouseY);
    }

}