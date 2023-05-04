(function (){
  'use strict'

  angular.module('searchApp', [])
    .controller('SearchController', SearchController)
    .factory('SearchServiceFactory', SearchServiceFactory)
    .directive('foundItems', FoundItemsDirective)
    .directive('itemsLoader', ItemsLoaderDirective)
    ;

    function ItemsLoaderDirective(){
      var ddo = {
        restrict: 'E',
        templateUrl: 'loader/itemsloaderindicator.template.html',
        controller: 'SearchController',
        bindToController: true,
        link: ItemsLoaderDirectiveLink,
        transclude: true
      };

      return ddo;
    }

    function ItemsLoaderDirectiveLink(scope, element, attrs, controller){
      scope.$watch('search.searchActive', function (newValue, oldValue){
        var elem = element.find('div');

        if(newValue === true){
          elem.css('display', 'block');
        }else{
          elem.css('display', 'none');
        }
      });
    }

    function FoundItemsDirective(){
      var ddo = {
        restrict: 'E',
        templateUrl: "foundItems.html",
        scope: {
          foundItems: '<',
          onRemove: '&'
        }
      };

      return ddo;
    }

    SearchController.$inject = ['SearchServiceFactory', '$timeout']
    function SearchController(SearchServiceFactory, $timeout) {
      var search = this;
      var service = SearchServiceFactory();

      search.searchValue = "8010";
      search.foundItems = [];
      search.searchActive = false;

      search.searchItems = function () {
        search.searchActive = true;
        $timeout(function(){
          search.foundItems = service.getData(search.searchValue);
          search.searchActive = false;
        }, 3000);
      };

      search.removeItem = function(index){
        search.foundItems.splice(index, 1);
      }
    };

    SearchServiceFactory.$inject = ['$http']
    function SearchServiceFactory($http){
      var factory = function(){
        return new SearchService($http);
      }
      return factory;
    };

    SearchService.$inject = ['$http']
    function SearchService($http){
      var service = this;

      service.getData = function (searchValue) {
        var filteredData = [];

        var promise = function (){
          var response = $http({
            method: "GET",
            url: "https://data.rtr.at/api/v1/tables/plz.json"
          });

          return response;
        };

        promise().then(function(response){
          var responseData = response.data.data;

          for (var i = 0; i < responseData.length; i++) {
            if(responseData[i].plz == searchValue){
              var bezirkData = {
                ort: responseData[i].ort,
                bezirk: responseData[i].bezirk,
                bundesland: responseData[i].bundesland
              }

              filteredData.push(bezirkData);
            }
          }

        })
        .catch(function(error){
          console.log("Something went wrong.");
        });

        return filteredData;
      }
    }
})();
