(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.controller('ModalCreateTableCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {

    function init() {
      initCardsValues();
      initReleases();
    }

    function initCardsValues() {
      $scope.cardsValues = [
        'Scrum',
        'Fibonacci',
        'T-shirt'
      ];

      $scope.selectedCardsValue = $scope.cardsValues[0];

      $scope.setChoice = function(data){
        $scope.selectedCardsValue = data;
      };
    }

    function initReleases() {
      // todo: need to take this values from octane api
      $scope.releases = [
        'release 1',
        'release 2',
        'release 3'
      ];

      $scope.selectedRelease = $scope.releases[0];

      $scope.setRelease = function(data){
        $scope.selectedRelease = data;
      };
    }


    $scope.create = function() {
      var data = {
        tableName: $scope.tableName,
        cardsValue: $scope.selectedCardsValue,
        release: $scope.selectedRelease
      };
      console.log(data);
      $uibModalInstance.close(data);
    };

    init();

  }]);


})();