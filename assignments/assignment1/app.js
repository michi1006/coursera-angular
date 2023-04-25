(function(){
'use-strict';

  angular.module('assignment1', [])
  .controller('Controller1', Controller1);

  Controller1.$inject=['$scope'];

  function Controller1($scope) {
    $scope.foodString = "";
    $scope.foodLengthResult = 0;

    $scope.doCheckFoodList = function(){
      $scope.resultMessage = "No food list entered, you must be hungry.";
      $scope.healthy = false;

      if ($scope.foodString.length == 0) {
        return;
      }

      var splitText = $scope.foodString.split(',');

      var foodListLength = 0;
      for (var i = 0; i < splitText.length; i++) {
        var trimmedText = splitText[i].trim()
          if(trimmedText.length != 0) {
            if(trimmedText == 'salad'){
              $scope.healthy = true;
            }
            foodListLength++;
          }
      }

      if(foodListLength > 3){
        $scope.resultMessage = "Too much! You don't want to get fat."
      }else if(foodListLength > 0 && foodListLength <= 3){
        if($scope.healthy){
          $scope.resultMessage = "Enjoy! Healthy choice btw.";
        }else{
          $scope.resultMessage = "Enjoy! Better choose something healthy.";
        }
      }
      $scope.foodLengthResult = foodListLength;
    }
  };
}());
