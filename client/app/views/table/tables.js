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
        var newTable = {
          name: data.tableName,
          numberOfPlayers: 1,
          status: 'active',
          ownerName: 'moshe'
        };

        tableSvc.addTable(newTable).then(
          function(result) {
            console.log(result.data);
            $state.go('game', {tableId: result.data.id});
          }
        )
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