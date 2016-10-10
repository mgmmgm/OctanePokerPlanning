(function() {
  'use strict';

  var gameModule = angular.module('opp.game', ['opp.core']);

  gameModule.controller('GameCtrl', ['$scope', '$state', '$uibModal', '$interval', 'gameSvc', 'tableSvc', 'toastSvc', 'socketSvc', 'loggedinSvc', 'voteSvc', 'CONSTS', function($scope, $state, $uibModal, $interval, gameSvc, tableSvc, toastSvc, socketSvc, loggedinSvc, voteSvc, CONSTS) {

    // this array save all the final result
    var votes = [
      {
        workitem: {
          id: '1',
          name: 'some work item'
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
          tableSvc.joinTable({id: $state.params.tableId, displayName: data.username}).then(function() {
            loadTableDetails();
            socketSvc.emit("player:newPlayerAdded", {
              playerName: data.username
            });
          });
        });
      } else {
        loadTableDetails();
      }
    }

    function loadTableDetails() {
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
          switch (result.data.cardsType){
            case CONSTS.CARDS_TYPES.SCRUM:
              $scope.cards = CONSTS.CARDS_VALUES.SCRUM;
              break;
            case CONSTS.CARDS_TYPES.FIBB:
              $scope.cards = CONSTS.CARDS_VALUES.FIBB;
              break;
            case CONSTS.CARDS_TYPES.TSHIRT:
              $scope.cards = CONSTS.CARDS_VALUES.TSHIRT;
              break;
            case CONSTS.CARDS_TYPES.SEQUENTIAL:
              $scope.cards = CONSTS.CARDS_VALUES.SEQUENTIAL;
              break;
            default:
              $scope.cards = CONSTS.CARDS_VALUES.SCRUM;
          }
          $scope.itemsType = result.data.itemsType;
          $scope.releaseName = result.data.release.name;
          $scope.releaseId = result.data.release.id;
          $scope.sprintName = result.data.sprint.name;
          $scope.teamName = result.data.team.name;
          $scope.workitems = result.data.workItems;
          $scope.selectedWorkItemIndex = result.data.selectedWorkItemIndex;
          $scope.selectedWorkItem = $scope.workitems[$scope.selectedWorkItemIndex];
          $scope.players = result.data.players;
          $scope.workItemVotes = result.data.workItemVotes;
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
          setPreviousVotes();
          if ($scope.isOwner) {
            checkIfRoundEnded();
          }
        }
      );
      //gameSvc.voteWorkItem($state.params.tableId);
    }

    function setPreviousVotes() {
      if (!_.isEmpty($scope.workItemVotes)) {
        angular.forEach($scope.workItemVotes[$scope.selectedWorkItemIndex], function(workItemVote) {
          var player = _.find($scope.players, function(player) {
            return player.name === workItemVote.userName;
          });
          if (player) {
            player.voteValue = workItemVote.estimation;
            player.comment = workItemVote.comment;
            if (player.name === $scope.currentUser) {
              disableOtherCards({value: player.voteValue})
            }
          }
        })
      }
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
        toastSvc.showInfoToast("All players are voted!");
        angular.forEach($scope.players, function(player) {
          player.everyoneFinishVote = true;
        });
      });
      socketSvc.on('workitem:goToNextWorkitem', function (data) {
        $scope.skipWorkItem();
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
        } else {
          card.isSelected = true;
          card.isEnable = false;
        }
      })
    };

    $scope.addVote = function(voteData) {

      var newVote = {
          tableId: $state.params.tableId,
          index: $scope.selectedWorkItemIndex,
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

    $scope.skipWorkItem = function() {
      gameSvc.skipWorkItem({tableId: $scope.tableId, selectedWorkItemIndex: $scope.selectedWorkItemIndex});
      $scope.selectedWorkItemIndex = ($scope.selectedWorkItemIndex + 1) % $scope.workitems.length;
      $scope.selectedWorkItem = $scope.workitems[$scope.selectedWorkItemIndex];
      resetVotes();
      tableSvc.getTableById($state.params.tableId).then( function(result) {
          $scope.workItemVotes = result.data.workItemVotes;
        	setPreviousVotes();
      });
    };

    $scope.backToMain = function() {
      $state.go('tables');
    }

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
                  tableId: $scope.tableId,
                  workItemType: $scope.itemsType,
                  selectedWorkItemIndex: $scope.selectedWorkItemIndex,
                  votes: result.data.workItemVotes[$scope.selectedWorkItemIndex],
                  workItemId: $scope.selectedWorkItem.id
                };
              }
              
            }
          });

          modalInstance.result.then(function(data) {
            console.log(data);
            toastSvc.showSuccessToast($scope.itemsType +' updated successfully');
            socketSvc.emit('workitem:goToNext', {});
            $scope.skipWorkItem();
          }, function(error) {
            toastSvc.showErrorToast('Failed to update the ' + $scope.itemsType);
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

    $scope.showSummary = function() {
      tableSvc.getTableById($state.params.tableId).then(
        function(result) {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/views/game/modals/summary-modal.html',
            controller: 'ModalSummaryCtrl',
            size: 'lg',
            resolve: {
              summaryData: function() {
                return {
                  selectedWorkItemIndex: $scope.selectedWorkItemIndex,
                  votes: result.data.workItemVotes,
                  workItems: $scope.workitems,
                  tableName: $scope.gameName
                };
              }
            }
          });
        }
      );


    };


    init();

  }]);


})();