(function() {
  'use strict';

  var gameModule = angular.module('opp.game', ['opp.core']);

  gameModule.controller('GameCtrl', ['$scope', '$state', 'CONSTS', function($scope, $state, CONSTS) {

    $scope.gameName = 'game22';

    $scope.tableName = $state.params.tableName;
    //$scope.cards = $state.params.cardsValue;
    $scope.cards = CONSTS.CARDS_TYPES.SEQUENTIAL;
    $scope.release = $state.params.release;
    $scope.sprint = 'sprint 1';
    $scope.team = 'team1';
    $scope.userstory = "user storyyyyyyyyyyyyyyy";
    $scope.players = [
      {
        name: 'player 1',
        voteValue: null
      },
      {
        name: 'player 2',
        voteValue: null
      },
      {
        name: 'player 3',
        voteValue: null
      },
      {
        name: 'player 4',
        voteValue: null
      },
      {
        name: 'player 5',
        voteValue: null
      },
    ];

    $scope.disableOtherCards = function(selectedCard) {
      angular.forEach($scope.cards, function(card) {
        if (card.value !== selectedCard.value) {
          card.isEnable = false;
        }
      })
    }

  }]);


})();