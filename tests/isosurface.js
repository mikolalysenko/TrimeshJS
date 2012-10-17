var vows = require('vows');
var assert = require('assert');
var marching_cubes = require('../src/marchingcubes.js').marching_cubes;
var marching_tetrahedra = require('../src/marchingtetrahedra.js').marching_tetrahedra;
var surface_nets = require('../src/surfacenets.js').surface_nets;

var TOLERANCE = 1e-3;

var sphere_radius = 20.0;
var sphere_center = [sphere_radius+2, sphere_radius+2, sphere_radius+2];
var sphere_dims = [ 44, 44, 44 ];

function sphere(x,y,z) {
  return Math.sqrt(Math.pow(x - sphere_center[0], 2)
    + Math.pow(x - sphere_center[1], 2)
    + Math.pow(x - sphere_center[2], 2))
    - sphere_radius;
}

function validate_surface(mesh, potential) {
  for(var i=0; i<mesh.positions.length; ++i) {
    var p = mesh.positions[i];
    var s = potential(p[0], p[1], p[2]);
    assert.ok(Math.abs(s) < TOLERANCE, "Unacceptable error in isosurface");
  }
}

//These tests kind of suck, but
vows.describe("isosurfaces").addBatch({
  'marching cubes': {
    'sphere': function() {
      validate_surface(marching_cubes(sphere, sphere_dims), sphere);
    }
  },
  
  'marching tets': {
    'sphere': function() {
      validate_surface(marching_tetrahedra(sphere, sphere_dims), sphere);
    }
  },

  'surface nets': {
    'sphere': function() {
      validate_surface(surface_nets(sphere, sphere_dims), sphere);
    }
  }
  
}).run();

