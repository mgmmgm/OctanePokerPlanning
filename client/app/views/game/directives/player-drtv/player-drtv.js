(function() {
  'use strict';

  var gameModule = angular.module('opp.game');

  gameModule.directive('playerDrtv', [function() {
    return {
      restrict: 'E',
      templateUrl: 'app/views/game/directives/player-drtv/player-drtv.html',
      scope: {
        name: '@',
        voteValue: '=',
        isOwner: '=',
        comment: '=',
        needToShow: '=',
        everyoneFinishVote: '='
      },
      link: function(scope, element) {


      }
    }


  }])

})();