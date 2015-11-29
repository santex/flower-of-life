var w = 600;
var xRange = 5;
var yRange = 5;

var padding = 20;

var xScale = d3.scale.linear()
  .domain([-xRange, xRange])
  .range([padding, w - padding]);

var yScale = d3.scale.linear()
  .domain([-yRange, yRange])
  .range([w - padding, padding]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottum");

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");

var f = d3.format(".2s");

//Create SVG element
var svg = d3.select("#graph")
  .append("svg")
  .attr("width", w)
  .attr("height", w);

svg.append('svg:defs')
  .append('clipPath')
  .attr('id','clippy')
  .append('circle')
  .attr('cx', xScale(0))
  .attr('cy', yScale(0))
  .attr('r', xScale(3)-xScale(0));


// center circle, call it c0
function drawCenterCircle(svg){
  drawUnitCircleAt(svg, zero, "c0");
}

// first set of 6  circles -> seed of life
// call them c1 to c6
function drawFirstSet(svg){
  _.each(_.range(6), function(i){ 
    drawUnitCircleAt(svg, firstSet[i], "first " + "c1" + (i+1)); 
  });
}

// from here we can see six more places to add the next set
// call them c21 through c26
function drawSecondSet(svg){
  _.each(_.range(6), function(i){
    var className = "second " + "c2" + (i + 1);
    drawUnitCircleAt(svg, secondSet[i], className); 
  });
}
// at this point we have 13 circles
// we add six more
// call them c31 through c36
function drawThirdSet(svg){
  _.each(_.range(6), function(i){ 
    var className = "third " + "c3" + (i + 1);
    drawUnitCircleAt(svg, thirdSet[i], className); 
  });
}

// now we have 19 circles
// from here there are twelve more places to add the next set
// for each of the third set now intersects the second set in two
// places
// call them c41 c412
function drawFourthSet(svg){
  _.each(_.range(12), function(i){ 
    var className = "fourth " + "c4" + (i + 1);
    drawUnitCircleAt(svg, fourthSet[i], className); 
  });
}

// okay, we are up to 31
// 18 more in the fifth
// one more for each in the fourth set
// c51 through c512
function drawFifthSet(svg){
  _.each(_.range(18), function(i){ 
    var className = "fifth " + "c5" + (i + 1);
    drawUnitCircleAt(svg, fifthSet[i], className); 
  });
}

// 49
// another 18 in the sixthe set
// c61 -> c618
function drawSixthSet(svg){
  _.each(_.range(18), function(i){ 
    var className = "sixth " + "c6" + (i + 1);
    drawUnitCircleAt(svg, sixthSet[i], className); 
  });
}

function drawSixthTree(svg){
  _.each(_.range(6), function(i){
    var className = "sixth " + "c6" + i;
    drawUnitCircleAt(svg, sixthTree[i], className);
  });
}

function drawFlowerOfLife(svg){
  drawCenterCircle(svg);
  drawFirstSet(svg);
  drawSecondSet(svg);
  drawThirdSet(svg);
  drawFourthSet(svg);
  drawFifthSet(svg);
  drawSixthSet(svg);
}

function drawFruitOfLife(svg){
  _.each(_.range(13), function(i){
    var className = "tree " + i;
    drawUnitCircleAt(svg, fruitOfLife[i], className);
  });
}

function drawTetrahedron1(svg) {
  //drawPolygonWithClass(svg, t10, "polygon t0");
  drawPolygonWithClass(svg, t11, "polygon t1");
  drawPolygonWithClass(svg, t12, "polygon t2");
  drawPolygonWithClass(svg, t13, "polygon t3");
}

function drawTetrahedron2(svg) {
  drawPolygonWithClass(svg, t21, "polygon t0");
  drawPolygonWithClass(svg, t22, "polygon t0");
  drawPolygonWithClass(svg, t23, "polygon t0");
}

function drawStarTetrahedron(svg){
  drawFruitOfLife(svg);
  drawTetrahedron1(svg);
  drawTetrahedron2(svg);
}

function drawCube1(svg) {
  //drawPolygonWithClass(svg, t10, "polygon t0");
  drawPolygonWithClass(svg, cf0, "polygon cf0");
  drawPolygonWithClass(svg, cf1, "polygon cf1");
  drawPolygonWithClass(svg, cf2, "polygon cf2");
}

function drawCube2(svg) {
  drawPolygonWithClass(svg, cf3, "polygon cf3");
  drawPolygonWithClass(svg, cf4, "polygon cf4");
  drawPolygonWithClass(svg, cf5, "polygon cf5");
}

function drawCube(svg) {
  drawFruitOfLife(svg);
  drawCube2(svg);
  drawCube1(svg);
}

function drawIcosohedron1(svg){
  drawPolygonWithClass(svg, of0, "polygon of0");
  drawPolygonWithClass(svg, of1, "polygon of1");
  drawPolygonWithClass(svg, of2, "polygon of2");
  drawPolygonWithClass(svg, of3, "polygon of3");
}

function drawIcosohedron2(svg){
  drawPolygonWithClass(svg, of4, "polygon of4");
  drawPolygonWithClass(svg, of5, "polygon of5");
  drawPolygonWithClass(svg, of6, "polygon of6");
  drawPolygonWithClass(svg, of7, "polygon of7");
}

function drawIcosohedron1(svg) {
  drawFruitOfLife(svg);
  drawIcosohedron2(svg);
  drawIcosohedron1(svg);
}
