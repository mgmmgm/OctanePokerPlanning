(function() {
  'use strict';

  var tableModule = angular.module('opp.table', []);

  tableModule.controller('TableCtrl', ['$scope', '$state', '$uibModal', 'tableSvc', function($scope, $state, $uibModal, tableSvc) {

    function init() {
      tableSvc.getTables().then(
        function(result) {
          $scope.tables = result.data.tables;
        }
      );
    }

    $scope.OpenCreateTableModal = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/views/table/modals/create-table-modal.html',
        controller: 'ModalCreateTableCtrl'
      });

      modalInstance.result.then(function (data) {
        $state.go('game', {tableName: data.tableName, cardsValue: data.cardsValue, release: data.release});
      });
    };

    $scope.join = function() {
      console.log('join to table');
    };

    $scope.delete = function() {
      console.log('delete table');
    };

    init();

  }]);


})();