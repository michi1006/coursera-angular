(function() {
'use strict';

angular.module('myApp', [])
.controller('Controller', Controller)
.controller('ParentController', ParentController)
.controller('ChildController', ChildController)
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
//.factory('ShoppingListFactory', ShoppingListFactory)
//.service('ShoppingListService', ShoppingListService)
.provider('ShoppingListService', ShoppingListServiceProvider)
.config(Config)
.filter('loves', LovesFilter)
.filter('truth', TruthFilter);

Config.$inject = ['ShoppingListServiceProvider']
function Config(ShoppingListServiceProvider){
  ShoppingListServiceProvider.defaults.maxItems = 2;
}

ShoppingListController1.$inject = ['ShoppingListService'];
function ShoppingListController1(ShoppingListService){
  var list1 = this;

  //var shoppingList = ShoppingListFactory(); <- used for factory
  //list1.items = shoppingList.getItems();

  list1.items = ShoppingListService.getItems();

  list1.itemName = "";
  list1.itemQuantity = "";

  list1.addItem = function() {
    try{
      ShoppingListService.addItem(list1.itemName, list1.itemQuantity);
    }catch (error){
      list1.errorMessage = error.message;
    }
  };

  list1.removeItem= function(itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
};

ShoppingListController2.$inject = ['ShoppingListService'];
function ShoppingListController2(ShoppingListService){
  var list2 = this;

  //var shoppingList = ShoppingListFactory(3);
  //list2.items = shoppingList.getItems();

  list2.items = ShoppingListService.getItems();

  list2.itemName = "";
  list2.itemQuantity = "";

  list2.addItem = function() {
    try{
      ShoppingListService.addItem(list2.itemName, list2.itemQuantity);
    }catch (error){
      list2.errorMessage = error.message;
    }
  };

  list2.removeItem = function(itemIndex){
    ShoppingListService.removeItem(itemIndex);
  };
};

function ShoppingListService(maxItems){
  var service = this;

  var items = [];

  service.addItem = function (itemName, itemQuantity){
    if((maxItems === undefined) || (maxItems !== undefined && items.length < maxItems)){
      var item = {
        name : itemName,
        quantity : itemQuantity
      };
      items.push(item);
    } else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function(itemIndex){
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
};

/*
function ShoppingListFactory(){
  var factory = function(maxItems){
    return new ShoppingListService(maxItems);
  };

  return factory;
}*/

function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems : 10
  };

  provider.$get = function() {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);
    return shoppingList;
  };
};


Controller.$inject = ['$scope', '$filter', 'lovesFilter'];
function Controller($scope, $filter, lovesFilter) {
  $scope.name = "Michi";
  $scope.totalValue = 0;
  $scope.cost = .45;

  $scope.mood = "unhappy";
  $scope.activity = "couch";

  $scope.sayHello = function () {
    return "Hello Coursera";
  };

  $scope.displayNumeric = function(){
    var totalNameValue = 0; //get the total totalValue
    totalNameValue = calculateNumericForString($scope.name)
    $scope.totalValue = totalNameValue;
  };

  $scope.upper = function () {
    var upCase = $filter('uppercase');
    $scope.name = upCase($scope.name);
  };

  $scope.sayMessage = function () {
    var msg = "Michi likes to do sports.";
    var output = $filter('uppercase')(msg);
    return output;
  };

  $scope.sayLovesMessage = function () {
    var msg = "Michi likes to do sports.";
    var output = lovesFilter(msg);
    return output;
  };

  $scope.doSports = function () {
    $scope.mood = "happy";
    $scope.activity = "workout";
  };

  $scope.beLazy = function () {
    $scope.mood="unhappy";
    $scope.activity="couch";
  }
};

function ParentController(){
  var parent = this;
  parent.value = 1;
};

function ChildController(){
  var child = this;
  child.value = 5;
  console.log(child.value);
};

function LovesFilter() {
  return function(input){
    input = input || "";
    input = input.replace("likes", "loves");
    return input;
  };
};

function TruthFilter(){
  return function(input, target, replace){
    input = input || "";
    input = input.replace(target, replace);
    return input;
  }
};

function annotateMe(name, job){
  return "Test";
};

console.log(Controller.toString());

function calculateNumericForString (string){
    var totalStringValue = 0;
    for(var i = 0; i< string.length; i++){
      totalStringValue += string.charCodeAt(i);
    }
    return totalStringValue;
  }
})();
