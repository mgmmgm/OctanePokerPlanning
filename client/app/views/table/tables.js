(function() {
  'use strict';

  var tableModule = angular.module('opp.table', []);

  tableModule.controller('TableCtrl', ['$scope', '$state', '$uibModal', 'tableSvc', 'socketSvc', 'loggedinSvc', 'releasesSvc', 'CONSTS',  function($scope, $state, $uibModal, tableSvc, socketSvc, loggedinSvc, releasesSvc, CONSTS) {

    function init() {
      $scope.connected = false;
      $scope.showCreateTableDialog = false;
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
    };

    $scope.openCreateTableDialog = function() {
      $scope.showCreateTableDialog = true;
      $scope.radioModelCardType = 'SCRUM';
      $scope.radioModelItemType = 'Stories';
      initReleases();
      initSprints();
      initTeams();
    };

    function initReleases() {
      $scope.setRelease = function(data) {
        $scope.selectedRelease = data;
        $scope.filterSprints();
      };

      releasesSvc.getReleases().then(
        function(result) {
          $scope.releases = result.data;
          if ($scope.releases.length > 0) {
            $scope.setRelease($scope.releases[0]);
          }
        }
      );
    }

    function initSprints() {
      $scope.setSprint = function(data) {
        $scope.selectedSprint = data;
      };

      $scope.filterSprints = function() {
        releasesSvc.getSprints($scope.selectedRelease.id).then(
          //  releasesSvc.getSprints("").then(
          function(result) {
            $scope.sprints = result.data;
            $scope.sprints.unshift({id: "-1", name: "All"});
            if ($scope.sprints.length > 0) {
              $scope.setSprint($scope.sprints[0]);
            }
          }
        );
      };
    }

    function initTeams() {

      $scope.setTeam = function(data) {
        $scope.selectedTeam = data;
      };
      releasesSvc.getTeams().then(
        function(result) {
          $scope.teams = result.data;
          $scope.teams.unshift({id: "-1", name: "All"});
          if ($scope.teams.length > 0) {
            $scope.setTeam($scope.teams[0]);
          }
        }
      );
    }

    $scope.createTable = function() {
      if (!$scope.tableName || !$scope.connected) {
        return;
      }
      var newTable = {
        name: $scope.tableName,
        numberOfPlayers: 1,
        status: 'active',
        ownerName: $scope.connected,
        cardsType: $scope.radioModelCardType,
        itemsType: $scope.radioModelItemType,
        release: $scope.selectedRelease,
        sprint: $scope.selectedSprint,
        team: $scope.selectedTeam
      };

      tableSvc.addTable(newTable).then(
        function(result) {
          console.log(result.data);
          loggedinSvc.setUser(newTable.ownerName);
          $state.go('game', {tableId: result.data.id});
        }
      )
    };

    $scope.OpenJoinTableModal = function(tableId) {
        $state.go('game', {tableId: tableId});
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