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
        addVoteFn: '&'
      },
      templateUrl: 'app/views/game/directives/card-drtv/card-drtv.html',
      link: function(scope) {

        scope.isSelected = scope.isSelected || false;

        scope.selectCard = function() {
          if (scope.isEnable && !scope.isSelected) {
            scope.isSelected = !scope.isSelected;
            //scope.disableOtherCardsFn({selectedCard: this});
            scope.OpenVoteCommentModal(this);
          }
        };


        scope.OpenVoteCommentModal = function(selectedCard) {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/views/game/modals/vote-comment-modal.html',
            controller: 'ModalVoteCommentCtrl',
            backdrop: 'static',
            keyboard: false
          });
          modalInstance.result.then(function (data) {
            data.selectedCard = selectedCard;
            console.log(data);
            scope.addVoteFn({voteData: data});
          });
        };
      }
    }
  }])

})();