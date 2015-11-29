var tao = 2 * Math.PI;
var t6 = tao/6;

var zero = [0,0];
var p1 = [1,0];

var angleSet = _.map(_.range(6),function(i){ return ((i+1)*t6 - tao/12)});
var firstSet = _.map(angleSet, function(angle){
 return unit(angle);
});

var secondSet = _.map(_.range(6), function(i){
  return plus(firstSet[i], firstSet[(i+1)%6]);
});

var thirdSet = _.map(firstSet, function(p){ return times(2,p); })
var thirdSet1 = [thirdSet[0], thirdSet[2], thirdSet[4]];
var thirdSet2 = [thirdSet[1], thirdSet[3], thirdSet[5]];

// 12 circles in fourth set
// each circle in third set yields 2 more circles
// we will do it in two steps, for now
var fourth1 = _.map(_.range(6), function(i){
  var c1 = plus (thirdSet[i], firstSet[ (i+5) % 6 ]);
  var c2 = plus (thirdSet[i], firstSet[ (i+1) % 6 ]);
  return [c1, c2];
});

var fourthSet = _.flatten(fourth1,true);

// we will take two for each odd member of the fifth
// and then flatten
var fifth1 = _.map(_.range(6), function(i){
  var j = 2*i+1;
  var c1 = plus (fourthSet[j], firstSet[(i+5) % 6]);
  var c2 = plus (fourthSet[j], firstSet[i]);
  var c3 = plus (fourthSet[j], firstSet[(i+1) % 6]);
  return [c1, c2, c3];
});

var fifthSet = _.flatten(fifth1, true);

// in the sixth, it takes two to reach next three 
var sixth1 = _.map(_.range(6), function(i){
  var j = 3 * i;
  var k = j + 1;
  var c1 = plus(fifthSet[j], firstSet[(i+5)%6]);
  var c2 = plus(fifthSet[k], firstSet[(i+5)%6]);
  var c3 = plus(fifthSet[k], firstSet[(i+2)%6]);
  return [c1, c2, c3];
});
var sixthSet = _.flatten(sixth1, true);

var sixthTree = _.map(_.range(6),function(i){
  var j = (3*i)+1;
  return sixthSet[j];
});
var sixthTree1 = [sixthTree[0], sixthTree[2], sixthTree[4]];
var sixthTree2 = [sixthTree[1], sixthTree[3], sixthTree[5]];
var sixl1 = [sixthTree[1], zero];
var sixl2 = [sixthTree[3], zero];
var sixl3 = [sixthTree[5], zero];

var fruitOfLife = L.cat([zero], thirdSet, sixthTree);

// tetrahedron1
// base triangle and three sides
var t10 = [sixthTree[1], sixthTree[3], sixthTree[5]];
var t11 = [zero, sixthTree[1], sixthTree[3]];
var t12 = [zero, sixthTree[3], sixthTree[5]];
var t13 = [zero, sixthTree[5], sixthTree[1]];
var t21 = [sixthTree[2], thirdSet[1], thirdSet[3]];
var t22 = [sixthTree[4], thirdSet[3], thirdSet[5]];
var t23 = [sixthTree[0], thirdSet[5], thirdSet[1]];

// cube
// six faces
// cf0 -> cf5
var cf0 = [zero, sixthTree[0], sixthTree[1], sixthTree[2]];
var cf1 = [zero, sixthTree[2], sixthTree[3], sixthTree[4]];
var cf2 = [zero, sixthTree[4], sixthTree[5], sixthTree[0]];
var cf3 = [zero, sixthTree[5], sixthTree[0], sixthTree[1]];
var cf4 = [zero, sixthTree[1], sixthTree[2], sixthTree[3]];
var cf5 = [zero, sixthTree[3], sixthTree[4], sixthTree[5]];

// octohedron
// eight triangulatr faces
// of0 -> of7
var of0 = [sixthTree[0], sixthTree[2], sixthTree[4]];
var of1 = [sixthTree[0], sixthTree[1], sixthTree[2]];
var of2 = [sixthTree[2], sixthTree[3], sixthTree[4]];
var of3 = [sixthTree[0], sixthTree[4], sixthTree[5]];
var of4 = [sixthTree[0], sixthTree[1], sixthTree[5]];
var of5 = [sixthTree[1], sixthTree[3], sixthTree[2]];
var of6 = [sixthTree[3], sixthTree[4], sixthTree[5]];
var of7 = [sixthTree[1], sixthTree[3], sixthTree[5]];

var f = d3.format(".2s");

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

function unit(theta){
  return fromPolar(1,theta);
}

