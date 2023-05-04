(function(){
  'use strict';

  angular.module('DistrictListApp')
    .controller('DistrictListController', DistrictListController);

  DistrictListController.$inject = ['$stateParams','items']
  function DistrictListController ($stateParams, items) {
    var c = this;

    var allData = items.get($stateParams.state)
    var districts = new Set();

    allData.forEach(function(d){
      districts.add(d.bezirk);
    });

    c.state = $stateParams.state;
    c.totalNum = allData.length;
    c.distinctNum = districts.size;
    c.districtList = Array.from(districts);

    // console.log(c.districtList);
    // console.log(c.totalNum);
  }

})();
