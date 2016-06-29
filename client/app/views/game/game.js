(function() {
  'use strict';

  var gameModule = angular.module('opp.game', ['opp.core']);

  gameModule.controller('GameCtrl', ['$scope', '$state', '$uibModal', '$interval', 'gameSvc', 'tableSvc', 'toastSvc', 'socketSvc', 'loggedinSvc', 'voteSvc', 'CONSTS', function($scope, $state, $uibModal, $interval, gameSvc, tableSvc, toastSvc, socketSvc, loggedinSvc, voteSvc, CONSTS) {

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
      subscribeToEvents();
      if(!loggedinSvc.getUser())
      {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/views/game/modals/login-modal.html',
          controller: 'loginCtrl'
        });

        modalInstance.result.then(function(data) {
          console.log(data);
          loggedinSvc.setUser(data.username);
        });
      }

      tableSvc.getTableById($state.params.tableId).then(
        function(result) {
          $scope.ownerName = result.data.ownerName;
          $scope.currentUser = loggedinSvc.getUser();
          $scope.isOwner = ($scope.currentUser === $scope.ownerName);
          $scope.gameName = result.data.name;
          $scope.cards = CONSTS.CARDS_TYPES.FIBB;
          $scope.releaseName = result.data.release.name;
          $scope.releaseId = result.data.release.id;
          $scope.sprintName = result.data.sprint.name;
          $scope.teamName = result.data.team.name;
          $scope.userstories = result.data.userStories;
          $scope.selectedUserstoryIndex = selectedUserstoryIndex;
          $scope.selectedUserstory = $scope.userstories[selectedUserstoryIndex];
          $scope.players = result.data.players;
          $scope.linkToGame = result.data.linkToGame;
          $scope.tableId = $state.params.tableId;
          $scope.isFinishedVoting = true;
        }
      )
    }

    function subscribeToEvents() {
      socketSvc.on('player:join', function (data) {
        refreshPlayers(data.newPlayer)
      });
    }

    function refreshPlayers(newPlayerName) {
      var newPlayer = {
        name: newPlayerName,
        voteValue: null,
        isOwner: false
      };
      $scope.players.push(newPlayer);
      toastSvc.showInfoToast("player '" + newPlayer.name + "' joined to table");
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

    $scope.addVoteComment = function(voteComment) {
      var username;

      var newVote = {
          tableId: $state.params.tableId,
          storyId: $scope.selectedUserstoryIndex,
          userName: $scope.currentUser,
          estimation: $scope.selectedValue,
          comment: voteComment
        };
      voteSvc.addVote(newVote);
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

      modalInstance.result.then(function(data) {
        console.log(data);
      });
    };

    function resetVotes() {
      angular.forEach($scope.cards, function(card) {
        card.isEnable = true;
        card.isSelected = false;
      });
      angular.forEach($scope.players, function(player) {
        player.voteValue = null;
      });
    }


    init();

  }]);


})();