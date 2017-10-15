describe("Normalize", function() {

  var expectPrecision = function(error) {
    return function(a, b) {
      return expect(Math.abs(a-b)).to.be.below((a+b)*error);
    };
  };

  var expectEqual = expectPrecision(0.0001);

  var testNorma = function(vector, norma) {
    describe("when vector is " + vector, function() {
      describe("norma", function() {
        beforeEach(function() {
          this.norma = MathUtils.norma(vector);
        });

        it("should be " + norma, function() {
          expect(this.norma).to.be(norma);
        });
      });
    });
  };

  var testNormaAllOrders = function(v, norma) {
    testNorma([v[0],v[1],v[2]], norma);
    testNorma([v[0],v[2],v[1]], norma);
    testNorma([v[1],v[0],v[2]], norma);
    testNorma([v[1],v[2],v[0]], norma);
    testNorma([v[2],v[0],v[1]], norma);
    testNorma([v[2],v[1],v[0]], norma);
  };

  testNormaAllOrders([0,0,0], 0);
  testNormaAllOrders([0,3,4], 5);
  testNormaAllOrders([0,6,8], 10);

  var testNormalize = function(vector) {
    describe("when vector is " + vector, function() {
      describe("normalized vector", function() {
        beforeEach(function() {
          this.normalized = MathUtils.normalize(vector);
        });

        it("should be the same direction", function() {
          if (vector[0]!==0 && vector[1]!==0) {
            expectEqual(vector[0]/this.normalized[0], vector[1]/this.normalized[1]); 
          }

          if (vector[0]!==0 && vector[2]!==0) {
            expectEqual(vector[0]/this.normalized[0], vector[2]/this.normalized[2]); 
          }

          if (vector[1]!==0 && vector[2]!==0) {
            expectEqual(vector[1]/this.normalized[1], vector[2]/this.normalized[2]); 
          }
        });

        describe("norma", function() {
          beforeEach(function() {
            this.norma = MathUtils.norma(this.normalized);
          });

          it("should be 1", function() {
            expectEqual(this.norma, 1);
          });
        });
      });

    });
  };

  testNormalize([0,3,4]);
  testNormalize([0,0,1]);
  testNormalize([0,1,0]);
  testNormalize([1,0,0]);
});
