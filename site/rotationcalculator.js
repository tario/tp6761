(function() {

var RotationCalculator = {};
var getRotation = function(params) {
  var Mq = params.Mq;
  var m = params.m;
  var s = params.s;

  var v0 = MathUtils.vect_add(Mq, s);
  var v1 = [m[0], m[1], -1];
  return MathUtils.orodrigues_rotation(v0, v1);
};

RotationCalculator.getRotation = getRotation;

window.RotationCalculator = RotationCalculator;

})();