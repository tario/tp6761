describe("Trigonometry", function() {

  var expectPrecision = function(error) {
    return function(a, b) {
      return expect(Math.abs(a-b)).not.greaterThan(Math.abs(a+b)*error);
    };
  };

  var expectEqual = expectPrecision(0.0001);

  describe("Cosine", function() {
    var testCosine = function(v1, v2, expected) {
      describe("when called cosine of " + v1 + " and " + v2, function() {
        beforeEach(function() {
          this.cosine = MathUtils.vect_cosine(v1,v2);
        });

        it("should be " + expected, function() {
          expectEqual(this.cosine, expected);
        });
      });
    };

    testCosine([1,0,0], [1,0,0], 1);
    testCosine([1,0,0], [0,1,0], 0);
    testCosine([0,1,0], [1,0,0], 0);
    testCosine([0,-1,0], [1,0,0], 0);
    testCosine([1,0,0], [-1,0,0], -1);

  });

  describe("Sine", function() {
    var testSine = function(v1, v2, expected) {
      describe("when called sine of " + v1 + " and " + v2, function() {
        beforeEach(function() {
          this.sine = MathUtils.vect_sine(v1,v2);
        });

        it("should be " + expected, function() {
          expectEqual(this.sine, expected);
        });
      });
    };

    testSine([1,0,0], [1,0,0], 0);
    testSine([1,0,0], [0,1,0], 1);
    testSine([0,1,0], [1,0,0], 1);
    testSine([1,0,0], [1,1,0], 0.707106);
  });


});
