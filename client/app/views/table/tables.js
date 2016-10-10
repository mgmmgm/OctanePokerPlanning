(function() {
  'use strict';

  var tableModule = angular.module('opp.table', []);

  tableModule.controller('TableCtrl', ['$scope', '$state', '$uibModal', 'tableSvc', 'socketSvc', 'loggedinSvc',  function($scope, $state, $uibModal, tableSvc, socketSvc, loggedinSvc) {

    function init() {
      $scope.connected = false;
      var currentUser = loggedinSvc.getUser();
      if(currentUser) {
        $scope.hasUser = true;
        tableSvc.getTables(currentUser).then(
          function(result) {
            $scope.tables = result.data.tables;
          }
        );
      } else {
        $scope.hasUser = false;
        $scope.tables = [];
      }
    }


    $scope.connectToOctane = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/views/table/modals/connect-octane-modal.html',
        controller: 'ModalOctaneConnectCtrl',
        backdrop: 'static'
      });

      modalInstance.result.then(function (data) {
        $scope.connected = data;
      });
    }
    

    $scope.OpenCreateTableModal = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/views/table/modals/create-table-modal.html',
        controller: 'ModalCreateTableCtrl',
        resolve: {
          userData: function() {
            return {
              username: $scope.connected,

            };
          }

        }
      });

      modalInstance.result.then(function (data) {

        var newTable = {
          name: data.tableName,
          numberOfPlayers: 1,
          status: 'active',
          ownerName: data.ownerUserName,
          cardsType: data.cardsType,
          itemsType: data.itemsType,
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
        controller: 'ModalJoinTableCtrl',
        backdrop: 'static',
        keyboard: false
      });
      modalInstance.result.then(function (displayName) {
        var joinData = {
          id: tableId,
          displayName: displayName.displayName
        };
        tableSvc.joinTable(joinData).then(function(data) {
            $scope.tables[data.id] = data;
            loggedinSvc.setUser(joinData.displayName);
            socketSvc.emit("player:newPlayerAdded", {
              playerName: joinData.displayName
            });
            $state.go('game', {tableId: tableId});
          }
        );
      });
    };

    $scope.delete = function(tableId) {
      console.log('delete table');
      tableSvc.deleteTable(tableId).then(function(data) {
        tableSvc.getTables().then(
          function(result) {
            $scope.tables = result.data.tables;
          }
        );
      });
    };

    init();

  }]);


})();