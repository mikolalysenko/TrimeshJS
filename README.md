# Trimesh.JS

A set of tools for working with triangulated surface meshes in JavaScript.

## Server side (node.js)

First, install the library using npm:

    npm install trimesh
    
Then include the library in your project like usual:

    var trimesh = require('trimesh');


## Client side

Add a reference to the script in your header:

    <script src="trimesh.min.js"></script>
    
Which will create an object called `trimesh` in the global namespace that contains the API:

    var mesh = trimesh.grid_mesh(10, 10);

# General Discussion

(TODO: explain how trimesh.js represents surfaces)

# API

### `vertex_stars`

### `fuse_vertices`

### `marching_cubes`

### `marching_tetrahedra`

### `surface_nets`

### `vertex_normals`

### `face_normals`

### `distance_to_point`

### `grid_mesh`

### `cube_mesh`

### `sphere_mesh` 






