(function () {
  'use strict';

  angular.module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['RegistrationService']
  function MyInfoController(RegistrationService) {
    var $ctrl = this;

    $ctrl.notRegisteredYet= RegistrationService.notRegisteredYet();
    $ctrl.user = RegistrationService.getUserData();
  }
})();
