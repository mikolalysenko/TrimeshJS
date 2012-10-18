/**
 * Returns an array containing the set of all faces incident to each vertex in the mesh.
 */
exports.vertex_stars = function(args) {
  var vertex_count  = args.vertex_count;
  var faces         = args.faces;

  var stars = new Array(vertex_count);
  for(var i=0; i<stars.length; ++i) {
    stars[i] = [];
  }
  
  for(var i=0; i<faces.length; ++i) {  
    var f = faces[i];
    for(var j=0; j<f.length; ++j) {
      stars[f[j]].push(i);
    }
  }
  
  return stars;
};

/**
 *
 */
exports.edges = function(args) {
  var faces = args.faces;
  var edges = [];
  
  for(var i=0; i<faces.length; ++i) {
    var f = faces[i];
    
    
  }
}

