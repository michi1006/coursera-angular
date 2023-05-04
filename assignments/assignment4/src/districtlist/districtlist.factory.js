(function(){
  'use strict';

  angular.module('DistrictListApp')
    .factory('DistrictListFactory', DistrictListFactory);

  DistrictListFactory.$inject = ['$http']
  function DistrictListFactory($http) {
    var factory = function() {
      return new DistrictListService($http);
    }

    return factory;
  }

  DistrictListService.$inject = ['$http']
  function DistrictListService($http){
    var service = this;

    service.getData = async function () {
      var promise = function (){
        var response = $http({
          method: "GET",
          url: "https://data.rtr.at/api/v1/tables/plz.json"
        });

        return response;
      };

      var returnMap = new Map();
      var mapPromise = await
      promise()
        .then(function (response) {
          var map = new Map();
          var responseData = response.data.data;

          for (var i = 0; i < responseData.length; i++) {
            var d = responseData[i];

            if(!map.has(d.bundesland)){
              map.set(d.bundesland, []);
            }
            else {

              var c = {
                plz : d.plz,
                bezirk : d.bezirk,
                ort : d.ort
              }

              map.get(d.bundesland).push(c);
            }
          }

          return map;
        })

        return mapPromise;
      };
  }
})();
