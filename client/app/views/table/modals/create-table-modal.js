(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.controller('ModalCreateTableCtrl', ['$scope', '$uibModalInstance', 'releasesSvc', 'userData', 'connectSvc', 'CONSTS', function($scope, $uibModalInstance, releasesSvc, userData, connectSvc, CONSTS) {

    function init() {
      //connect().then(function() {
        initOwnerUserName();
        initCardsValues();
        initReleases();
        initSprints();
        initTeams();
      //});

    }
    function initOwnerUserName() {
      $scope.ownerUserName = userData.username;
    }


    function initCardsValues() {
      $scope.cardsTypes = CONSTS.CARDS_TYPES;
       /* [
        'Scrum',
        'Fibonacci',
        'T-shirt',
        'sequential'
      ];
*/
      $scope.selectedCardsType = CONSTS.CARDS_TYPES.SCRUM;

      $scope.setChoice = function(data) {
        $scope.selectedCardsType = data;
      };
    }
    
    function connect() {
      return connectSvc.connect();
    }

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

    $scope.create = function() {
      if (!$scope.tableName || !$scope.ownerUserName) {
        return;
      }
      var data = {
        tableName: $scope.tableName,
        ownerUserName: $scope.ownerUserName,
        cardsType: $scope.selectedCardsType,
        itemsType: $scope.selectedItemsType,
        release: $scope.selectedRelease,
        sprint: $scope.selectedSprint,
        team: $scope.selectedTeam
      };
      console.log(data);
      $uibModalInstance.close(data);
    };

    init();

  }]);


})();