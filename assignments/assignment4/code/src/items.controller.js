(function () {
'use strict';

angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

ItemsController.$inject = ['itemsList'];
function ItemsController(itemsList) {
  var itemCtrl = this;

  itemCtrl.itemsList = itemsList;
}

})();
