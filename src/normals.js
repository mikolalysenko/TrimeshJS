var EPSILON = 1e-6;

//Estimate the normals of a mesh
exports.estimate_normals = function(mesh) {
  
  var positions = mesh.positions;
  var faces     = mesh.faces;
  var N         = positions.length;
  var normals   = new Array(N);
  
  //Initialize normal array
  for(var i=0; i<N; ++i) {
    normals[i] = [0.0, 0.0, 0.0];
  }
  
  //Walk over all the faces and add per-vertex contribution to normal weights
  for(var i=0; i<faces.length; ++i) {
    var f = faces[i];
    var p = 0;
    var c = f[f.length-1];
    var n = f[0];
    for(var j=0; j<f.length; ++j) {
    
      //Shift indices back
      p = c;
      c = n;
      n = f[(j+1) % f.length];
    
      var v0 = positions[p];
      var v1 = positions[c];
      var v2 = positions[n];
      
      //Compute arc lengths
      var d01 = new Array(3);
      var m01 = 0.0;
      var d21 = new Array(3);
      var m21 = 0.0;
      for(var k=0; k<3; ++k) {
        d01[k] = v0[k]  - v1[k];
        m01   += d01[k] * d01[k];
        d21[k] = v2[k]  - v1[k];
        m21   += d21[k] * d21[k];
      }

      //Accumulate values in normal
      if(m01 * m21 > EPSILON) {
        var norm = normals[c];
        var w = 1.0 / Math.sqrt(m01 * m21);
        for(var k=0; k<3; ++k) {
          var u = (k+1)%3;
          var v = (k+2)%3;
          norm[k] += w * (d21[u] * d01[v] - d21[v] * d01[u]);
        }
      }
    }
  }
  
  //Scale all normals to unit length
  for(var i=0; i<N; ++i) {
    var norm = normals[i];
    var m = 0.0;
    for(var k=0; k<3; ++k) {
      m += norm[k] * norm[k];
    }
    if(m > EPSILON) {
      var w = 1.0 / Math.sqrt(m);
      for(var k=0; k<3; ++k) {
        norm[k] *= w;
      }
    } else {
      for(var k=0; k<3; ++k) {
        norm[k] = 0.0;
      }
    }
  }

  //Return the resulting set of patches
  return normals;
}


