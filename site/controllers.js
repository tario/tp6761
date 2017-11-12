var app = angular.module("VisionCalculator");
app.controller("MainController", ["$scope", "RotationCalculator", function($scope, RotationCalculator) {
  $scope.title = "Vision Calculator";

  $scope.s1 = [0, 0, 0];
  $scope.s2 = [50, 0, 0];
  $scope.p = -1;

  $scope.R1 = [
    [1,0,0],
    [0,1,0],
    [0,0,1]
  ];

  $scope.R2 = [
    [1,0,0],
    [0,1,0],
    [0,0,1]
  ];

  $scope.points = [{
    mq: [30, 10, -30],
    m1: [0.943584990553998, 0.349130937870532],
    m2: [2.97395486662125, 0.308952523348582]
  }, {
    mq: [-30, 10, -30],
    m1: [-1.058854467, 0.3161805526],
    m2: [0.729240437391748, 0.3532833266]
  }, {
    mq: [30, -10, -30],
    m1: [0.9594567146, -0.3014801111],
    m2: [2.88722679, -0.4140686058]
  },{
    mq: [-30, -10, -30],
    m1: [-1.041762415, -0.3673540994],
    m2: [0.694119083, -0.3271627534]
  },{
    mq: [10, 10, -30],
    m1: [0.2978972254, 0.338506067],
    m2: [2.193770028, 0.3243603722]
  }];

  var updateRotationMatrix = function() {
    $scope.R1 = RotationCalculator.getRotation({
      points: $scope.points.map(function(p) {
        return {
          mq: p.mq,
          m: p.m1,
          s: $scope.s1
        };
      })
    });

    $scope.R2 = RotationCalculator.getRotation({
      points: $scope.points.map(function(p) {
        return {
          mq: p.mq,
          m: p.m2,
          s: $scope.s2
        };
      })
    });
  };

  $scope.removePoint = function(point) {
    $scope.points = $scope.points.filter(function(p) { return p !== point; });

    updateRotationMatrix();
  };

  $scope.addPoint = function(point) {
    $scope.points.push({
      mq: [0,0,0],
      m1: [0,0],
      m2: [0,0],
      s1: $scope.s1,
      s2: $scope.s2
    });
  };

  $scope.updateRotationMatrix = updateRotationMatrix;
  updateRotationMatrix();
}])
