(function() {
  'use strict';

  var gameModule = angular.module('opp.game', ['opp.core']);

  gameModule.controller('GameCtrl', ['$scope', '$state', '$uibModal', 'gameSvc', 'toastSvc', 'CONSTS', function($scope, $state, $uibModal, gameSvc, toastSvc, CONSTS) {

    var selectedUserstoryIndex = 0;

    // this array save all the final result
    var votes = [
      {
        userstory: {
          id: '1',
          name: 'some user story'
        },
        playersVotes: [
          {
            name: 'player name',
            value: 7
          },
          {
            name: 'player name 2',
            value: 3
          }
        ],
        lowestValue: 2,
        highestValue: 11,
        averageValue: 5,
        comment: '',
        chosenSpValue: 10
      }
    ];

    function init() {
      gameSvc.getGameById($state.params.tableId).then(
        function(result) {
          $scope.gameName = result.data.name;
          $scope.cards = CONSTS.CARDS_TYPES.SEQUENTIAL;
          $scope.releaseName = result.data.releaseName;
          $scope.releaseId = result.data.releaseId;
          $scope.sprintName = 'sprint 1';
          $scope.teamName = 'team1';
          $scope.userstories = [
            {
              id: '1',
              name: 'user story 11111'
            },
            {
              id: '2',
              name: 'user story 22'
            },
            {
              id: '3',
              name: 'user story 3333'
            }
          ];

          $scope.selectedUserstory = $scope.userstories[selectedUserstoryIndex];
          $scope.players = result.data.players;
          $scope.linkToGame = result.data.linkToGame;
          $scope.tableId = $state.params.tableId;
        }
      )
    }

    $scope.disableOtherCards = function(selectedCard) {
        $scope.selectedValue = selectedCard.value;
      angular.forEach($scope.cards, function(card) {
        if (card.value !== selectedCard.value) {
          card.isSelected = false;
          card.isEnable = false;
        }
      })
    };

      $scope.updateStoryPoints = function() {
         gameSvc.updateStory(2463, $scope.selectedValue);
      };

    $scope.skipUserstory = function() {
      selectedUserstoryIndex++;
      $scope.selectedUserstory = $scope.userstories[selectedUserstoryIndex];
      resetVotes();
    };

    $scope.finishVoting = function() {
      console.log($scope.players);
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/views/game/modals/finish-voting-modal.html',
        controller: 'ModalFinishVotingCtrl',
        resolve: {
          finishVotingData: function() {
            return {
              vote: votes[selectedUserstoryIndex]
            }
          }
        }
      });

      modalInstance.result.then(function (data) {
        console.log(data);
      });
    };

    function resetVotes() {
      angular.forEach($scope.cards, function(card) {
          card.isEnable = true;
        });
      angular.forEach($scope.players, function(player) {
        player.voteValue = null;
      });
    }


    $scope.addPlayer = function() {
      var newPlayerName = 'new player';
      $scope.players.push({
        name: 'player 6',
        voteValue: 23,
        isOwner: false
      });

      toastSvc.showInfoToast("player '" + newPlayerName + "' joined to the game");

    };

    init();

  }]);


})();