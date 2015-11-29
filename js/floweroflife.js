var w = 400;
var xRange = 3;
var yRange = 3;

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

svg.append('circle')
  .attr("class", "circle ")
  .attr('cx', xScale(0))
  .attr('cy', yScale(0))
  .attr('r', xScale(3)-xScale(0));


drawUnitCircleAt(svg, zero, "center");
_.each(firstSet, function(p){ drawUnitCircleAt(svg, p, "first"); })
_.each(secondSet, function(p){ drawUnitCircleAt(svg, p, "second"); })
_.each(thirdSet, function(p){ drawUnitCircleAt(svg, p, "third"); })
_.each(fourthSet1, function(p){ drawUnitCircleAt(svg, p, "fourth"); })
_.each(fourthSet2, function(p){ drawUnitCircleAt(svg, p, "fourth"); })
_.each(fourthSet3, function(p){ drawUnitCircleAt(svg, p, "fourth"); })
_.each(fifthSet1, function(p){ drawUnitCircleAt(svg, p, "fiftha"); })
_.each(fifthSet2, function(p){ drawUnitCircleAt(svg, p, "fifthb"); })
_.each(fifthSet3, function(p){ drawUnitCircleAt(svg, p, "fifthc"); })
_.each(fifthSet4, function(p){ drawUnitCircleAt(svg, p, "fifthd"); })
