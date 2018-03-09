d3.json("../data/boston_weather.json",draw);


function draw(data){
var formatTime = d3.timeFormat("%I:%M:%S");
// d3.select("time").html(formatTime(data.currently.time*1000));
d3.select("time").html(data.hourly.summary);

var canvas = d3.select("svg"),
    width = +canvas.attr("width"),
    height = +canvas.attr("height"),
    angles = d3.range(0, 2 * Math.PI, Math.PI / 100);//the smaller the slower

var blue = canvas.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")") //circle position
    .attr("fill", "none")
    .attr("stroke-width", data.currently.dewPoint/7)
    .attr("stroke-linejoin", "round") // rounded lines, not sharp
  

  .selectAll("path")
  .data(["cyan"])  
  .enter()
  .append("path")
    .attr("stroke", function(d) { return d; })
    .style("mix-blend-mode", "darken")
    .datum(function(d, i) {
      

      return d3.radialLine()
          .curve(d3.curveLinearClosed)
          .angle(function(a) { return a; })
          .radius(function(a) {
            var t = d3.now() / 1000;//the larger the slower
            return 200 //200
                    + data.currently.humidity*5*(Math.cos(a * 4 - i * 2 * Math.PI / 3 + t) 
                    * Math.pow((1 + Math.cos(a - t)) / 2, 3) 
                    * 32);
          });//a-->the bigger the denser
            //i&t --> the delay between lines 1-60
    });

var red = canvas.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")") //circle position
    .attr("fill", "none")
    .attr("stroke-width", data.currently.windBearing)
    .attr("stroke-linejoin", "round") // rounded lines, not sharp
  

  .selectAll("path")
  .data(["magenta"])  
  .enter()
  .append("path")
    .attr("stroke", function(d) { return d; })
    .style("mix-blend-mode", "darken")
    .datum(function(d, i) {
      

      return d3.radialLine()
          .curve(d3.curveLinearClosed)
          .angle(function(a) { return a; })
          .radius(function(a) {
            var t = d3.now() / 1000;
            return 200 //200
                    + data.currently.windSpeed/7*Math.cos(a * 4 - i * 2 * Math.PI / 3 + t) //a =8
                    * Math.pow((1 + Math.cos(a - t)) / 2, 3) 
                    * 32;
          });//a-->the bigger the denser
            //i&t --> the delay between lines 1-60
    });

var yellow = canvas.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")") //circle position
    .attr("fill", "none")
    .attr("stroke-width", data.currently.uvIndex+11)
    .attr("stroke-linejoin", "round") // rounded lines, not sharp
  

  .selectAll("path")
  .data(["yellow"])  
  .enter()
  .append("path")
    .attr("stroke", function(d) { return d; })
    .style("mix-blend-mode", "darken")
    .datum(function(d, i) {
      

      return d3.radialLine()
          .curve(d3.curveLinearClosed)
          .angle(function(a) { return a; })
          .radius(function(a) {
            var t = d3.now() / 1000;
            return 200 //200
                    + data.currently.temperature/50*Math.cos(a * 4 - i * 2 * Math.PI / 3 + t) 
                    * Math.pow((1 + Math.cos(a - t)) / 2, 3) 
                    * 32;
          });//a-->the bigger the denser
            //i&t --> the delay between lines 1-60
    });
d3.timer(function() {
  blue.attr("d", function(d) {
    return d(angles);
  });
});

d3.timer(function() {
  red.attr("d", function(d) {
    return d(angles);
  });
});

d3.timer(function() {
  yellow.attr("d", function(d) {
    return d(angles);
  });
});
}



