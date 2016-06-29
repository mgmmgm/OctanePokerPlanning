(function() {
  'use strict';

  var gameModule = angular.module('opp.game');

  gameModule.controller('ModalFinishVotingCtrl', ['$scope', '$uibModalInstance', 'finishVotingData', 'gameSvc' , function($scope, $uibModalInstance, finishVotingData, gameSvc) {

    function init() {
      $scope.vote = finishVotingData.votes;
      $scope.userStoryId = finishVotingData.storyId;
      $scope.spValue = 0;
      $scope.commentsValue = '';
      prepareDataForChart();
    }

    function prepareDataForChart() {
      var data = [];
      angular.forEach($scope.vote, function(playerVote) {
        data.push(
          {
            name: playerVote.userName,
            value: playerVote.estimation === '?' ? 0 : +playerVote.estimation
          }
        )
      });

      $scope.voteDataForChart = data;
    }

    $scope.saveAndContinue = function() {
      var data = {
        storyId: $scope.userStoryId,
        comment: $scope.spValue,
        value:  $scope.commentsValue
      };
      console.log(data);
      gameSvc.updateStory($scope.userStoryId, $scope.spValue, $scope.commentsValue);
      $uibModalInstance.close(data);
    };

    init();

  }]);


})();