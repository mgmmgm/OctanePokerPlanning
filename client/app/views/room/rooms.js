(function() {
  'use strict';

  var roomModule = angular.module('opp.room', []);

  roomModule.controller('RoomCtrl', ['$scope', '$state', '$uibModal', 'roomSvc', function($scope, $state, $uibModal, roomSvc) {

    function init() {
      roomSvc.getRooms().then(
        function(result) {
          $scope.rooms = result.data.rooms;
        }
      );
    }

    $scope.OpenCreateRoomModal = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/views/room/modals/create-room-modal.html',
        controller: 'ModalCreateRoomCtrl'
      });

      modalInstance.result.then(function (data) {
        $state.go('game', {roomName: data.roomName, cardsValue: data.cardsValue, release: data.release});
      });
    };


    init();

  }]);


})();