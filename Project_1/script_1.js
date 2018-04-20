 // get current date and timing
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

var canvas = document.getElementById("plot1");

canvas.width = 2*document.getElementById("plot1").clientWidth;
canvas.height = 2*document.getElementById("plot1").clientHeight;
var canvas1RealWidth = document.getElementById("plot1").clientWidth;
var canvas1RealHeight = document.getElementById("plot1").clientHeight;

var c = canvas.getContext("2d");


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
//  var x = Math.random()*canvas.width;
//  var y = Math.random()*canvas.height;
//  c.beginPath();
//  c.fillStyle = 'red';
//  c.arc(x,y,30,0,Math.PI*2,false);
//  c.strokeStyle = "blue";
//  c.stroke();
// }
/////////////////////////////////////////////////////////////////////////////////////

function Circle(x,y,dx,dy,radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function() {
    c.fillStyle  = "#EEEEEE";
    c.fillRect(0, 0, canvas.width, canvas.height); 
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.fillStyle = "#5680db";
    c.fill();

    c.fillStyle = "#eab041";
    c.font = "50px Calibri";
    c.fillText(hour,this.x-radius+20,this.y+radius/2);
    
    // c.strokeStyle = "white";
    // c.stroke();
    
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

for (var i = 0; i < hour; i++) {
  var radius = 50;
  var x = Math.random()*(canvas.width - radius * 2)+radius;
  var y = Math.random()*(canvas.height - radius * 2)+radius;
  var dx = (Math.random() - 0.5);
  var dy = (Math.random() - 0.5);
  
  circleArray.push(new Circle(x,y,dx,dy,radius));
  //var circle = new Circle(100,100,3,3,30);
}



//SECOND CIRCLE GROUP///////////////////////////////////////////
function Circle2(x,y,dx,dy,radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function() {

    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.fillStyle = "#d85454";
    c.fill();
    c.lineWidth=0;

    c.fillStyle = "#006332";
    c.font = "40px Calibri";
    c.fillText(minutes,this.x-radius+15,this.y+radius/2);
    
    // c.strokeStyle = "white";
    // c.stroke();
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

   
var circleArray2 = [];

for (var i = 0; i < minutes; i++) {
  var radius2 = 40;
  var x2 = Math.random()*(canvas.width - radius * 2)+radius2;
  var y2 = Math.random()*(canvas.height - radius * 2)+radius2;
  var dx2 = (Math.random() - 0.5);
  var dy2 = (Math.random() - 0.5);
  
  circleArray2.push(new Circle2(x2,y2,dx2,dy2,radius2));
  //var circle = new Circle(100,100,3,3,30);
}


//3333/////////////////////////////////////////////////////////////////////////////
function Circle3(x,y,dx,dy,radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.fillStyle = "#eab041";
    c.fill();

    c.fillStyle = "purple";
    c.font = "25px Calibri";
    c.fillText(seconds,this.x-radius+10,this.y+radius/2);
    
    // c.strokeStyle = "white";
    // c.stroke();
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

   
var circleArray3 = [];

for (var i = 0; i < seconds; i++) {
  var radius3 = 20;
  var x3 = Math.random()*(canvas.width - radius * 2)+radius3;
  var y3 = Math.random()*(canvas.height - radius * 2)+radius3;
  var dx3 = (Math.random() - 0.5);
  var dy3 = (Math.random() - 0.5);
  
  circleArray3.push(new Circle3(x3,y3,dx3,dy3,radius3));
  //var circle = new Circle(100,100,3,3,30);
}
///////////////////////////////////////////////////////////////////////////////
//circle.draw();


// var x = Math.random()*canvas.width;
// var y = Math.random()*canvas.height;
// var dx = (Math.random() - 0.5);
// var dy = (Math.random() - 0.5);
// var radius = 30;
console.log(circleArray);
console.log(circleArray2);
console.log(circleArray3);
//console.log(textArray);

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height);
  
  // for (var i = 0; i < textArray.length; i++) {
  //   textArray[i].update();
    
  // }

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();  

  }
  for (var i = 0; i < circleArray2.length; i++) {
    circleArray2[i].update();  

  }
  for (var i = 0; i < circleArray3.length; i++) {
    circleArray3[i].update();  

  }

  

  //circle.update(); 
  

  // c.beginPath();
  // c.arc(x,y,radius,0,Math.PI*2,false);
  // c.strokeStyle = "blue";
  // c.stroke()

  // if (x + radius> canvas.width || x - radius < 0){
  //    dx = -dx;
  //  }

  //  if (y + radius> canvas.height || y - radius < 0){
  //    dy = -dy;
  //  }

  //  x += dx ;
  //  y += dy ;
}

animate();
