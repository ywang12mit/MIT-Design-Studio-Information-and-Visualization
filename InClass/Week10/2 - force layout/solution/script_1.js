var maxSize = 150;
var paddingBox = 50;

//plot
var margin = {t: paddingBox, r: paddingBox, b: paddingBox, l: paddingBox};
var width = document.getElementById('plot1').clientWidth - margin.r - margin.l,
    height = document.getElementById('plot1').clientHeight - margin.t - margin.b;

// Append svg to div
var plot1 = d3.select('#plot1') // if we select a html id #name, if we select a class .name
    .append('svg')
    .attr('width', width + margin.r + margin.l)
    .attr('height', height + margin.t + margin.b);

//create groups to put the content inside them
var plotNode = plot1.append('g').attr('transform', 'translate(' + margin.l + ',' + margin.t + ')').attr('class', 'tree node').selectAll(".cartogram");
var plotName = plot1.append('g').attr('transform', 'translate(' + margin.l + ',' + margin.t + ')').attr('class', 'tree node').selectAll(".names");

var formatNumber = d3.format(".2");
var blue = "#66b2c5";
var yellow = "#ffb400";
var red = "#c63232";
var green = "#72a746";
var center = [-95.7129,37.0902];
var lonLats = [{zone: "Northeast", lonlat: [-74.2179,43.2994]},
    {zone: "Midwest",lonlat:[-106.2800,43.4114]},
    {zone:"South",lonlat:[-81.163727,33.836082]},
    {zone:"West",lonlat:[-119.417931,36.778259]},
    {zone:"New England",lonlat:[-70.8227,43.9654]},
    {zone:"Middle Atlantic",lonlat:[-77.1945,41.2033]},
    {zone:"East North Central",lonlat:[-87.623177,41.881832]},
    {zone:"West North Central",lonlat:[-99.9018,41.4925]},
    {zone:"South Atlantic",lonlat:[-81.5158,27.6648]},
    {zone:"East South Central",lonlat:[-86.5804,35.5175]},
    {zone:"West South Central",lonlat:[-99.9018,31.9686]},
    {zone:"Mountain",lonlat:[-111.0937,39.3210]},
    {zone:"Pacific",lonlat:[-119.4179,36.7783]}
];



var padding = 1;

//projection
var projection = d3.geoAlbersUsa()
    .translate([(width/2),(height/2)]);


// queue data files, parse them and use them
var queue = d3.queue()
    .defer(d3.csv, "../data/Households_by_total_money_income.csv", parseData)

    .await(dataloaded);

function dataloaded (err,data){



    // data with which we're going to work
    var regions = data.filter(function(d){return d.metric === "Region/Divisions" && d.second_category === "Total"});
    var divisions = data.filter(function(d){return d.metric === "Region/Divisions" && d.second_category !== "Total"});
    var extentTotal = d3.extent(data,function(d){return d.total});
    var scaleRadius = d3.scaleSqrt().domain(extentTotal).range([25,maxSize]);
    var scaleColor = d3.scaleOrdinal().domain(["Northeast","Midwest","South","West"]).range([blue,green,yellow,red]);

    // find longitude and latitude of regions
    regions.forEach(function(d){

        for (var i=0;i<lonLats.length;i++){

            if (lonLats[i].zone === d.first_category){

                d.x = projection(lonLats[i].lonlat)[0];
                d.y = projection(lonLats[i].lonlat)[1];
                d.r = scaleRadius(d.total)
            }
        }
    });

    // find longitude and latitude of regions
    divisions.forEach(function(d){

        for (var i=0;i<lonLats.length;i++){

            if (lonLats[i].zone === d.second_category){
                d.x = projection(lonLats[i].lonlat)[0];
                d.y = projection(lonLats[i].lonlat)[1];
                d.r = scaleRadius(d.total)
            }
        }
    });


    draw(regions);

    function draw(_thisData){

        var padding = 1.5; // separation between same-color nodes

        //TODO: create a force layout

        //force cluster
        // group the center of the clusters in a different array
        var clusters = [];

        _thisData.forEach(function (_node) {
            var clusterID = _node.first_category;
            if (!clusters[clusterID] || (_node.r > clusters[clusterID].r)) {
                clusters[clusterID] = _node;
            }
        });

        //create the force that will attract the points to the center
        var forceCluster = d3.forceCluster()
            .centers(function (d) {
                var _thisCenter = clusters[d.first_category];
                return (_thisCenter.x,_thisCenter.y); })
            .strength(1)

        // keep entire simulation balanced around screen center
        var forceCenter = d3.forceCenter(width/2, height/2);

        //apply collision with padding
        var forceCollide = d3.forceCollide().strength(1)
            .radius(function (d) { return d.r + padding; })
            .iterations(1);


        //force layout
        // //according to https://bl.ocks.org/ericsoco/4e1b7b628771ae77753842e6dabfcef3
        var simulation = d3.forceSimulation()
            // .force("charge", d3.forceManyBody().strength(-50))
            // .force("forceX", d3.forceX().strength(.04))
            // .force("forceY", d3.forceY().strength(.04))
            .force('center', forceCenter)
            .force("cluster", forceCluster)
            .alphaTarget(1)
            .on("tick", tick);


        reStart();

        function reStart(){
            // transition
            var t = d3.transition()
                .duration(500);

            plotNode = plotNode
                .data(_thisData,function(d){return d.second_category});

            //exit() remove previous bubbles
            plotNode.exit().transition(t).attr("r",1e-6).remove();

            //enter()
            plotNode = plotNode
                .enter()
                .append("circle")
                .attr("class","cartogram")
                .style('fill-opacity',.7)
                .style("fill", function(d){return scaleColor(d.first_category)})
                .attr("r",function(d){return d.r})
                .merge(plotNode);

            plotName = plotName
                .data(_thisData,function(d){return d.second_category});

            //exit()
            plotName.exit().transition(t).attr("opacity",0).remove();

            //enter()
            plotName = plotName
                .enter()
                .append("text")
                .text(function(d){return d.second_category})
                .attr("text-anchor","middle")
                .attr("class","name")
                .style("fill", "#333")
                .merge(plotName);



            //there is no update as the bubbles are always broken into new ones when the data is changed

            // Update and restart the simulation.
            simulation
                .force("collide", forceCollide)
                .nodes(_thisData).alpha(1);

        }



        function tick() {
            plotNode
                .attr("cx", function (d) {return d.x})
                .attr("cy", function (d) {return  d.y});

            plotName
                .attr("x", function (d) {return d.x})
                .attr("y", function (d) {return  d.y});


        }


    }

    d3.select("#regions").on("click",function(){
        draw(regions)
    });
    d3.select("#divisions").on("click",function(){
        draw(divisions)
    });


}

function parseData(d){

    return {
        metric: d.Metric,
        first_category: d["Main category"],
        second_category: d["Characteristic"],
        total: +d.Total,
        // median_income: +d["Median income Value"],
        // mean_income: +d["Mean income Value"],
        // member_income: +d["Income per household member Value"],
    }
}

