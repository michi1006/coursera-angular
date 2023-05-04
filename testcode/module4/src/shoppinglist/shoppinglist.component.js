(function (){
  'use strict';

  angular.module('ShoppingList')
  .component('shoppingList', {
    templateUrl: 'src/shoppinglist/shoppinglist.template.html',
    controller: ShoppingListComponentController,
    bindings: {
      items: '<',
      myTitle: '@title',
      onRemove: '&'
    }
  });

  ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService']
  function ShoppingListComponentController($rootScope, $element, $q, WeightLossFilterService) {
    var $ctrl = this;
    var totalItems;

    // $ctrl.cookiesInList = function () {
    //   for (var i = 0; i < $ctrl.items.length; i++) {
    //     var name = $ctrl.items[i].name;
    //     if (name.toLowerCase().indexOf("cookie") !== -1) {
    //       return true;
    //     }
    //   }
    //
    //   return false;
    // };

    $ctrl.remove = function (myIndex) {
      $ctrl.onRemove({ index: myIndex });
    };

    $ctrl.$onInit = function () {
      totalItems = 0;
      console.log("We are in $onInit(), totalItems: ", totalItems);
    };

    $ctrl.$onChanges = function (changeObj) {
      // console.log("Changes: ", changeObj);
    }

    $ctrl.$doCheck = function(){
      if($ctrl.items.length !== totalItems){
        totalItems = $ctrl.items.length;
        console.log("# of items changed (Items: ",$ctrl.items.length, ")/(Total: ", totalItems, "). Checking for Cookies.");

        $rootScope.$broadcast('shoppinglist:processing', {on: true});

        var promises = [];
        for (var i = 0; i < $ctrl.items.length; i++) {
          promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
        }

        $q.all(promises)
        .then(function(result){
          var warningElem = $element.find('div.error');
          warningElem.slideUp(900);
        })
        .catch(function(errorResult){
          var warningElem = $element.find('div.error');
          warningElem.slideDown(900);
        })
        .finally(function(){
          $rootScope.$broadcast('shoppinglist:processing', {on: false});
        });

        // if($ctrl.cookiesInList()) {
        //   console .log("Cookies detected.");
        //   var warningElem = $element.find('div.error');
        //   warningElem.slideDown(900);
        // }
        // else {
        //   console.log("No cookies here, move right along.");
        //   var warningElem = $element.find('div.error');
        //   warningElem.slideUp(900);
        // }
      }
    }
  }
})();
