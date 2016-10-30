(function() {
  'use strict';

  var gameModule = angular.module('opp.game');

  gameModule.controller('ModalFinishVotingCtrl', ['$scope', '$uibModalInstance', 'finishVotingData', 'gameSvc' , function($scope, $uibModalInstance, finishVotingData, gameSvc) {

    var selectedWorkItemIndex, tableId;

    function init() {
      selectedWorkItemIndex = finishVotingData.selectedWorkItemIndex;
      tableId = finishVotingData.tableId;
      $scope.workItemType = finishVotingData.workItemType;
      $scope.vote = finishVotingData.votes;
      $scope.workItemId = finishVotingData.workItemId;
      $scope.spValue = 0;
      $scope.commentsValue = '';
      prepareDataForChart();
      prepareAggregatedData();

    }

    function prepareDataForChart() {
      var data = [];
      angular.forEach($scope.vote, function(playerVote) {
        data.push(
          {
            name: playerVote.userName,
            value: getValueFromEstimation(playerVote.estimation)
          }
        );

        var currComment =  playerVote.userName + ': ' + playerVote.comment + '\n';
        $scope.commentsValue = $scope.commentsValue + currComment;
      });
      $scope.voteDataForChart = data;
    }

    function getValueFromEstimation(playerVoteEstimation) {
      switch (playerVoteEstimation) {
        case '?' :
          return 0;
        case 'XS' :
          return 1;
        case 'S' :
          return 2;
        case 'M' :
          return 5;
        case 'L' :
          return 13;
        case 'XL' :
          return 40;
        case 'XXL' :
          return 100;
        default:
          return parseInt(playerVoteEstimation);
      }
    }

    function prepareAggregatedData() {
      var numOfVotes = 0, min = 0;
      if($scope.vote){
        numOfVotes = $scope.vote.length;
        min = Number.MAX_SAFE_INTEGER;
      }
      else {
        $scope.vote = {};
      }
      var max = 0;
      var sum = 0;
      var value;
      angular.forEach($scope.vote, function(playerVote) {
        if (playerVote.estimation  === '?') {
          numOfVotes--;
        }
        value = getValueFromEstimation(playerVote.estimation);

        if (value < min) {
          min = value;
        }
        if (value > max) {
          max = value;
        }
        sum += value;
      });
      $scope.vote.lowestValue = min;
      $scope.vote.highestValue = max;
      if(numOfVotes === 0) {
        $scope.vote.averageValue = 0;
      } else {
        $scope.vote.averageValue = sum / numOfVotes;
      }
    }

    $scope.saveAndContinue = function() {
      var data = {
        workItemId: $scope.workItemId,
        comment: $scope.commentsValue,
        value:  $scope.spValue,
        tableId: tableId,
        selectedWorkItemIndex: selectedWorkItemIndex
      };
      gameSvc.updateWorkItem(data);
      $uibModalInstance.close(data);
    };

    init();

  }]);


})();