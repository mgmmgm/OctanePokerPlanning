(function() {
  'use strict';

  var tableModule = angular.module('opp.table', []);

  tableModule.controller('TableCtrl', ['$scope', '$state', '$uibModal', 'tableSvc', 'loggedinSvc',  function($scope, $state, $uibModal, tableSvc, loggedinSvc) {

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
          ownerName: data.ownerUserName,
          cardsValue: data.cardsValue,
          release: data.release,
          sprint: data.sprint,
          team: data.team
        };

        tableSvc.addTable(newTable).then(
          function(result) {
            console.log(result.data);
            loggedinSvc.setUser(newTable.ownerName);
            $state.go('game', {tableId: result.data.id});
          }
        )
      });
    };

    $scope.OpenJoinTableModal = function(tableId) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/views/table/modals/join-table-modal.html',
        controller: 'ModalJoinTableCtrl'
      });
      modalInstance.result.then(function (displayName) {
        var joinData = {
          id: tableId,
          displayName: displayName.displayName
        }
        tableSvc.joinTable(joinData).then(function(data) {
            $scope.tables[data.id] = data;
            loggedinSvc.setUser(joinData.displayName);
            $state.go('game', {tableId: tableId});
          }
        );
      });
    };

    $scope.delete = function() {
      console.log('delete table');
    };

    init();

  }]);


})();