var repair = require('./repair.js');

//Creates a grid mesh
function grid_mesh(nx, ny) {
  var positions = new Array((nx+1) * (ny+1));
  for(var j=0; j<=ny; ++j) {
    for(var i=0; i<=nx; ++i) {
      positions[i + (nx+1)*j] = [i, j, 0];
    }
  }
  
  function p(x,y) { return x + (nx+1)*y; };
  
  var faces     = [];
  for(var j=0; j<ny; ++j) {
    for(var i=0; i<nx; ++i) {
      faces.push([ p(i,j), p(i+1, j), p(i, j+1) ]);
      faces.push([ p(i+1,j), p(i+1,j+1), p(i,j+1) ]);
    }
  }

  return {positions: positions, faces: faces};
}

//Creates a cubical mesh
function cube_mesh(res, scale) {

  var radius = res >> 1;
  var side_len = 2*res + 1;
  function p(x,y,s) { 
    return x + side_len * (y + side_len * s); 
  }
  
  var positions = new Array(6 * side_len * side_len);
  var faces = [];  
  
  for(var d=0; d<3; ++d) {
    var u = (d+1)%3;
    var v = (d+2)%3;
    
    for(var s=0; s<2; ++s) {
      var f = 2*d + s;
      var x = new Array(3);
      
      x[u] = -radius;
      x[v] = -radius;
      x[d] = (1 - 2*s) * radius;
    
      for(var j=0; j<=side_len; ++j, ++x[v])
      for(var i=0; i<=side_len; ++i, ++x[u]) {
      
        var pos = new Array(3);
        for(var k=0; k<3; ++k) {
          pos[k] = x[k] * scale[k] / radius;
        }
      
        positions[p(i, j, f)] = pos;
        
        if(i < side_len && j<side_len) {
          faces.push([ p(i,j,f), p(i+1,j,f), p(i,j+1,f) ]);
          faces.push([ p(i+1,j,f), p(i,j+1,f), p(i+1,j+1,f) ]);
        }
      }
    }
  }

  return repair.fuse_vertices({positions: positions, faces: faces});
};


function sphere_mesh(radius) {
  var base = cube_mesh(radius);
  
  for(var i=0; i<base.positions.length; ++i) {
    var p = base.positions[i];
    var l = 0.0;
    for(var j=0; j<3; ++j) {
      l += p[j] * p[j];
    }
    l = 1.0 / Math.sqrt(l);
    for(var j=0; j<3; ++j) {
      p[j] *= l
    }
  }
  
  return base;
}


exports.grid_mesh = grid_mesh;
exports.cube_mesh = cube_mesh;
exports.sphere_mesh = sphere_mesh;
