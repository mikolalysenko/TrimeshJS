var vows = require('vows');
var assert = require('assert');
var estimate_normals = require('../src/normals.js').estimate_normals;
var shapes = require('../src/shapes.js');


vows.describe("surface normals").addBatch({
  'normals' : {
    topic: shapes.sphere_mesh(20, 1.0),
    
    'testing sphere normals': function(sphere) {
    
      var normals = estimate_normals(sphere);
      
      for(var i=0; i<normals.length; ++i) {
        var n = normals[i];
        var p = sphere.positions[i];
        
        var d = 0.0;
        for(var j=0; j<3; ++j) {
          d += Math.pow(n[j] - p[j], 2);
        }
        d = Math.sqrt(d);
        
        assert.ok(d < 1e-2, "Incorrect normal: " + JSON.stringify(n) + " vs. " + JSON.stringify(p) + ", err = " + d);
      }      
    }
  },
}).run();


