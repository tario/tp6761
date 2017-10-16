(function() {

var MathUtils = {};

// calcula la norma de un vector
var norma = function(v) {
  return Math.sqrt(product(v,v));
};

// normalizacion de un vector al dividir cada uno
// de sus componentes por la norma del mismo
var normalize = function(v) {
  var n = norma(v);
  return [v[0] / n, v[1] / n, v[2] / n];
};

// producto interno entre vectores
var product = function(v0, v1) {
  return v0[0]*v1[0] + v0[1]*v1[1] + v0[2]*v1[2];
};

// producto vectorial entre vectores, calcula el vector
// que sea perpendicular a ambos
var vect_product = function(v0, v1) {
  return [
    v0[1]*v1[2] - v0[2]*v1[1],
    v0[2]*v1[0] - v0[0]*v1[2],
    v0[0]*v1[1] - v0[1]*v1[0]];
};

var vect_sine = function(v0, v1) {
  return norma(vect_product(v0, v1)) / norma(v0) / norma(v1);
};


var vect_cosine = function(v0, v1) {
  return product(v0, v1) / norma(v0) / norma(v1);
};

var vect_add = function(v0, v1) {
  return [v0[0]+v1[0], v0[1]+v1[1], v0[2]+v1[2]];  
};

var mat_add = function(m0, m1) {
  return [vect_add(m0[0], m1[0]), vect_add(m0[1], m1[1]), vect_add(m0[2], m1[2])];
};

var mat_transpose = function(m) {
  var ret = [[0,0,0],[0,0,0],[0,0,0]];
  [0,1,2].forEach(function(x) {
    [0,1,2].forEach(function(y) {
      ret[x][y] = m[y][x];
    });
  });

  return ret;
};

var mat_product = function(m0, v1) {
  if (Array.isArray(v1)) {
    var p = product;
    var v1t = mat_transpose(v1);
    return [
      [product(m0[0],v1[0]), product(m0[0],v1[1]), product(m0[0],v1[2])],
      [product(m0[1],v1[0]), product(m0[1],v1[1]), product(m0[1],v1[2])],
      [product(m0[2],v1[0]), product(m0[2],v1[1]), product(m0[2],v1[2])]
    ];
  } else {
    return [
      [m0[0][0]*v1,m0[0][1]*v1,m0[0][2]*v1],
      [m0[1][0]*v1,m0[1][1]*v1,m0[1][2]*v1],
      [m0[2][0]*v1,m0[2][1]*v1,m0[2][2]*v1]];
  }
};

MathUtils.norma = norma;
MathUtils.normalize = normalize;
MathUtils.product = product;
MathUtils.vect_product = vect_product;

MathUtils.vect_cosine = vect_cosine;
MathUtils.vect_sine = vect_sine;

MathUtils.mat_product = mat_product;

// no testeado
MathUtils.vect_add = vect_add;
MathUtils.mat_add = mat_add;

window.MathUtils = MathUtils;

})();