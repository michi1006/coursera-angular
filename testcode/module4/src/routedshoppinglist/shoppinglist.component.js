(function () {
'use strict';

angular.module('ShoppingList')
.component('shoppingList', {
  templateUrl: 'src/routedshoppinglist/templates/shoppinglist.template.html',
  bindings: {
    items: '<'
  }
});

})();
