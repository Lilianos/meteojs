var data = [];
let elt = d3.select("#myDiv");
let svg  = elt.append("svg")
    .attr("width", "100%")
    .attr("height", "120");

var request = d3.json("data/meteo.json")
    .then(drawCircles).catch(console.error);

function drawCircles(d) {
	console.log(d);
    data = d;
    update();
}



function update() {
    //3.1 Créons une sélection d3 de cercles
    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cy", 60) // Le centre du cercle à 60px du haut de mon SVG
        .attr("cx", (data, idx) => { // Les cercles seront séparés de 100px
            return idx * 100 + 30;
        })
        .attr("r", data => { // le rayon du cercle sera le racine carré de la valeur
            return Math.sqrt(data);
        })
		.attr("id",data)
		.on("mouseover", FatCircle)
		.on("click",function(){
		removeCircle(this.id);
		})
        .attr("fill", "magenta"); 
}   


function addCircle()
{
	data.push(Math.floor(Math.random() * 150));
	update();
	
}

function removeCircle(pos)
{
	data.splice(pos,1);
	update();
	console.log("ok: "+pos);
	
}
function FatCircle()
{
	
}