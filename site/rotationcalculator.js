(function() {

var RotationCalculator = {};
var getRotation = function() {
  return [
    [Math.random(), 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
};

RotationCalculator.getRotation = getRotation;

window.RotationCalculator = RotationCalculator;

})();