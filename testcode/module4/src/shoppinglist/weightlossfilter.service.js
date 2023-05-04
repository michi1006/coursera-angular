(function(){
  'use strict';

  angular.module('ShoppingList')
  .service('WeightLossFilterService', WeightLossFilterService);

  WeightLossFilterService.$inject = ['$q', '$timeout']
  function WeightLossFilterService($q, $timeout) {
    var service = this;

    service.checkName = function (name) {
      var deferred = $q.defer();

      var result = {
        msg: ""
      };

      $timeout(function(){
        if (name.toLowerCase().indexOf('cookie') === -1) {
          deferred.resolve(result);
        }else{
          result.msg = "Cookies detected!";
          deferred.reject(result);
        }
      }, 1000);

      return deferred.promise;
    }
  }
})();
