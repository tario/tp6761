describe("Olinde Rodrigues", function() {

  var expectPrecision = function(error) {
    return function(a, b) {
      expect(isNaN(a)).to.be(false);
      return expect(Math.abs(a-b)).not.greaterThan(Math.abs(a+b)*error);
    };
  };

  // Olindes Rodrigues es una aproximacion que se acerca mas, cuanto
  // mas chico sea el angulo, por lo que se haran las pruebas
  // con angulos cuyo seno sea inferior al 0.05 y se esperara
  // un error inferior al 0.2%
  var expectEqual = expectPrecision(0.002);

  var testORodrigues = function(axis, sin, cos, expected) {
    describe("when called orodrigues with axis=" + JSON.stringify(axis) + " sin=" + sin + " cos=" + cos, function() {
      beforeEach(function() {
        this.product = MathUtils.orodrigues(axis, sin, cos);
      });

      [0,1,2].forEach(function(x) {
        [0,1,2].forEach(function(y) {
          describe("position " + x + " " + y, function() {
            var expectedCellValue = expected[x][y];
            it("should be " + expectedCellValue, function() {
              expectEqual(this.product[x][y], expectedCellValue);
            });
          });
        });
      });
    });
  };

  var testRotX = function(angle) {
    var a = angle;
    var cos = Math.cos(a);
    var sin = Math.sin(a);
    testORodrigues([1,0,0], Math.sin(angle), Math.cos(angle), [
      [1, 0, 0],
      [0, cos, -sin],
      [0, sin, cos]
    ]);
  };

  var testRotY = function(angle) {
    var a = angle;
    var cos = Math.cos(a);
    var sin = Math.sin(a);
    testORodrigues([0,1,0], Math.sin(angle), Math.cos(angle), [
      [cos, 0, sin],
      [0, 1, 0],
      [-sin, 0, cos]
    ]);
  };

  var testRotZ = function(angle) {
    var a = angle;
    var cos = Math.cos(a);
    var sin = Math.sin(a);
    testORodrigues([0,0,1], Math.sin(angle), Math.cos(angle), [
      [cos, -sin, 0],
      [sin, cos, 0],
      [0, 0, 1]
    ]);
  };

  testRotX(0);
  testRotX(Math.PI/160);
  testRotX(-Math.PI/160);
  testRotX(Math.PI/100);
  testRotX(Math.PI/65); // sin = 0.04831337952550706

  testRotY(Math.PI/160);
  testRotY(-Math.PI/160);
  testRotY(Math.PI/100);
  testRotY(Math.PI/65); // sin = 0.04831337952550706

  testRotZ(Math.PI/160);
  testRotZ(-Math.PI/160);
  testRotZ(Math.PI/100);
  testRotZ(Math.PI/65); // sin = 0.04831337952550706

  // mas alla de este punto, no se espera que el metodo funcione
  // por lo que no se probaran angulos mas grandes


});
