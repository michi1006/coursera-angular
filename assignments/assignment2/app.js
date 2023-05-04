(function()
{

  angular.module("ShoppingListApp", [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('BuyingService', BuyingService);

  ToBuyController.$inject = ['BuyingService'];
  function ToBuyController(BuyingService){
    var toBuy = this;

    var toBuyList = [
      {
        name: 'Apples',
        quantity: 5
      },
      {
        name: 'Bananas',
        quantity: 3
      },
      {
        name: 'Milk',
        quantity: 5
      },
      {
        name: 'Salmon',
        quantity: 5
      },
      {
        name: 'Tofu',
        quantity: 5
      }
    ];

    BuyingService.setToBuyItems(toBuyList);
    toBuy.openToBuyList = BuyingService.getToBuyItems();
    toBuy.isToBuyEmpty = function(){
      return toBuy.openToBuyList.length === 0;
    };

    toBuy.buyItem = function(index){
      BuyingService.buyItem(index);
    };
  };

  AlreadyBoughtController.$inject = ['BuyingService'];
  function AlreadyBoughtController(BuyingService){
    var bought = this;

    bought.getBoughtItems = function() {
      return BuyingService.getBoughtItems();
    };

    bought.isBoughtEmpty = function() {
      var empty = BuyingService.getBoughtItems().length === 0;
      return empty;
    };

    bought.clearList = function() {
      BuyingService.emptyBoughtList();
    };
  }

  function BuyingService(){
    var service = this;

    var toBuyItems = [];
    var boughtItems = [];

    service.setToBuyItems = function(items){
      toBuyItems = items;
    };

    service.getToBuyItems = function(){
      return toBuyItems;
    };

    service.buyItem = function(index){
      var boughtItem   = toBuyItems.splice(index, 1)[0];
      boughtItems.push(boughtItem);
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.emptyBoughtList = function () {
      if(boughtItems.length === 0){
        console.log("Nothing to do!");
        return;
      }

      toBuyItems.push.apply(toBuyItems, boughtItems);
      boughtItems = [];
    };
  }
})();
