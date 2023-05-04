(function(){
  angular.module('RoutingApp', ['ui.router']);

  angular.module('RoutingApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider){

    // Redirect to tab 1 if no other URL matches
    $urlRouterProvider.otherwise('/tab1');

    $stateProvider
    .state('tab1', {
      url: '/tab1',
      // template: '<div>This is TAB 1 </div>'
      templateUrl: 'src/tabbed/tab1.html'
    })
    .state('tab2', {
      url: '/tab2',
      // template: '<div>This is TAB 2 </div>'
      templateUrl: 'src/tabbed/tab2.html'
    });

  }
})();
