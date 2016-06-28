(function() {
  'use strict';

  var gameModule = angular.module('opp.game', ['opp.core']);

  gameModule.controller('GameCtrl', ['$scope', '$state', 'CONSTS', function($scope, $state, CONSTS) {

    $scope.gameName = 'game22';

    $scope.tableName = $state.params.tableName;
    $scope.ownerUserName = $state.params.ownerUserName;
    //$scope.cards = $state.params.cardsValue;
    $scope.cards = CONSTS.CARDS_TYPES.SEQUENTIAL;
    $scope.release = $state.params.release;
    $scope.sprint = $state.params.sprint;
    $scope.team = $state.params.team;
    $scope.userstory = "user storyyyyyyyyyyyyyyy";
    $scope.players = [
      {
        name: 'player 1',
        voteValue: null,
        isOwner: false
      },
      {
        name: 'player 2',
        voteValue: 10,
        isOwner: true
      },
      {
        name: 'player 3',
        voteValue: 8,
        isOwner: false
      },
      {
        name: 'player 4',
        voteValue: null,
        isOwner: false
      },
      {
        name: 'player 5',
        voteValue: 15,
        isOwner: false
      }
    ];

    $scope.disableOtherCards = function(selectedCard) {
      angular.forEach($scope.cards, function(card) {
        if (card.value !== selectedCard.value) {
          card.isEnable = false;
        }
      })
    }

    $scope.addPlayer = function() {
      $scope.players.push({
        name: 'player 6',
        voteValue: 23,
        isOwner: false
      });

      $scope.players[3].voteValue = 1;
    }

  }]);


})();