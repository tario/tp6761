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

  $scope.presets = [{
    name: 'Conjunto 1',
    mq: [30, 10, -30],
    m1: [0.943584990553998, 0.349130937870532],
    m2: [2.97395486662125, 0.308952523348582]
  }, {
    name: 'Conjunto 2',
    mq: [-30, 10, -30],
    m1: [-1.058854467, 0.3161805526],
    m2: [0.729240437391748, 0.3532833266]
  }, {
    name: 'Conjunto 3',
    mq: [30, -10, -30],
    m1: [0.9594567146, -0.3014801111],
    m2: [2.88722679, -0.4140686058]
  },{
    name: 'Conjunto 4',
    mq: [-30, -10, -30],
    m1: [-1.041762415, -0.3673540994],
    m2: [0.694119083, -0.3271627534]
  },{
    name: 'Conjunto 5',
    mq: [10, 10, -30],
    m1: [0.2978972254, 0.338506067],
    m2: [2.193770028, 0.3243603722]
  }];

  var updateRotationMatrix = function() {
    var rotationData;
    rotationData = RotationCalculator.getRotation({
      Mq: $scope.mq,
      m: $scope.m1,
      s: $scope.s1,
      p: $scope.p
    });

    $scope.angle1 = rotationData.angle;
    $scope.axis1 = rotationData.axis;
    $scope.R1 = rotationData.R;

    rotationData = RotationCalculator.getRotation({
      Mq: $scope.mq,
      m: $scope.m2,
      s: $scope.s2,
      p: $scope.p
    });

    $scope.angle2 = rotationData.angle;
    $scope.axis2 = rotationData.axis;
    $scope.R2 = rotationData.R;
  };

  $scope.selectedPresetIndex = 0;
  $scope.setPreset = function() {
    $scope.selectedPreset = $scope.presets[$scope.selectedPresetIndex];
    $scope.mq = $scope.selectedPreset.mq;
    $scope.m1 = $scope.selectedPreset.m1;
    $scope.m2 = $scope.selectedPreset.m2;

    updateRotationMatrix();
  };

  $scope.setPreset();

  $scope.$watch("mq", updateRotationMatrix, true);
  $scope.$watch("m2", updateRotationMatrix, true);
  $scope.$watch("m1", updateRotationMatrix, true);
  $scope.$watch("s1", updateRotationMatrix, true);
  $scope.$watch("s2", updateRotationMatrix, true);
}])