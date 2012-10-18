# trimesh.js

... is an ever expanding collection of algorithms for processing triangulated meshes in Javascript.

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

# General Discussion and Philosophy

(TODO: Finish this section)

Working with meshes is hard -- and yet it has to be done if we are to compute on surfaces. The situation is not helped by the enormous confusion of data structures for optimizing spatial and topological queries on meshes. Picking a single representation, like a winged edge, half edge or cell tuple complex brings with it many tradeoffs and introduces enormous complexity into algorithms which operate on these meshes. These choices cause implementations of mesh based algorithms to rapidly diverge, resulting in an enormous proliferation and duplication of effort. Clearly this situation is unacceptable from the stand point of interoperability and coder sanity.  The core philosophy of trimesh.js is a reaction to this offensive mess and can be summed up in the following central thesis:

> ** Complicated mesh data structures are bullshit. **

The prescirption for this problem is radical simplicity. To avoid falling into the trap of overengineering that seems to sidetrack other mesh libraries, trimesh.js adopts a "Just the facts, ma'am" personality, with each method taking only enough data to answer the necessary basic queries required to implement the described functionality. Guided by these ideals, trimesh.js departs radically from other mesh libraries in the following ways:

* No in place updates or side effects
* All vectors are represented by plain old arrays.  No 'cute' accessors for x/y/z components.
* No custom vertex or face data types either
* No topological mesh data structures, handle 
* Build indices only when you need them.
* Reuse indices when possible.

Conventions:

* All methods take a javascript structure as input with named arguments


# API


## Topology

### `vertex_stars`


## Mesh Repair

### `fuse_vertices`


## Implicit Function Modeling

### `marching_cubes`

### `marching_tetrahedra`

### `surface_nets`


## Differential Geometry

### `vertex_normals`

### `face_normals`

### `distance_to_point`



## Test Shapes

### `grid_mesh`

### `cube_mesh`

### `sphere_mesh` 

# Examples

# Acknowledgements





