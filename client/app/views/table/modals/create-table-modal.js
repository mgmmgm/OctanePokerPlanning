(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.controller('ModalCreateTableCtrl', ['$scope', '$uibModalInstance', 'releasesSvc', 'connectSvc', function($scope, $uibModalInstance, releasesSvc, connectSvc) {

    function init() {
      connect().then(function() {
        initCardsValues();
        initReleases();
        initSprints();
        initTeams();
      });

    }

    function initCardsValues() {
      $scope.cardsValues = [
        'Scrum',
        'Fibonacci',
        'T-shirt'
      ];

      $scope.selectedCardsValue = $scope.cardsValues[0];

      $scope.setChoice = function(data) {
        $scope.selectedCardsValue = data;
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
        cardsValue: $scope.selectedCardsValue,
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