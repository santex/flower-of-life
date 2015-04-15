var tao = 2 * Math.PI;
var t6 = tao/6;

var zero = [0,0];
var p1 = [1,0];

var angleSet = _.map(_.range(6),function(i){ return ((i+1)*t6 - tao/12)});
var firstSet = _.map(angleSet, function(angle){
 return  unit(angle);
});

var secondSet = _.map(_.range(6), function(i){
  return plus(firstSet[i], firstSet[(i+1)%6]);
});

var thirdSet = _.map(firstSet, function(p){ return times(2,p); })

var fourthSet1 = _.map(_.range(6), function(i){
  return plus (firstSet[i], secondSet[i]);
});

var fourthSet2 = _.map(_.range(6), function(i){
  return plus (firstSet[ (i+1) % 6 ], secondSet[i]);
});

var fourthSet3 = _.map(_.range(6), function(i){
  return plus (firstSet[i], thirdSet[i]);
});

var fifthSet1 = _.map(_.range(6), function(i){
  return plus (firstSet[i], fourthSet1[i]);
});

var fifthSet2 = _.map(_.range(6), function(i){
  return plus (firstSet[ (i+1) % 6 ], fourthSet1[i]);
});

var fifthSet3 = _.map(_.range(6), function(i){
  return plus (firstSet[i], fourthSet3[i]);
});

var fifthSet4 = _.map(_.range(6), function(i){
  return plus (firstSet[(i+5)%6], fourthSet3[i]);
});

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
    .attr("r", xScale(1) - xScale(0))
    .attr('clip-path', 'url(#clippy)');
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
