(function() {
  'use strict';

  var gameModule = angular.module('opp.game', ['opp.core']);

  gameModule.controller('GameCtrl', ['$scope', '$state', 'gameSvc', 'releasesSvc ', 'CONSTS', function($scope, $state, gameSvc, releasesSvc, CONSTS) {

    function init() {
      gameSvc.getGameById($state.params.tableId).then(
        function(result) {
          $scope.gameName = result.data.name;
          $scope.cards = CONSTS.CARDS_TYPES.SEQUENTIAL;
          $scope.releaseName = result.data.releaseName;
          $scope.releaseId = result.data.releaseId;
          $scope.sprintName = 'sprint 1';
          $scope.teamName = 'team1';
          $scope.userstory = "user storyyyyyyyyyyyyyyy";
          $scope.players = result.data.players;
          $scope.linkToGame = result.data.linkToGame;
          $scope.tableId = $state.params.tableId;
        }
      )
    }

    //$scope.players = [
    //  {
    //    name: 'player 1',
    //    voteValue: null,
    //    isOwner: false
    //  },
    //  {
    //    name: 'player 2',
    //    voteValue: 10,
    //    isOwner: true
    //  },
    //  {
    //    name: 'player 3',
    //    voteValue: 8,
    //    isOwner: false
    //  },
    //  {
    //    name: 'player 4',
    //    voteValue: null,
    //    isOwner: false
    //  },
    //  {
    //    name: 'player 5',
    //    voteValue: 15,
    //    isOwner: false
    //  }
    //];

    $scope.disableOtherCards = function(selectedCard) {
        $scope.selectedValue = selectedCard.value;
      angular.forEach($scope.cards, function(card) {
        if (card.value !== selectedCard.value) {
          card.isEnable = false;
        }
      })
    }

      $scope.updateStoryPoints = function() {
          releasesSvc.updateStory(2463, $scope.selectedValue);
      }

    $scope.addPlayer = function() {
      $scope.players.push({
        name: 'player 6',
        voteValue: 23,
        isOwner: false
      });

    }

    init();

  }]);


})();