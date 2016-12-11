(function() {
'use strict';
angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .directive("foundItems", FoundItemsDirective);

NarrowItDownController.$inject = ["MenuSearchService"];
function NarrowItDownController(MenuSearchService) {
  var NIDCtrl = this;

  NIDCtrl.searchTerm = "";
  NIDCtrl.found = [];
  NIDCtrl.ignoreCase = false;
  NIDCtrl.search = function() {
    MenuSearchService.getMatchedMenuItems(NIDCtrl.searchTerm, NIDCtrl.ignoreCase)
      .then(function(data) {
        NIDCtrl.found = data;
      });
  };

  NIDCtrl.onRemove = function(index) {
    NIDCtrl.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ["$http"];
function MenuSearchService($http) {
  var search = this;

  search.getMatchedMenuItems = function(searchTerm, ignoreCase) {
    return $http.get("https://davids-restaurant.herokuapp.com/menu_items.json")
      .then(function (result) {
        var foundItems = [];

        if (searchTerm === "") {
          return [];
        }

        // process result and only keep items that match
        if (!ignoreCase) {
          foundItems = result.data.menu_items.filter(function(value) {
            return -1 !== value.description.indexOf(searchTerm);
          });
        } else {
          var lcSearchTerm = searchTerm.toLowerCase();
          foundItems = result.data.menu_items.filter(function(value) {
            var lcDesc = value.description.toLowerCase();
            return -1 !== lcDesc.indexOf(lcSearchTerm);
          });
        }

        // return processed items
        return foundItems;
    });
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'found-items.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.empty = function() {
    return 0 === list.found.length;
  };
}

})();
