"use strict";

//Fuses vertices in a mesh to remove cracks
function fuse_vertices(mesh, tol) {  
  if(!tol) {
    tol = 1e-6;
  }
  
  //First, fuse vertices together
  var grid        = {};
  var n_positions = [];
  var n_index     = new Array(mesh.positions.length);
  for(var i=0; i<mesh.positions.length; ++i) {

    var p = mesh.positions[i];
    var r = new Array(3);
    for(var j=0; j<3; ++j) {
      r[j] = Math.floor(p[j] / tol);
    }
    
    if(r in grid) {
      n_index[i] = grid[r];
    } else {
      var idx = n_positions.length;
      grid[r] = idx;
      n_index[i] = idx;
      n_positions.push(p.slice(0));
    }
  }
  
  
  //Then fix up faces
  var n_faces = [];
  for(var i=0; i<mesh.faces.length; ++i) {
    var face = mesh.faces[i].slice(0);
    var skip = false;
    for(var j=0; j<face.length; ++j) {
      face[j] = n_index[face[j]];
      for(var k=0; k<j; ++k) {
        if(face[j] === face[k]) {
          skip = true;
        }
      }
    }
    
    if(!skip) {
      n_faces.push(face);
    }
  }
  
  //Return resulting mesh
  return { positions: n_positions, faces: n_faces };
};

exports.fuse_vertices = fuse_vertices;
