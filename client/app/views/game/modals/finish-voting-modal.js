(function() {
  'use strict';

  var gameModule = angular.module('opp.game');

  gameModule.controller('ModalFinishVotingCtrl', ['$scope', '$uibModalInstance', 'finishVotingData', function($scope, $uibModalInstance, finishVotingData) {

    function init() {
      $scope.vote = finishVotingData.vote;
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
      $uibModalInstance.close(data);
    };

    init();

  }]);


})();