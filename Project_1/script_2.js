 // get current date and timing
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

var canvas = document.getElementById("plot2");

canvas.width = 2*document.getElementById("plot2").clientWidth;
canvas.height = 2*document.getElementById("plot2").clientHeight;
var canvas1RealWidth = document.getElementById("plot2").clientWidth;
var canvas1RealHeight = document.getElementById("plot2").clientHeight;

var c = canvas.getContext("2d");





/////////////////////////////////////////////////////////////////////////
function Line1(x,y,dx,dy){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;

  this.draw = function() {  
     c.fillStyle  = "#f4eee1";
c.fillRect(0, 0, canvas.width, canvas.height); 

    c.lineWidth=10;
    c.beginPath();
    c.moveTo(0,y);
    c.lineTo(canvas.width,y);
    c.strokeStyle = "#f92672";
    c.stroke();

    c.beginPath();
    c.moveTo(this.x,y);
    c.lineTo(canvas.width,y);
    c.strokeStyle = "#fca8c6";
    c.stroke();

    c.fillStyle = "#f92672";
    c.font = "130px Calibri";
    c.fillText(hour,this.x,y+40);
    
  }

  this.update = function() {
    // if (this.x + this.radius> canvas.width || this.x - this.radius < 0){
    //   this.dx = -this.dx;
    // }

    // if (this.y + this.radius> canvas.height || this.y - this.radius < 0){
    //   this.dy = -this.dy;
    // }

    this.x += this.dx ;
    this.y += this.dy ;
    this.draw(); 
  }
}


var lineArray1 = [];

for (var i = 0; i < 1; i++) {
var drop = 50*7 ;
  var x1 = (canvas.width*hour/24)*.95;
  var y1 = drop;
  var dx1 = 0;
  var dy1 = 0;
  
  lineArray1.push(new Line1(x1,y1,dx1,dy1));
  //var circle = new Circle(100,100,3,3,30);
}
////////////////////////////////////////////////////////////////////
function Line2(x,y,dx,dy){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;

  this.draw = function() {
    
    
    c.beginPath();
    c.moveTo(0,y);
    c.lineTo(canvas.width,y);
    c.strokeStyle = "#a6e22e";
    c.stroke();

    c.beginPath();
    c.moveTo(this.x,y);
    c.lineTo(canvas.width,y);
    c.strokeStyle = "#dbf3ab";
    c.stroke();




    c.fillStyle = "#a6e22e";
    c.font = "100px Calibri";
    c.fillText(minutes,this.x,y+25);

    
  }

  this.update = function() {
    // if (this.x + this.radius> canvas.width || this.x - this.radius < 0){
    //   this.dx = -this.dx;
    // }

    // if (this.y + this.radius> canvas.height || this.y - this.radius < 0){
    //   this.dy = -this.dy;
    // }

    this.x += this.dx ;
    this.y += this.dy ;
    this.draw(); 
  }
}


var lineArray2 = [];

for (var i = 0; i < 1; i++) {
var drop = 70*7 ;
  var x2 = (canvas.width*minutes/60)*.95;
  var y2 = drop;
  var dx2 = 0;
  var dy2 = 0;
  
  lineArray2.push(new Line2(x2,y2,dx2,dy2));
  //var circle = new Circle(100,100,3,3,30);
}
//////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
function Line3(x,y,dx,dy){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;

  this.draw = function() {
    
    
    c.beginPath();
    c.moveTo(0,y);
    c.lineTo(canvas.width,y);
    c.strokeStyle = "#66d9ef";
    c.stroke();

    c.beginPath();
    c.moveTo(this.x,y);
    c.lineTo(canvas.width,y);
    c.strokeStyle = "#c1eff8";
    c.stroke();


    c.fillStyle = "#66d9ef";
    c.font = "70px Calibri";
    c.fillText(seconds,this.x,y+23);

    
  }

  this.update = function() {
    // if (this.x + this.radius> canvas.width || this.x - this.radius < 0){
    //   this.dx = -this.dx;
    // }

    // if (this.y + this.radius> canvas.height || this.y - this.radius < 0){
    //   this.dy = -this.dy;
    // }

    this.x += this.dx ;
    this.y += this.dy ;
    this.draw(); 
  }
}


var lineArray3 = [];

for (var i = 0; i < 1; i++) {
var drop = 80*7 ;
  var x3 = (canvas.width*seconds/60)*.95;
  var y3 = drop;
  var dx3 = 0;
  var dy3 = 0;
  
  lineArray3.push(new Line3(x3,y3,dx3,dy3));
  //var circle = new Circle(100,100,3,3,30);
}
///////////////////////////////////////////////////////////////////////////
function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height);

  for (var i = 0; i < lineArray1.length; i++) {
    lineArray1[i].update();  
  }

  for (var i = 0; i < lineArray2.length; i++) {
    lineArray2[i].update();  

  }

  for (var i = 0; i < lineArray3.length; i++) {
    lineArray3[i].update();  

  }
}

animate();