/**
 * Returns an array containing the set of all faces incident to each vertex in the mesh.
 */
function vertex_stars(mesh) {
  var stars = new Array(mesh.positions.length);
  for(var i=0; i<stars.length; ++i) {
    stars[i] = [];
  }
  
  var faces = mesh.faces;
  for(var i=0; i<faces.length; ++i) {  
    var f = faces[i];
    for(var j=0; j<f.length; ++j) {
      stars[f[j]].push(i);
    }
  }
  return stars;
};

//Returns a list of stars
exports.vertex_stars = vertex_stars;

