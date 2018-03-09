 // $.ajax({
 //            url: 'https://api.darksky.net/forecast/bb63e4043af6c2c825eab7f0fac896e0/42.361145,-71.057083',
 //        dataType: 'JSONP',
 //        type: 'GET',
 //        crossDomain: true,
 //        complete: function (data) {
 //        if (data.readyState == '4' && data.status == '200') {
 //        draw(data.responseJSON)
 //        completeonsole.log(data.responseJSON)
 //        } else {
 //        console.log("DATA FETCH FAILED")
 //        }
 //        }
 //        });
    

d3.json("../data/boston_weather.json",draw);


function draw(data){

var canvas = d3.select("svg"),
    width = +canvas.attr("width"),
    height = +canvas.attr("height"),
    angles = d3.range(0, 2 * Math.PI, Math.PI / 50);//the smaller the slower

var group = canvas.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")") //circle position
    .attr("fill", "none")
    .attr("stroke-width", 10)
    .attr("stroke-linejoin", "round") // rounded lines, not sharp
  

  .selectAll("path")
  .data(["cyan", "magenta", "yellow"])  
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
            return (data.currently.time)/10000000 //200
                    + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) 
                    * Math.pow((1 + Math.cos(a - t)) / 2, 3) 
                    * 32;
          });//a-->the bigger the denser
            //i&t --> the delay between lines 1-60
    });

d3.timer(function() {
  group.attr("d", function(d) {
    return d(angles);
  });
});
}



