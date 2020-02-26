let elt = d3.select("#myDiv");
let svg  = elt.append("svg")
               .attr("width", "100%")
               .attr("height", "120");

for (let i = 1 ; i < 4 ; i++) {
    svg.append("circle")
       .attr("fill", "blue")
       .attr("cx", 70 * i)
       .attr("cy", 40)
       .attr("r", 20 + i*5);
}