function radiansToDegrees(radians){
  var degrees = 180 * (radians/Math.PI);
  return degrees;
}

function inverse(z) {
  return fromPolar(1/mod(z), -arg(z));
}

function plus(p, q){
  return [p[0]+q[0],p[1]+q[1]];
}

function times(s, p){
  return [s*p[0],s*p[1]];
}

function logPoint(z){
  console.log("[" + f(z[0]) + "," + f(z[1]) + "]");
  console.log("r = " + f(mod(z)));
  console.log("angle = " + radiansToDegrees(arg(z)));
}

function drawUnitCircleAt(svg, pos, className) {
  svg.append("g")
    .attr("class", "circle " + className)
  .append('circle')
    .attr("cx", xScale(pos[0]))
    .attr("cy", yScale(pos[1]))
    .attr("r", xScale(1) - xScale(0));
}

function drawAxis(svg) {
  svg.append("g")
    .attr("class", "axis")  //Assign "axis" class
    .attr("transform", "translate(0," + w/2 + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + w/2 + ",0)")
    .call(yAxis);
}

// metatrons cube
// inner to inner
var ci = thirdSet;

var innerToInner = [
{
  p: ci[0],
  ps: [ci[1], ci[2], ci[3], ci[4], ci[5]]
},
{
  p: ci[1],
  ps: [ci[2], ci[3], ci[4], ci[5]]
},
{
  p: ci[2],
  ps: [ci[3], ci[4], ci[5]]
},
{
  p: ci[3],
  ps: [ci[4], ci[5]]
},
{
  p: ci[4],
  ps: [ci[5]]
}];

var co = sixthTree;
var outerToOuter = [
{
  p: co[0],
  ps: [co[1], co[2], co[3], co[4], co[5]]
},
{
  p: co[1],
  ps: [co[2], co[3], co[4], co[5]]
},
{
  p: co[2],
  ps: [co[3], co[4], co[5]]
},
{
  p: co[3],
  ps: [co[4], co[5]]
},
{
  p: co[4],
  ps: [co[5]]
}];

var outerToInner = [
{
  p: co[0],
  ps: [ci[1], ci[2], ci[3], ci[4], ci[5]]
},
{
  p: co[1],
  ps: [ci[2], ci[3], ci[4], ci[5], ci[0]]
},
{
  p: co[2],
  ps: [ci[3], ci[4], ci[5], ci[0], ci[1]]
},
{
  p: co[3],
  ps: [ci[4], ci[5], ci[0], ci[1], ci[2]]
},
{
  p: co[4],
  ps: [ci[5], ci[0], ci[1], ci[2], ci[3]]
},
{
  p: co[5],
  ps: [ci[0], ci[1], ci[2], ci[3], ci[4]]
}];

// connect given two points
function drawLine(svg, p1, p2, className) {
  svg.append("line")
    .attr("x1", xScale(p1[0]))
    .attr("y1", yScale(p1[1]))
    .attr("x2", xScale(p2[0]))
    .attr("y2", yScale(p2[1]))
    .attr("class", className);
}

// connect initial point to each point in points array
function drawFromPointToPoints(svg, p, ps, className) {
  _.each(ps, function(pn){
    drawLine(svg, p, pn, className);
  });
}

function drawPolygonWithClass(svg, points, className) {
  // turn array of points into a string and add it to svg as a polygon
  var pointsString = "";
  console.log(points);
  _.each(points, function(point){
    var pointString = xScale(point[0]) + ", " + yScale(point[1]) + " ";
    console.log(className);
    console.log(pointString);
    pointsString = pointsString + pointString;
  });
  svg.append("polygon")
    .attr("points", pointsString)
    .attr("class", className);
};

// metatrons cube
function drawInnerToInner(svg) {
  var i = 0;
  _.each(innerToInner, function(row){
    var className = "line outer " + i;
    i = i+1;
    drawFromPointToPoints(svg, row.p, row.ps, className);
  });
}

function drawOuterToOuter(svg) {
  var i = 0;
  _.each(outerToOuter, function(row){
    var className = "line outer " + i;
    i = i+1;
    drawFromPointToPoints(svg, row.p, row.ps, className);
  });
}

function drawOuterToInner(svg) {
  var i = 0;
  _.each(outerToInner, function(row){
    var className = "line outerinner " + i;
    i = i+1;
    drawFromPointToPoints(svg, row.p, row.ps, className);
  });
}

function drawMetatronsCube(svg) {
  drawFruitOfLife(svg)
  drawInnerToInner(svg);
  drawOuterToInner(svg);
  drawOuterToOuter(svg);
}
