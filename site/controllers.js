var app = angular.module("VisionCalculator");
app.controller("MainController", ["$scope", "RotationCalculator", function($scope, RotationCalculator) {
  $scope.title = "Vision Calculator";

  $scope.s1 = [0, 0, 0];
  $scope.s2 = [50, 0, 0];
  $scope.p = -1;

  $scope.m1 = [
    [1,0,0],
    [0,1,0],
    [0,0,1]
  ];

  $scope.m2 = [
    [1,0,0],
    [0,1,0],
    [0,0,1]
  ];

  $scope.presets = [{
    name: 'Conjunto 1',
    mq: [30, 10, -30],
    mi: [0.943584990553998, 0.349130937870532],
    md: [2.97395486662125, 0.308952523348582]
  }, {
    name: 'Conjunto 2',
    mq: [-30, 10, -30],
    mi: [-1.058854467, 0.3161805526],
    md: [0.729240437391748, 0.3532833266]
  }, {
    name: 'Conjunto 3',
    mq: [30, -10, -30],
    mi: [0.9594567146, -0.3014801111],
    md: [2.88722679, -0.4140686058]
  },{
    name: 'Conjunto 4',
    mq: [-30, -10, -30],
    mi: [-1.041762415, -0.3673540994],
    md: [0.694119083, -0.3271627534]
  },{
    name: 'Conjunto 5',
    mq: [10, 10, -30],
    mi: [0.2978972254, 0.338506067],
    md: [2.193770028, 0.3243603722]
  }];

  var updateRotationMatrix = function() {
    $scope.m1 = RotationCalculator.getRotation({
      Mq: $scope.mq,
      m: $scope.md,
      s: $scope.s1,
      p: $scope.p
    });

    $scope.m2 = RotationCalculator.getRotation({
      Mq: $scope.mq,
      m: $scope.mi,
      s: $scope.s2,
      p: $scope.p
    });
  };

  $scope.selectedPreset = $scope.presets[0];
  $scope.setPreset = function() {
    $scope.mq = $scope.selectedPreset.mq;
    $scope.md = $scope.selectedPreset.md;
    $scope.mi = $scope.selectedPreset.mi;

    updateRotationMatrix();
  };

  $scope.setPreset();

  $scope.$watch("mq", updateRotationMatrix, true);
  $scope.$watch("md", updateRotationMatrix, true);
  $scope.$watch("mi", updateRotationMatrix, true);
  $scope.$watch("s1", updateRotationMatrix, true);
  $scope.$watch("s2", updateRotationMatrix, true);
}])