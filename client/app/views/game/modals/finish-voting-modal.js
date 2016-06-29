(function() {
  'use strict';

  var gameModule = angular.module('opp.game');

  gameModule.controller('ModalFinishVotingCtrl', ['$scope', '$uibModalInstance', 'finishVotingData', 'gameSvc' , function($scope, $uibModalInstance, finishVotingData, gameSvc) {

    function init() {
      $scope.vote = finishVotingData.vote;
      $scope.spValue = 0;
      $scope.commentsValue = '';
      prepareDataForChart();
    }

    function prepareDataForChart() {
      var data = [];
      angular.forEach($scope.vote.playersVotes, function(playerVote) {
        data.push(
          {
            name: playerVote.name,
            value: angular.isNumber(playerVote.value) ? playerVote.value : 0
          }
        )
      });

      $scope.voteDataForChart = data;
    }

    $scope.saveAndContinue = function() {
      var data = {
        comment: 'this is a comment',
        value: 8
      };
      console.log(data);
      gameSvc.updateStory(2463, $scope.spValue, $scope.commentsValue);
      $uibModalInstance.close(data);
    };

    init();

  }]);


})();