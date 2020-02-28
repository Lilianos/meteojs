var meteo = [];

var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = window.innerWidth - margin.left - margin.right 
  , height = window.innerHeight - margin.top - margin.bottom; 
var n = meteo.length;

d3.json('data/meteo.json').then(function(LoadData) {
	meteo = LoadData // charge les données météo.

});

var xScale = d3.scaleLinear()
    .domain([0, n-1]) // input
    .range([0, width]); // output

var yScale = d3.scaleLinear()
    .domain([0, 1]) // input 
    .range([height, 0]); // output 

var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = d3.range(meteo).map(function(d) {
	return {"y": meteo.t } });
console.log(dataset);

const graph = d3.select("#mouseover_linechart").append("graph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," 
	+ margin.top + ")");




// 3. Call the x axis in a group tag
graph.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
graph.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

graph.append("path")
    .datum(dataset) 
    .attr("class", "line") 
    .attr("d", line); 

graph.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") 
    .attr("class", "dot") 
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
	.on("mouseover", function(d) {
		div.transition()
				.duration(200)
				.style("opacity", .9);
			div.html("Pluviométrie : " + d.y)
			.style("left", (d3.event.pageX + 30) + "px")
			.style("top", (d3.event.pageY - 30) + "px")
			//console.log(d);
		});
		
	var div = d3.select("body").append("Chart")
		.attr("class", "tooltip")
		.style("opacity", 0);
		
