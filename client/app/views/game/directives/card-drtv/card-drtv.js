(function() {
  'use strict';

  var gameModule = angular.module('opp.game');

  gameModule.directive('cardDrtv', ["$uibModal", function($uibModal) {
    return {
      restrict: 'E',
      scope: {
        value: '@',
        isSelected: '=',
        isEnable: '=',
        disableOtherCardsFn: '&',
        addVoteCommentFn: '&'
      },
      templateUrl: 'app/views/game/directives/card-drtv/card-drtv.html',
      link: function(scope) {

        scope.isSelected = scope.isSelected || false;

        scope.selectCard = function() {
          if (scope.isEnable && !scope.isSelected) {
            scope.isSelected = !scope.isSelected;
            scope.disableOtherCardsFn({selectedCard: this});
            scope.OpenVoteCommentModal();
          }
        };


        scope.OpenVoteCommentModal = function() {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/views/game/modals/vote-comment-modal.html',
            controller: 'ModalVoteCommentCtrl'

          });
          modalInstance.result.then(function (data) {
            console.log(data);
            scope.addVoteCommentFn({voteComment: data.voteComment});
          });
        };
      }
    }
  }])

})();