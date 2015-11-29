
var w = window.innerWidth*0.65;
var xRange = 5;
var yRange = 5;
var iteration = 0;
var padding = 0;

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

var circleSet = [];
var data;
var treeData;
var metaData;
var tetraData;
var cubeData;
var octoData;

function animate() {
  circleSet.push(data.shift());
  render(circleSet);
  if (data.length > 0) {
    setTimeout(animate, 200);
  } else {
    getTree();
  }
}

function animateTree() {
  render(treeData);
  setTimeout(getMetatron, 1800);
}

d3.json("data/flower.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;
  animate();
});

function getTree() {
  d3.json("data/tree.json", function(error, json) {
    if (error) return console.warn(error);
    treeData = json;
    setTimeout(animateTree, 2000);
  });
}

function animateMeta(metaData) {
  renderLines(metaData);
  setTimeout(getTetrahedra, 2000);
}

function getMetatron() {
  d3.json("data/metatron.json", function(error, json) {
    if (error) return console.warn(error);
    metaData = json
    animateMeta(metaData);
  });
}

function animateTetra(tetraData) {
  renderFaces(tetraData);
  // animate color of faces
  setTimeout(cycle, 400);
  // setTimeout(getCube, 2000);
}

function getTetrahedra() {
  d3.json("data/tetrahedra.json", function(error, json) {
    if (error) return console.warn(error);
    tetraData = json
    animateTetra(tetraData);
  });
}

function animateCube(cubeData) {
  renderCubeFaces(cubeData);
  // animate color of faces
  setTimeout(cycleCube, 800);
  //setTimeout(getOcto, 2000);
}

function getCube() {
  d3.json("data/cube.json", function(error, json) {
    if (error) return console.warn(error);
    cubeData = json
    animateCube(cubeData);
  });
}

function animateOcto(octoData) {
  renderOctoFaces(octoData);
  // animate color of faces
  //setTimeout(cycleOcto, 400);
}

function getOcto() {
  d3.json("data/octohedra.json", function(error, json) {
    if (error) return console.warn(error);
    octoData = json;
    animateOcto(octoData);
  });
}

function name(d) {
  return d.name;
}

function render(data) {
  var groups = svg.selectAll("g.circle")
    .data(data, name);

  groups.enter()
    .append("g");

  groups.attr("class", function(d) {
    return "circle " + d.name;
  });

  groups.exit().remove();

  var circles = groups.selectAll("circle")
    .data(function(d){
      return d.circles;
    });

  circles.enter().append("circle");

  circles
    .attr("r", xScale(1) - xScale(0))
    .attr("cx", function(d){
      return xScale(d.re);
    })
    .attr("cy", function(d){
      return yScale(d.im);
    });

  circles
    .exit()
    .remove();
}

function renderLines(data) {
  var groups = svg.selectAll("g.line")
    .data(data, name);

  groups.enter().append("g");

  groups.attr("class", function(d) {
    return "line " + d.name;
  });

  groups.exit().remove();

  var lines = groups.selectAll("line")
  .data(function(d) {
    return d.lines;
  });

  lines.enter().append("line");

  lines.attr("x1", function(d,i) {
    return xScale(d[0].re);
  })
  .attr("y1", function(d) {
    return yScale(d[0].im);
  })
  .attr("x2", function(d) {
    return xScale(d[1].re);
  })
  .attr("y2", function(d) {
    return yScale(d[1].im);
  });
}

function renderFaces(data){

  var circles = svg.selectAll(".circle").transition().attr("style", "fill:none");
  
  var tetrahedra = svg.selectAll("g.tetrahedron")
    .data(data, name);

  tetrahedra.enter().append("g");

  tetrahedra.attr("class", function(d) {
    return "tetrahedron " + d.name;
  });

  var faces = tetrahedra.selectAll("face")
  .data(function(d) {
    return d.faces;
  });

  faces.enter().append("polygon");

  faces.attr("points", function(d) {
    var points = _.flatten(
      _.map(d.points, function(c) {
        return [xScale(c.re), yScale(c.im)];
      }));
    return points.join(", ");
  })
    .attr("class", function(d){
      return d.color;
    })
    .attr("id", function(d){
      return d.name;
    });
  
  tetrahedra.exit().remove();

}

