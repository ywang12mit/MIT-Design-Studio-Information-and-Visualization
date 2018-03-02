var canvas = document.querySelector('canvas');

var c = canvas.getContext('2d');

//rec
// c.fillStyle = 'rgba(255,0,0,0.5)';
// c.fillRect(50,50,50,50);
// c.fillStyle = 'rgba(0,255,0,0.5)';
// c.fillRect(120,50,50,50);

//line
// c.beginPath();
// c.moveTo(20,20);
// c.lineTo(50,50);
// c.lineTo(50,20);
// c.strokeStyle = "#fa34a3";
// c.stroke();

//arc
// for (var i =0; i < 3; i++) {
// 	var x = Math.random()*canvas.width;
// 	var y = Math.random()*canvas.height;
// 	c.beginPath();
// 	c.fillStyle = 'red';
// 	c.arc(x,y,30,0,Math.PI*2,false);
// 	c.strokeStyle = "blue";
// 	c.stroke();
// }
function Circle(x,y,dx,dy,radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function() {
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.strokeStyle = "blue";
		c.stroke();
	}

	this.update = function() {
		if (this.x + this.radius> canvas.width || this.x - this.radius < 0){
			this.dx = -this.dx;
		}

		if (this.y + this.radius> canvas.height || this.y - this.radius < 0){
			this.dy = -this.dy;
		}

		this.x += this.dx ;
		this.y += this.dy ;
		this.draw(); 
	}
}

var circleArray = [];

for (var i = 0; i < 100; i++) {
	var radius = 10;
	var x = Math.random()*(canvas.width - radius * 2)+radius;
	var y = Math.random()*(canvas.height - radius * 2)+radius;
	var dx = (Math.random() - 0.5);
	var dy = (Math.random() - 0.5);
	
	circleArray.push(new Circle(x,y,dx,dy,radius));
	//var circle = new Circle(100,100,3,3,30);
}



//circle.draw();


// var x = Math.random()*canvas.width;
// var y = Math.random()*canvas.height;
// var dx = (Math.random() - 0.5);
// var dy = (Math.random() - 0.5);
// var radius = 30;
console.log(circleArray);

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,canvas.width,canvas.height);


	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}

	//circle.update(); 
	

	// c.beginPath();
	// c.arc(x,y,radius,0,Math.PI*2,false);
	// c.strokeStyle = "blue";
	// c.stroke()

	// if (x + radius> canvas.width || x - radius < 0){
	// 		dx = -dx;
	// 	}

	// 	if (y + radius> canvas.height || y - radius < 0){
	// 		dy = -dy;
	// 	}

	// 	x += dx ;
	// 	y += dy ;
}

animate();