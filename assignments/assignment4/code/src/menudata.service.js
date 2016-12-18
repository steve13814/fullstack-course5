(function () {
'use strict';

angular.module('MenuData')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var mds = this;
  mds.getAllCategories = function() {
    return $http.get("https://davids-restaurant.herokuapp.com/categories.json")
      .then(function(response) {
        return response.data;
      });
  };

  mds.getItemsForCategory = function(categoryShortName) {
    return $http.get("https://davids-restaurant.herokuapp.com/menu_items.json", {category: categoryShortName})
      .then(function(response) {
        return response.data.menu_items;
      });
  };
}

})();
