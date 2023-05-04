(function(){
  'use strict';

  angular.module('DistrictListApp')
    .controller('StateListController', StateListController);

  StateListController.$inject = ['items']
  function StateListController (items) {
    var c = this;
    c.keyItems = Array.from(items.keys());
  }

})();
