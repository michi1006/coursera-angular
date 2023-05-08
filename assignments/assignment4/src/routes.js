(function () {
  'use strict';

  angular.module('DistrictListApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider


    // Home
    .state('home', {
      url: '/',
      templateUrl: 'src/districtlist/templates/home.template.html'
    })

    .state('statelist', {
      url: '/state-list',
      templateUrl: 'src/districtlist/templates/main-statelist.template.html',
      controller: 'StateListController as sCtrl',
      resolve: {
        items : ['DistrictListFactory', '$http', function(DistrictListFactory, $http){
          var service = DistrictListFactory($http);
          return service.getData();
        }]
      }
    })

    .state('statelist.districtlist', {
      url: '/{state}',
      templateUrl: 'src/districtlist/templates/districtlist.template.html',
      controller: 'DistrictListController as dCtrl',
      params: {
        state: null
      }
    })
  }
})();
