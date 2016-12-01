(function() {
'use strict';

angular.module("ShoppingListCheckOff", [])
.controller("ToBuyController", ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService);

ToBuyController.$inject = ["ShoppingListCheckOffService"];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyCtl = this;

  toBuyCtl.items = ShoppingListCheckOffService.getToBuyItems();
  toBuyCtl.empty = function() {
    return toBuyCtl.items.length === 0;
  };
  toBuyCtl.buyItem = function(index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtCtl = this;

  boughtCtl.items = ShoppingListCheckOffService.getBoughtItems();
  boughtCtl.empty = function() {
    return boughtCtl.items.length === 0;
  };
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyItems = [
    {name: "cupcake", quantity: 10},
    {name: "donut", quantity: 3},
    {name: "eclair", quantity: 5},
    {name: "froyo", quantity: 7},
    {name: "gingerbread", quantity: 2},
    {name: "honeycomb", quantity: 1},
    {name: "icecream sandwich", quantity: 4},
    {name: "jelly bean", quantity: 200},
    {name: "kitkat", quantity: 30},
    {name: "lollipop", quantity: 3},
    {name: "marshmallow", quantity: 100},
    {name: "nougat", quantity: 10}
  ];

  var boughtItems = [];

  service.getToBuyItems = function() {
    return toBuyItems;
  };

  service.getBoughtItems = function() {
    return boughtItems;
  };

  service.buyItem = function(index) {
    var item = toBuyItems.splice(index, 1);
    boughtItems.push(item[0]);
  };
}

})();
