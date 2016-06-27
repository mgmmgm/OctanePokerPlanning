(function() {
  'use strict';

  var gameModule = angular.module('opp.game', []);

  gameModule.controller('GameCtrl', ['$scope', '$state', function($scope, $state) {

    $scope.gameName = 'game22';

    $scope.tableName = $state.params.tableName;
    $scope.cardsValue = $state.params.cardsValue;
    $scope.release = $state.params.release;

  }]);


})();