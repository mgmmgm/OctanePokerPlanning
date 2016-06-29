(function() {
  'use strict';

  var gameModule = angular.module('opp.game', ['opp.core']);

  gameModule.controller('GameCtrl', ['$scope', '$state', '$uibModal', '$interval', 'gameSvc', 'tableSvc', 'toastSvc', 'socketSvc', 'loggedinSvc', 'voteSvc', 'CONSTS', function($scope, $state, $uibModal, $interval, gameSvc, tableSvc, toastSvc, socketSvc, loggedinSvc, voteSvc, CONSTS) {


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
          $scope.currentUser = data.username;
        });
      }

      tableSvc.getTableById($state.params.tableId).then(
        function(result) {
          if(result.data=="")
          {
            $state.go('tables');
          }
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
          $scope.selectedUserstoryIndex = 0;
          $scope.selectedUserstory = $scope.userstories[$scope.selectedUserstoryIndex];
          $scope.players = result.data.players;
          $scope.linkToGame = result.data.linkToGame;
          $scope.tableId = $state.params.tableId;
          $scope.isFinishedVoting = false;
          if ($scope.isOwner) {
            angular.forEach($scope.players, function(player) {
                player.needToShow = true;
            })
          } else {
            angular.forEach($scope.players, function(player) {
              if (player.name === $scope.currentUser) {
                player.needToShow = true;
              }
            })
          }
        }
      )
      gameSvc.voteStory($state.params.tableId);
    }

    function subscribeToEvents() {
      socketSvc.on('player:joined', function (data) {
        refreshPlayers(data.newPlayer)
      });
      socketSvc.on('player:voted', function (data) {
        console.log(data.vote);
        angular.forEach($scope.players, function(player) {
          if (player.name === data.vote.userName) {
            player.voteValue = data.vote.estimation;
            player.comment = data.vote.comment;
            toastSvc.showInfoToast("player '" + player.name + "' voted");
          }
        });
        if ($scope.isOwner) {
          checkIfRoundEnded();
        }
      });
      socketSvc.on('vote:everyoneFinishVoted', function (data) {
        toastSvc.showInfoToast("Every players are voted!");
        angular.forEach($scope.players, function(player) {
          player.everyoneFinishVote = true;
        });
      });
      socketSvc.on('userstory:goToNextUserstory', function (data) {
        $scope.skipUserstory();
      });
    }

    function checkIfRoundEnded() {
      if (isEveryoneVoted()) {
        socketSvc.emit('vote:finishVoting', {});
        $scope.isFinishedVoting = true;
      }
    }
    function isEveryoneVoted() {
      return _.all($scope.players, function(player) {
        return player.voteValue;
      })
    }
    function refreshPlayers(newPlayerName) {
      var newPlayer = {
        name: newPlayerName,
        voteValue: null,
        comment: '',
        isOwner: false,
        everyoneFinishVote: false
      };
      $scope.players.push(newPlayer);
      toastSvc.showInfoToast("player '" + newPlayer.name + "' has joined to table");
    }

    function disableOtherCards(selectedCard) {
      angular.forEach($scope.cards, function(card) {
        if (card.value !== selectedCard.value) {
          card.isSelected = false;
          card.isEnable = false;
        }
      })
    };

    $scope.addVote = function(voteData) {

      var newVote = {
          tableId: $state.params.tableId,
          storyId: $scope.selectedUserstoryIndex,
          userName: $scope.currentUser,
          estimation: voteData.selectedCard.value,
          comment: voteData.voteComment

        };
      voteSvc.addVote(newVote).then(
        function(result) {
          disableOtherCards(voteData.selectedCard);
          var currentPlayer =_.find($scope.players, function(player) {
            return player.name === newVote.userName;
          });
          if (currentPlayer) {
            currentPlayer.voteValue = newVote.estimation;
            currentPlayer.comment = newVote.comment;
            socketSvc.emit('player:playerVote', {
              vote: newVote
            });
            if ($scope.isOwner) {
              checkIfRoundEnded();
            }
          }
        })

    };

    $scope.skipUserstory = function() {
      $scope.selectedUserstoryIndex++;
      $scope.selectedUserstory = $scope.userstories[$scope.selectedUserstoryIndex];
      resetVotes();
    };

    $scope.finishVoting = function() {
      console.log($scope.players);
      tableSvc.getTableById($state.params.tableId).then(
        function(result) {

          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/views/game/modals/finish-voting-modal.html',
            controller: 'ModalFinishVotingCtrl',
            resolve: {
              finishVotingData: function() {
                return { 
                  votes: result.data.storyVotes[$scope.selectedUserstoryIndex], 
                  storyId: $scope.selectedUserstory.id 
                };
              }
              
            }
          });

          modalInstance.result.then(function(data) {
            console.log(data);
            socketSvc.emit('userstory:goToNext', {});
            $scope.skipUserstory();
          });
        }
      )



    };

    function resetVotes() {
      $scope.isFinishedVoting = false;
      angular.forEach($scope.cards, function(card) {
        card.isEnable = true;
        card.isSelected = false;
      });
      angular.forEach($scope.players, function(player) {
        player.voteValue = null;
        player.comment = '';
        player.everyoneFinishVote = false;
      });
    }


    init();

  }]);


})();