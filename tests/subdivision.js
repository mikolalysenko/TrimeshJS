var vows = require('vows');
var assert = require('assert');
var loop_subdivision = require('../src/loop_subdivision.js').loop_subdivision;
var shapes = require('../src/shapes.js');


vows.describe('subdivision.js').addBatch({
  'loop_subdivision' : {
    topic: shapes.grid_mesh(5,5),
    'subdivide': function(mesh) {
      var subdiv = loop_subdivision(mesh);
      assert.ok(subdiv.faces.length === 4*mesh.faces.length);
    }
  }
}).run();
