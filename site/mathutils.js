(function() {

var MathUtils = {};

// calcula la norma de un vector
var norma = function(v) {
  return Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
};

// normalizacion de un vector al dividir cada uno
// de sus componentes por la norma del mismo
var normalize = function(v) {
  var n = norma(v);
  return [v[0] / n, v[1] / n, v[2] / n];
};

MathUtils.norma = norma;
MathUtils.normalize = normalize;

window.MathUtils = MathUtils;

})();