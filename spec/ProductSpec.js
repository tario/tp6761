describe("Product", function() {

  var expectPrecision = function(error) {
    return function(a, b) {
      return expect(Math.abs(a-b)).not.greaterThan((a+b)*error);
    };
  };

  var expectEqual = expectPrecision(0.0001);

  var testProduct = function(vector1, vector2, product) {
    describe("when vector1 is " + vector1 + " and " + vector2, function() {
      describe("product", function() {
        beforeEach(function() {
          this.product = MathUtils.product(vector1, vector2);
        });

        it("should be " + product, function() {
          expectEqual(this.product, product);
        });
      });
    });
  };

  testProduct([0,0,0], [1,0,0], 0);
  testProduct([1,0,0], [1,0,0], 1);
  testProduct([0,1,0], [1,0,0], 0);
  testProduct([3,1,0], [1,4,0], 7);


  var testVectProduct = function(vector1, vector2) {
    var normv1 = MathUtils.norma(vector1);
    var normv2 = MathUtils.norma(vector2);

    describe("when vector1 is " + vector1 + " and vector2 is " + vector2, function() {
      describe("vect product", function() {
        beforeEach(function() {
          this.product = MathUtils.vect_product(vector1, vector2);
        });

        describe("product with vector1", function() {
          beforeEach(function() {
            this.product1 = MathUtils.product(vector1, this.product);
          });

          it("should be 0", function() {
            expectEqual(this.product1, 0);
          });
        });

        describe("product with vector2", function() {
          beforeEach(function() {
            this.product2 = MathUtils.product(vector2, this.product);
          });

          it("should be 0", function() {
            expectEqual(this.product2, 0);
          });
        });
      });
    });
  };

  testVectProduct([1,0,0], [1,0,0], 1);
  testVectProduct([0,1,0], [1,0,0], 0);
  testVectProduct([3,1,0], [1,4,0], 7);

});
