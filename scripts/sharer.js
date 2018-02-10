var scoreBoard = document.getElementById("score");

var name;
var location;

var ctx = canvas.getContext('2d');
var height = 60;
var player = {
	hitbox: new Rectangle(canvas.width/2, canvas.height-height, width, height),
	color: "green",
	draw: function() {
	this.hitbox.draw(ctx, this.color);
	}
	erase: function(){
		clearRect(ctx, this.hitbox);
	},
	moveLeft: function(){
		this.erase();
		if (this.hitbox.x <= 10) {
			this.hitbox.x = 0;
		} else{
			this.hitbox.x -= 10;
		}
		this.draw();
	}
}

document.body.onload = function()
{
    player.draw();

};








