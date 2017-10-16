describe("Matrix Product", function() {

  var expectPrecision = function(error) {
    return function(a, b) {
      expect(isNaN(a)).to.be(false);
      return expect(Math.abs(a-b)).not.greaterThan(Math.abs(a+b)*error);
    };
  };

  var expectEqual = expectPrecision(0.0001);

  var testProduct = function(v1, v2, expected) {
    describe("when called mat_product of " + JSON.stringify(v1) + " and " + JSON.stringify(v2), function() {
      beforeEach(function() {
        this.product = MathUtils.mat_product(v1,v2);
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

  var identity = [[1,0,0],[0,1,0],[0,0,1]];
  var identityx2 = [[2,0,0],[0,2,0],[0,0,2]];
  var identityx3 = [[3,0,0],[0,3,0],[0,0,3]];

  var m0 = [[0.9,3,0],[1,1,0],[0,4,2]];
  var m0x3 = [[2.7,9,0],[3,3,0],[0,12,6]];

  testProduct(identity,1,identity);
  testProduct(identity,2,identityx2);
  testProduct(m0,3,m0x3);

  testProduct(m0,identity,m0);
  testProduct(m0,identityx3,m0x3);

});
