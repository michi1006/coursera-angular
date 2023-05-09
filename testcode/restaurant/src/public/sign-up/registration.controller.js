(function () {
  'use strict';

  angular.module('public')
    .controller('RegistrationController', RegistrationController);

  RegistrationController.$inject = ['RegistrationService'];
  function RegistrationController(RegistrationService) {
    var $ctrl = this;
    $ctrl.favDishExists = true;

    $ctrl.submit = async function () {
      var favDish = await RegistrationService.getFavoriteDish($ctrl.user.favdish);

      $ctrl.favDishExists =  (favDish !== undefined && favDish !== null);

      if(!$ctrl.favDishExists){
        console.log("Not going to submit, dish does not exist!");
        return;
      }
      $ctrl.user.favDish = favDish;
      RegistrationService.registerUser($ctrl.user);
    }
  }
})();
