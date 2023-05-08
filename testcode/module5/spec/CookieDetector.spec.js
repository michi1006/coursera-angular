describe("CookieDetector", function(){
  var itemsWithoutCookies;
  var itemsWithCookies;

  beforeEach(function(){
    itemsWithoutCookies = ['apples', 'pears', 'bananas'];
    itemsWithCookies= ['bread', 'milk', 'cookies'];
  })

  it("should not be able to detect no cookies", function(){
    var result = detectCookies(itemsWithoutCookies);
    expect(result).not.toBe(true);
  });

  it("should be able to detect cookies", function(){
    var result = detectCookies(itemsWithCookies);
    expect(result).toBe(true);
  });

});
