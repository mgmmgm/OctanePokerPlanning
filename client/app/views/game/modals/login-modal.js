(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.controller('loginCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {

    $scope.login = function() {
      if(!$scope.loginUsername)
        return;
      var data = {
        username: $scope.loginUsername
      };
      console.log(data);
      $uibModalInstance.close(data);
    };

  }]);

})();