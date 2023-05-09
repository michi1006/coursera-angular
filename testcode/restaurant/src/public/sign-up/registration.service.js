(function () {
  'use strict';

  angular.module('public')
    .service('RegistrationService', RegistrationService);

  RegistrationService.$inject = ['$http', 'ApiPath'];
  function RegistrationService($http, ApiPath) {
    var service = this;
    service.users = new Map();

    service.registeredUser;

    service.getFavoriteDish  = async function (favdish) {
      if (favdish == undefined){
        console.log("Favorite dish seems to be undefined!");
        return null;
      }

      var sep = favdish.match(/[a-zA-Z]+|[0-9]+/g);

      if(sep.length !== 2){
        console.log("Favorite dish seems not to be of the correct format! " + sep);
        return null;
      }

     var promise = await function () {
       return $http.get(ApiPath + "/menu_items/" + sep[0] + "/menu_items/" + (--sep[1])+ ".json");
     }

     return await promise().then(function (response) {
       console.log("Retrieved data: " + response.data);
       response.data.categoryShortName = sep[0];
       return response.data;
     }, function (errorResponse) {
       console.log("Error: " + errorResponse.data);
       return null;
     });
   };

   service.registerUser = function (user) {
     service.registeredUser = user;

     if(service.users.has(user.email)){
       console.log("User already registered!");
       return;
     }

     service.users.set(user.email, user);
     console.log(service.users);
   };

   service.notRegisteredYet = function () {
     return service.registeredUser == undefined;
   };

   service.getUserData = function(){
     return service.registeredUser;
   }
  }
})();
