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

      $scope.setChoice = function(data){
        $scope.selectedCardsValue = data;
      };
    }

    function connect() {
      return connectSvc.connect();
    }

    function initReleases() {
      releasesSvc.getReleases().then(
        function(result) {
          $scope.releases = result.data;
          if($scope.releases.length > 0)
            $scope.selectedRelease = $scope.releases[0];
        }
      );

      $scope.setRelease = function(data){
        $scope.selectedRelease = data;
      };
    }

    function initSprints() {
      releasesSvc.getSprints().then(
        function(result) {
          $scope.sprints = result.data;
          if($scope.sprints.length > 0)
            $scope.selectedSprint = $scope.sprints[0];
        }
      );

      $scope.setSprint = function(data){
        $scope.selectedSprint = data;
      };
    }

    function initTeams() {
      releasesSvc.getTeams().then(
        function(result) {
          $scope.teams = result.data;
          if($scope.teams.length > 0)
            $scope.selectedTeam = $scope.teams[0];
        }
      );

      $scope.setTeam = function(data){
        $scope.selectedTeam = data;
      };
    }

    $scope.create = function() {
      if(!$scope.tableName || !$scope.ownerUserName)
        return;
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