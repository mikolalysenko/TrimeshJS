//Topology functions
var topology = require('./src/topology.js');
exports.vertex_stars = topology.vertex_stars;

//Mesh repair
var repair = require('./src/repair.js');
exports.fuse_vertices = repair.fuse_vertices;

//Isosurface functions
exports.marching_cubes = require('./src/marchingcubes.js').marching_cubes;
exports.marching_tetrahedra = require('./src/marchingtetrahedra.js').marching_tetrahedra;
exports.surface_nets = require('./src/surfacenets.js').surface_nets;

//Surface normal estimation
exports.estimate_normals = require('./src/normals.js').estimate_normals;

//Surface distance
exports.distance_to_point = require('./src/distance.js').distance_to_point;

//Test shapes
var shapes = require('./src/shapes.js');
exports.grid_mesh = shapes.grid_mesh;
exports.cube_mesh = shapes.cube_mesh;
exports.sphere_mesh = shapes.sphere_mesh;

