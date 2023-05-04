(function(){
  'use strict';

  angular.module('ShoppingListApp', [])
  .controller('ShoppingListController', ShoppingListController)
  // .controller('ShoppingListController1', ShoppingListController1)
  // .controller('ShoppingListController2', ShoppingListController2)
  //.controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
  .factory('ShoppingListServiceFactory', ShoppingListServiceFactory)
  .service('PromiseCheckService', PromiseCheckService)
  .directive('shoppingList', ShoppingListDirective);

  function ShoppingListDirective() {
    var ddo = {
      templateUrl: 'shoppingList.html',
      scope: {
        items: '<', //one-way binding '=' = two-way-binding
        myTitle: '@title',
        onRemove: '&'
      },
      // controller: 'ShoppingListDirectiveController as list',
      controller: ShoppingListDirectiveController,
      controllerAs: 'dir',
      bindToController: true,
      link: ShoppingListDirectiveLink,
      transclude: true
    };

    return ddo;
  }

  function ShoppingListDirectiveLink(scope, element, attrs, controller) {
    console.log("Link scope is: ", scope);
    console.log("Link element is:", element);
    console.log("Link controller is:", controller);

    scope.$watch('dir.sugarInList()', function (newValue, oldValue){
      console.log("Old value: ", oldValue);
      console.log("New value: ", newValue);

      if(newValue === true){
        displaySugarWarning();
      }else{
        removeSugarWarning();
      }
    });

    function displaySugarWarning(){
      //Using Angular jqLite
      // var warningElem = element.find("div");
      // console.log(warningElem);
      // warningElem.css('display', 'block');

      //If jQuery included before Angular
      var warningElem = element.find("div.error");
      warningElem.slideDown(900);
    }

    function removeSugarWarning(){
      //Using Angular jqLite
      // var warningElem = element.find("div");
      // warningElem.css('display', 'none');
      //If jQuery included before Angular
      var warningElem = element.find("div.error");
      warningElem.slideUp(900);
    }
  }

  function ShoppingListDirectiveController() {
    var list = this;

    list.sugarInList = function () {
      for (var i = 0; i < list.items.length; i++) {
        var name = list.items[i].name;
        if (name.toLowerCase().indexOf("sugar") !== -1) {
          return true;
        }
      }

      return false;
    };
  }

  ShoppingListController.$inject = ['ShoppingListServiceFactory'];
  function ShoppingListController(ShoppingListServiceFactory) {
    var list = this;

    // Use factory to create new shopping list service
    var shoppingList = ShoppingListServiceFactory();

    list.items = shoppingList.getItems();
    var origTitle = "Shopping List #1";
    list.title = origTitle + " (" + list.items.length + " items )";

    list.warning = "SUGAR detected!";

    list.itemName = "banana";
    list.itemQuantity = "2";

    list.addItem = function () {
      shoppingList.addItem(list.itemName, list.itemQuantity);
      list.title = origTitle + " (" + list.items.length + " items )";
    };

    list.removeItem = function (itemIndex) {
      console.log("'this' is: ", this);
      this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
      shoppingList.removeItem(itemIndex);
      this.title = origTitle + " (" + list.items.length + " items )";
    };
  }

  // ShoppingListController1.$inject = ['ShoppingListServiceFactory'];
  // function ShoppingListController1(ShoppingListServiceFactory){
  //   var list = this;
  //   var service = ShoppingListServiceFactory();
  //   var origTitle = "Shopping List #1";
  //
  //   list.items = service.getItems();
  //   list.title = origTitle + " (" + list.items.length + " items )";
  //
  //   list.itemName = "Apple";
  //   list.itemQuantity = "1";
  //
  //   list.addItem = function () {
  //     console.log("Before add: " + list.items.length);
  //     service.addItem(list.itemName, list.itemQuantity);
  //     console.log("After add: " + list.items.length);
  //     list.title = origTitle + " (" + list.items.length + " items )";
  //   }
  //
  //   list.removeItem = function (index) {
  //     this.lastRemoved = "Last item removed was " + this.items[index].name;
  //     service.removeItem(index);
  //     list.title = origTitle + " (" + list.items.length + " items )";
  //   }
  // };
  //
  // ShoppingListController2.$inject = ['ShoppingListServiceFactory'];
  // function ShoppingListController2(ShoppingListServiceFactory){
  //   var list = this;
  //   var service = ShoppingListServiceFactory(3);
  //
  //   list.items = service.getItems();
  //
  //   list.itemName = "Apple";
  //   list.itemQuantity = "1";
  //
  //   list.addItem = function () {
  //     service.addItem(list.itemName, list.itemQuantity);
  //   }
  //
  //   list.removeItem = function (index) {
  //     service.removeItem(index);
  //   }
  // };

  ShoppingListServiceFactory.$inject = ['$q','PromiseCheckService']
  function ShoppingListServiceFactory($q, PromiseCheckService){
    var factory = function(maxItems){
      return new ShoppingListService($q, PromiseCheckService, maxItems);
    }
    return factory;
  }

  ShoppingListService.$inject = ['$q', 'PromiseCheckService', 'maxItems']
  function ShoppingListService($q, PromiseCheckService, maxItems) {
    var service = this;
    var items = [];

    service.addItem = function(name, quantity) {
      /*var promise = PromiseCheckService.checkName(name);

      promise.then(function (response){
        var nextPromise = PromiseCheckService.checkQuantity(quantity);

        nextPromise.then(function (result ){
          var item = {
            name: name,
            quantity: quantity
          }
          items.push(item);
        }, function (errorResponse){
          console.log("Inner promise: " + errorResponse.message);
        });
      }, function (errorResponse){
        console.log("Outer response: " + errorResponse.message);
      });*/

      var namePromise = PromiseCheckService.checkName(name);
      var quantityPromise = PromiseCheckService.checkQuantity(quantity);
      var itemPromise = PromiseCheckService.checkItems(maxItems, items.length);

      $q.all([itemPromise, namePromise, quantityPromise]).
      then(function(response){
        var item = {
          name: name,
          quantity: quantity
        };
        items.push(item);
        console.log("Item pushed: " + items.length);
      })
      .catch(function(errorResponse){
        console.log(errorResponse.message);
      })
    };

    service.removeItem = function(index){
      items.splice(index, 1);
    };

    service.getItems = function(){
      return items;
    };
  };

  PromiseCheckService.$inject = ['$q', '$timeout']
  function PromiseCheckService($q, $timeout){
    var service = this;

    service.checkName = function (name) {
      var deferred = $q.defer();

      var result = {
        message: ""
      };

      $timeout(function () {
        if(name.toLowerCase().indexOf('cookie') === -1){
          deferred.resolve(result);
        }
        else{
          result.message = "Stay away from cookies!";
          deferred.reject(result);
        }
      }, 1);

      return deferred.promise;
    };

    service.checkQuantity = function (quantity){
      var deferred = $q.defer();

      var result = {
        message: ""
      };

      $timeout(function () {
        if(quantity <= 5){
          deferred.resolve(result);
        }
        else{
          result.message = "That's too much!";
          deferred.reject(result);
        }
      }, 2);

      return deferred.promise;
    };

    service.checkItems = function (maxItems, itemLength) {
      var deferred = $q.defer();
      var result = {
        message : ""
      };

      if(maxItems === undefined || (itemLength < maxItems)){
        deferred.resolve(result);
      } else{
        result.message = "Enough items added";
        deferred.reject(result);
      }

      return deferred.promise;
    };
  };
})();
