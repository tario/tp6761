describe("Matrix Determinant", function() {
  var expectPrecision = function(error) {
    return function(a, b) {
      expect(isNaN(a)).to.be(false);
      return expect(Math.abs(a-b)).not.greaterThan(Math.abs(a+b)*error);
    };
  };

  var expectEqual = expectPrecision(0.0001);
  var testDeterminant = function(A, expected) {
    describe("when called mat_determinant of A=" + JSON.stringify(A), function() {
      beforeEach(function() {
        this.d = MathUtils.mat_determinant(A);
      });

      it("should be " + expected, function() {
        expectEqual(this.d, expected);
      });
    });
  };

  var identity = [[1,0,0],[0,1,0],[0,0,1]];
  var identityx2 = [[2,0,0],[0,2,0],[0,0,2]];
  var identityx3 = [[3,0,0],[0,3,0],[0,0,3]];

  var m0 = [[1,3,0],[1,1,0],[0,4,2]];
  var m0x3 = [[3,9,0],[3,3,0],[0,12,6]];

  var identity2x2 = [[1,0],[0,1]];
  var identityx22x2 = [[2,0],[0,2]];

  var m02x2 = [[1,2],[3,4]];


  testDeterminant(identity, 1);
  testDeterminant(identityx2, 8);
  testDeterminant(identityx3, 27);

  testDeterminant(identity2x2, 1);
  testDeterminant(identityx22x2, 4);

  testDeterminant(m02x2, -2);

  testDeterminant(m0, -4);
  testDeterminant(m0x3, -108);
});
