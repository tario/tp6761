(function() {

var RotationCalculator = {};

var least_squares_row = function(params, row) {
  // formar la matriz del sistema de ecuaciones, utilizando los puntos
  var A = params.points.map(function(point) {
    return MathUtils.normalize( [point.m[0], point.m[1], -1] );
  });

  // formar el vector esperado
  var b = params.points.map(function(point) {
    return MathUtils.normalize( MathUtils.vect_sub(point.mq, point.s) )[row];
  });

  // si la matriz es cuadrada (sistema determinado), no es necesario aplicar cuadrados minimos
  if (A.length === A[0].length) {
    return MathUtils.mat_solve(A, b);
  }

  var At = MathUtils.mat_transpose(A);
  var AtA = MathUtils.mat_product(At, A);
  var Atb = MathUtils.mat_product(At, b);

  return MathUtils.mat_solve(AtA, Atb);
};

var getRotation = function(params) {
  return MathUtils.mat_transpose(
    [0,1,2].map(function(r) {
      return least_squares_row(params, r);
    })
  );
};

RotationCalculator.getRotation = getRotation;

window.RotationCalculator = RotationCalculator;

})();