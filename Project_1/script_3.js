 // get current date and timing
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();


var canvas = document.getElementById("plot3");

canvas.width = 2*document.getElementById("plot3").clientWidth;
canvas.height = 2*document.getElementById("plot3").clientHeight;
var canvas1RealWidth = document.getElementById("plot3").clientWidth;
var canvas1RealHeight = document.getElementById("plot3").clientHeight;

var c = canvas.getContext("2d");

// var imageObj = new Image();
// imageObj.onload = function() {
// c.drawImage(imageObj, 69, 50,50,50);
// };  
// imageObj.src = 'money.png';

// var loadImage = function (url, ctx) {
//   var img = new Image();
//   img.src = url;
//   img.onload = function () { 
//     ctx.drawImage(img, 10, 10, 450, 300, 12, 200, 400, 300);
//   }
// }

//loadImage("money.png",ctx);

/////////////////////////////////////////////////////////////////////////

function Line1(x,y,dx,dy,xm,ym){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.xm = dx;
  this.ym = dx;
 

 this.draw = function() { 


 startPoint = {
    x: canvas.width/2,
    y: 100
  };
  
  endPoint = {
    x: canvas.width/2 ,
    y: canvas.height-250
  };

  c.beginPath();
  c.setLineDash([1, 2]);
  
  // rotate around center - find mid-point using lerp
  midPoint = {
    x: startPoint.x + (endPoint.x - startPoint.x) * 0.5,
    y: startPoint.y + (endPoint.y - startPoint.y) * 0.5
  };
  
  // translate to midpoint
  c.translate(midPoint.x, midPoint.y);
  
  // rotate some angle (radians)
  c.rotate(-3*hour/24);  // (0.5*Math.PI)+(2*Math.PI*hour/12)
  
  // translate back
  c.translate(-midPoint.x, -midPoint.y);

  // draw line
  c.moveTo(startPoint.x, startPoint.y);
  c.lineTo(endPoint.x, endPoint.y);
  c.stroke();
  c.closePath();
  
  // reset transforms
  c.setTransform(1,0,0,1,0,0);  
  
  c.beginPath();
    c.arc(400,600,40,0,Math.PI*2,false);
    c.fillStyle = "yellow";
    c.fill();  
    
 c.fillStyle = "gray";
 c.font = "50px Calibri";
 c.fillText(hour+":"+minutes+":"+seconds,x,y);  

 c.fillStyle = "green";
 c.font = "80px Calibri";
 c.fillText("$$$",xm,ym); 
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
var drop = 50 ;
  var x1 = 30;
  var y1 = 560;
  var xm = 600;
  var ym = 500;
  var dx1 = 0;
  var dy1 = 0;         
  
  lineArray1.push(new Line1(x1,y1,dx1,dy1,xm,ym));
  //var circle = new Circle(100,100,3,3,30);
}

///////////////////////////////////////////////////////////////////////////
function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height);

  for (var i = 0; i < lineArray1.length; i++) {
    lineArray1[i].update();  
  }


  }


animate();