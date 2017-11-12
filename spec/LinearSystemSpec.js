describe("Linear System", function() {
  var expectPrecision = function(error) {
    return function(a, b) {
      expect(isNaN(a)).to.be(false);
      return expect(Math.abs(a-b)).not.greaterThan(Math.abs(a+b)*error);
    };
  };

  var expectEqual = expectPrecision(0.0001);
  var testResolve = function(A, expected_x) {
    var b = MathUtils.mat_product(A, expected_x);

    describe("when called mat_solve of A=" + JSON.stringify(A) + " and b=" + JSON.stringify(b), function() {
      beforeEach(function() {
        this.x = MathUtils.mat_solve(A, b);
      });

      expected_x.forEach(function(v, index) {
        describe("position " + index, function() {
          it("should be " + expected_x[index], function() {
            expectEqual(this.x[index], expected_x[index]);
          });
        });
      });

    });
  };

  var identity = [[1,0,0],[0,1,0],[0,0,1]];
  var identityx2 = [[2,0,0],[0,2,0],[0,0,2]];
  var identityx3 = [[3,0,0],[0,3,0],[0,0,3]];

  var m0 = [[0.9,3,0],[1,1,0],[0,4,2]];
  var m0x3 = [[2.7,9,0],[3,3,0],[0,12,6]];

  testResolve(identity,[1,0,0]);
  testResolve(identityx2,[1,0,0]);
  testResolve(identityx3,[1,0,0]);
  testResolve(identity,[2,0,0]);
  testResolve(identityx2,[2,0,0]);
  testResolve(identityx3,[2,0,0]);
  testResolve(identity,[1,1,1]);
  testResolve(identityx2,[1,1,1]);
  testResolve(identityx3,[1,1,1]);

});
