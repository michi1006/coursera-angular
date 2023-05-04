(function() {
  'use strict';

  angular.module('Spinner')
  .component('loadingSpinner', {
    templateUrl: 'src/spinner/loadingspinner.template.html',
    controller: SpinnerController
  });

  SpinnerController.$inject = ['$rootScope']
  function SpinnerController($rootScope) {
    var $ctrl = this;

    // "normal" ShoppingList
    // var cancelListener = $rootScope.$on('shoppinglist:processing', function (event, data){
    //   console.log("Event:", event);
    //   console.log("Data:", data);
    //
    //   if(data.on){
    //     $ctrl.showSpinner = true;
    //   }else{
    //     $ctrl.showSpinner = false;
    //   }
    // });

    // Routed ShoppingList
    var cancellers = [];

    $ctrl.$onInit = function () {
      console.log("On init");

      var cancel = $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options){
        console.log("Start");
        $ctrl.showSpinner = true;
      });
      cancellers.push(cancel);

      cancel = $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams){
        console.log("Success");
        $ctrl.showSpinner = false;
      });
      cancellers.push(cancel);

      cancel = $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        console.log("Error");
        $ctrl.showSpinner = false;
      });
      cancellers.push(cancel);
    }

    $ctrl.$onDestroy = function () {
      // cancelListener();
      cancellers.forEach(function(item){
        item();
      });
    };
  };
})();
