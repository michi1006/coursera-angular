(function(){
  'use strict';

  angular.module('DistrictListApp')
  .component('statelist', {
    templateUrl: 'src/districtlist/templates/statelist.template.html',
    bindings: {
      items: '<'
    }
  })
})();