function renderCubeFaces(data){

  var circles = svg.selectAll(".circle").transition().attr("style", "fill:none");

  // remove tetrahedra
  var tetrahedra = svg.selectAll("g.tetrahedron")
    .data([], name);
  tetrahedra.exit().remove();

  var cube = svg.selectAll("g.cube")
    .data(data, name);

  cube.enter().append("g");

  cube.attr("class", function(d) {
    return "cube " + d.name;
  });

  var faces = cube.selectAll("face")
  .data(function(d) {
    return d.faces;
  });

  faces.enter().append("polygon");

  faces.attr("points", function(d) {
    var points = _.flatten(
      _.map(d.points, function(c) {
        return [xScale(c.re), yScale(c.im)];
      }));
    return points.join(", ");
  })
    .attr("class", function(d){
      return d.color;
    })
    .attr("id", function(d){
      return d.name;
    });
  
  cube.exit().remove();

}

function renderOctoFaces(data){

  // remove cobe
  var cube = svg.selectAll("g.cube")
    .data([], name);
  cube.exit().remove();

  var octo = svg.selectAll("g.octo")
    .data(data, name);

  octo.enter().append("g");

  octo.attr("class", function(d) {
    return "octo " + d.name;
  });

  var faces = octo.selectAll("face")
  .data(function(d) {
    return d.faces;
  });

  faces.enter().append("polygon");

  faces.attr("points", function(d) {
    var points = _.flatten(
      _.map(d.points, function(c) {
        return [xScale(c.re), yScale(c.im)];
      }));
    return points.join(", ");
  })
    .attr("class", function(d){
      return d.color;
    })
    .attr("id", function(d){
      return d.name;
    });
  
  octo.exit().remove();

}

function cycle(){
  var tetrahedra = svg.selectAll(".tetrahedron");

  var r = tetrahedra.selectAll(".r");
  var g = tetrahedra.selectAll(".g");
  var b = tetrahedra.selectAll(".b");

  var m = tetrahedra.selectAll(".m");
  var c = tetrahedra.selectAll(".c");
  var y = tetrahedra.selectAll(".y");

  r.attr("class", "g");
  g.attr("class", "b");
  b.attr("class", "r");
  m.attr("class", "y");
  c.attr("class", "m");
  y.attr("class", "c");

  // repeaet
  if (iteration < 10) {
    setTimeout(cycle,200);
    iteration += 1;
  } else {
    iteration = 0;
    getCube();
  }
  
}

function cycleCube(){
  var ci = svg.selectAll(".ci");

  var ri = ci.selectAll(".r");
  var gi = ci.selectAll(".g");
  var bi = ci.selectAll(".b");

  var mi = ci.selectAll(".m");
  var ci = ci.selectAll(".c");
  var yi = ci.selectAll(".y");


  ri.attr("class", "g");
  gi.attr("class", "b");
  bi.attr("class", "r");
  mi.attr("class", "y");
  ci.attr("class", "m");
  yi.attr("class", "c");

  var co = svg.selectAll(".co");

  var ro = co.selectAll(".r");
  var go = co.selectAll(".g");
  var bo = co.selectAll(".b");

  var mo = co.selectAll(".m");
  var co = co.selectAll(".c");
  var yo = co.selectAll(".y");

  ro.attr("class", "b");
  bo.attr("class", "g");
  go.attr("class", "r");
  mo.attr("class", "c");
  co.attr("class", "y");
  yo.attr("class", "m");

  // repeaet
  if (iteration < 500) {
    setTimeout(cycleCube, 25);
    iteration += 1;
  }

}
