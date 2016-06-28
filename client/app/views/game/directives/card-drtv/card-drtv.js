(function() {
  'use strict';

  var gameModule = angular.module('opp.game');

  gameModule.directive('cardDrtv', [function() {
    return {
      restrict: 'E',
      scope: {
        value: '@',
        isSelected: '=',
        isEnable: '=',
        disableOtherCardsFn: '&'
      },
      templateUrl: 'app/views/game/directives/card-drtv/card-drtv.html',
      link: function(scope) {

        scope.isSelected = scope.isSelected || false;

        scope.selectCard = function() {
          if (scope.isEnable && !scope.isSelected) {
            scope.isSelected = !scope.isSelected;
            scope.disableOtherCardsFn({selectedCard: this});
          }
        }


      }
    }
  }])

})();