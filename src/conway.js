//Platonic solids (not triangulated)


var cube = {},
    tetrahedron = {},
    icosahedron = {};

function reflect(params) {
  var positions = params.positions;
  var faces = params.faces;
  
  var npositions = new Array(positions.length);
  var nfaces = new Array(faces.length);
  
  for(var i=0; i<positions.length; ++i) {
    var p = positions[i];
    var np = new Array(3);
    for(var j=0; j<3; ++j) {
      np[j] = -p[j];
    }
    npositions[i] = np;
  }
  
  for(var i=0; )

}

function dual(params) {
}

function ambo(params) {
}

function chamfer() {
}

function propellor() {
}
