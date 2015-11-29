var w = 400;
var h = 400;

var xRange = 2;
var yRange = 2;

var padding = 20;

var xScale = d3.scale.linear()
  .domain([-xRange, xRange])
  .range([padding, w-padding]);

var yScale = d3.scale.linear()
  .domain([-yRange, yRange])
  .range([h-padding, padding]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottum")
  .ticks(4);

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(4);

var f = d3.format(".4s");

//Create SVG element
var svg = d3.select("#graph")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

function mod(z) {
  return Math.sqrt(z[0]*z[0]+z[1]*z[1]);
}

function arg(z) {
  return Math.atan(z[1]/z[0]);
}

function fromPolar(r,theta){
  var x = r * Math.cos(theta);
  var y = r * Math.sin(theta);
  return [x,y];
}

function inverse(z) {
  return fromPolar(1/mod(z), -arg(z));
}

function plus(p1, p2) {
  return [p1[0]+p2[0], p1[1]+p2[1]];
}

drawAxis(svg);
drawUnitCircle(svg);

function addNumberToSvg(z1){
  var dataset = calculateData(z1);
  console.log(dataset);
  addToDataDiv(dataset);

  svg.selectAll('line.dashed').remove();
  svg.selectAll('g.point').remove();

  var points = svg.selectAll("g.point")
    .data(dataset);

  points
    .enter()
    .append("g")
    .attr('class', 'point');

  points
    .append('circle')
    .attr("cx", function(d){
      return xScale(d.val[0]);
    })
    .attr("cy", function(d){
      return yScale(d.val[1]);
    })
    .attr("r", 2)
    .attr("class", function(d,i){
      return "z" + i;
    });

  points.exit().remove();

  points
    .append('line')
    .attr('x1', xScale(0))
    .attr('y1', yScale(0))
    .attr('x2', function(d) { return xScale(d.val[0]); })
    .attr('y2', function(d) { return yScale(d.val[1]); })
    .attr('class', function(d,i) { return "z" + i; });
  
  // complete paralleogram z1 -> z3
  // z2 -> z3 dashed lines
  var z2 = dataset[1].val;
  var z3 = dataset[2].val;

  svg
    .append('line')
    .attr('x1', function(d) { return xScale(z1[0]); })
    .attr('y1', function(d) { return yScale(z1[1]); })
    .attr('x2', function(d) { return xScale(z3[0]); })
    .attr('y2', function(d) { return yScale(z3[1]); })
    .attr('class', 'dashed')

  svg
    .append('line')
    .attr('x1', function(d) { return xScale(z2[0]); })
    .attr('y1', function(d) { return yScale(z2[1]); })
    .attr('x2', function(d) { return xScale(z3[0]); })
    .attr('y2', function(d) { return yScale(z3[1]); })
    .attr('class', 'dashed')
}

function addToDataDiv(dataset) {
  var divs = d3.select("div#data")
    .selectAll("p")
    .data(dataset);

  divs
    .enter()
    .append("p")
  .attr('class', function(d,i) { return "z" + i; });

  divs
    .text(function(d, i) {
      return  d.name + " = " + "["+f(d.val[0])+","+f(d.val[1])+"]";
    });
}

function logPoint(n,z){
  console.log(n + "= " + "[" + f(z[0]) + "," + f(z[1]) + "]");
  console.log("r = " + f(mod(z)));
  console.log("angle = " + f(arg(z)));
}

function calculateData(z1) {
  logPoint("z", z1);
  var z2 = [-z1[0], -z1[1]];
  logPoint("-z", z2);

  var z3 = [z1[0], -z1[1]];
  logPoint("bar z", z3);

  var z4 = inverse(z1);
  logPoint("1/z", z4);

  var dataset = [{name: "z",
                 val: z1},
                 {name: "-z",
                 val: z2},
                 {name: "conj z",
                 val: z3},
                 {name: "1/z",
                 val: z4}];
  return dataset;
}

function drawAxis(svg) {
  svg.append("g")
    .attr("class", "axis")  //Assign "axis" class
    .attr("transform", "translate(0," + h/2 + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + w/2 + ",0)")
    .call(yAxis);
}

function drawUnitCircle(svg) {
  svg.append("g")
    .attr("class", "unit")
  .append('circle')
    .attr("cx", xScale(0))
    .attr("cy", yScale(0))
    .attr("r", xScale(1) - xScale(0));
}

addNumberToSvg([-1, 1]);
