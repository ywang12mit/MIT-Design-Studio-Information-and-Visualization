//plots

var scaleImg=d3.scaleOrdinal().domain(["rain","snow","partly-cloudy-day","cloudy"]).range(["drop1.png","snow.png","ray.png","blkcloud1.png"]);
var color="#F24435";
//document.querySelector('feed').style.color = color;
///////d3 format time / formatTime("%A")

// var url = 'https://api.darksky.net/forecast/c6b293fcd2092b65cfb7313424b2f7ff/42.361145,-71.057083'

$.ajax({
        url: 'https://api.darksky.net/forecast/bb63e4043af6c2c825eab7f0fac896e0/42.361145,-71.057083',
        dataType: 'JSONP',
        type: 'GET',
        crossDomain: true,
        complete: function (data) {
        if (data.readyState == '4' && data.status == '200') {
        draw(data.responseJSON)
        completeonsole.log(data.responseJSON)
        } else {
        console.log("DATA FETCH FAILED")
        }
        }
        })
       ;

function draw(data){
	var formatTime = d3.timeFormat("%a %b %d");
	
	for (var i=1; i<7; i++){

	
	d3.select("#day"+i).html(formatTime(data.daily.data[i-1].time*1000));
	d3.select("#lhtemp"+i).html(Math.round(data.daily.data[i-1].temperatureLow* 10 ) / 10 + "\xB0 - " + Math.round(data.daily.data[i-1].temperatureHigh* 10 ) / 10+"\xB0");
	//d3.select("#icon"+i).html(scaleImg(data.daily.data[i-1].icon));
	
	
	document.getElementById("icon"+i).src=scaleImg(data.daily.data[i-1].icon);




	
	
	}
	// d3.select("#alert").html(data.alerts[0].title);
	d3.select("#alert").html(data.hourly.summary);
	d3.select("#ctemp").html(data.currently.temperature +"\xB0");
	document.getElementById("cicon").src=scaleImg(data.currently.icon);
	d3.select("#clh").html(data.daily.data[0].temperatureLow + "\xB0 - " + data.daily.data[0].temperatureHigh +"\xB0");
	d3.select("#per").html(data.currently.apparentTemperature+"\xB0");
	d3.select("#pro").html(Math.round(data.currently.precipProbability*100* 10 ) / 10+"%");
	d3.select("#win").html(Math.round(data.currently.windSpeed * 10 ) / 10+"mph");
	
	
console.log(scaleImg(data.daily.data[0].icon));
	
	//d3.append()

	//d3.select("#ctemp").html(data.currently.icon);
	//document.getElementById("#ctemp").html(data.currently.icon);

}


