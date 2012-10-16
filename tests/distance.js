var vows = require('vows');
var assert = require('assert');
var distance = require('../src/distance.js');
var shapes = require('../src/shapes.js');


vows.describe("distance.js").addBatch({
  'quadratic_distance' : {
    'testing quadratic distance' : function() {
    
      var qd = distance.quadratic_distance([1, 0, 0], [0, 1, 0], [1, 1, 0], 1, 1, -1);
      assert.ok(Math.abs(qd - Math.sqrt(2.0)) < 1e-6, "Invalid quadratic distance");
    },
    
    'testing planar distances' : function() {
    
      var points = new Array(4);
      for(var i=0; i<4; ++i) {
        points[i] = new Array(3);
      }
      
      var distances = new Array(4);
    
      for(var i=0; i<1000; ++i) {
        for(var j=0; j<4; ++j) {
          distances[j] = 0.0;
          for(var k=0; k<3; ++k) {
            if(k !== 2) {
              points[j][k] = 1000.0 * (Math.random() - 1.0);
            } else {
              points[j][k] = 0;
            }
            distances[j] += Math.pow(points[j][k] - points[0][k], 2);
          }
          distances[j] = Math.sqrt(distances[j]);
        }
        
        //Sort points
        for(var j=0; j<4; ++j) {
          for(var k=0; k<j; ++k) {
            if(distances[j] < distances[k]) {
              var t0 = points[j];
              points[j] = points[k];
              points[k] = t0;
              
              var t1 = distances[j];
              distances[j] = distances[k];
              distances[k] = t1;
            }
          }
        }
        
        var d0 = distance.quadratic_distance(points[1], points[2], points[3], distances[1], distances[2], -1);
        var d1 = distance.quadratic_distance(points[1], points[2], points[3], distances[1], distances[2], 1);

        
        assert.ok(Math.abs(d0 - distances[3]) < 1e-6 || Math.abs(d1 - distances[3]) < 1e-6, "Incorrect distances: " + d0 + "," + d1 + ".\nPoints="+JSON.stringify(points)+"\nDistances= "+distances);
      }
    
    }
  },
  
  '5x5 grid': {
    topic: shapes.grid_mesh(5, 5),
    
    'testing all pairwise grid distances':  function(mesh) {
    
      //Testing pairwise distances
      for(var j=0; j<mesh.positions.length; ++j) {
        var p = mesh.positions[j];
        var distances = distance.distance_to_point(mesh, j);
        for(var i=0; i<mesh.positions.length; ++i) {
          var q = mesh.positions[i];
          var d = 0.0;
          for(var k=0; k<3; ++k) {
            d += Math.pow(p[k] - q[k], 2);
          }
          d = Math.sqrt(d);
          
          assert.ok(Math.abs(distances[i] - d) < 1e-4, "Incorrect distance from " + j + "->" + i + ". Expected: " + d + ", got: " + distances[i]);
        }
      }      
    },
    
    'sphere': {
      topic: shapes.sphere(1.0, 50),
      
      'testing sphere pairwise distances': function(mesh) {
      
      }
    },
  },
}).run();


