(function() {
  'use strict';

  angular.module("LunchCheck", [])
  .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.menu = "";
    $scope.message = "";
    $scope.messageStyle = {color: "black"};
    $scope.textStyle = {borderColor: "black"};
    $scope.checkLunch = function() {
      var count = 0;
      $scope.menu.split(",").forEach(function(elem) {
        if (elem.trim() !== "") {
          count = count + 1;
        }
      });
      if (count === 0) {
        $scope.message = "Please enter data first";
        $scope.messageStyle = {color: "red"};
        $scope.textStyle = {borderColor: "red"};
      } else if (count <= 3) {
        $scope.message = "Enjoy!";
        $scope.messageStyle = {color: "green"};
        $scope.textStyle = {borderColor: "green"};
      } else {
        $scope.message = "Too much!";
        $scope.messageStyle = {color: "green"};
        $scope.textStyle = {borderColor: "green"};
      }
    };
  }
})();
