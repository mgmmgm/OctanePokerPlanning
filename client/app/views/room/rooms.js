(function() {
  'use strict';

  var roomModule = angular.module('opp.room', []);

  roomModule.controller('RoomCtrl', ['$scope', 'roomSvc', function($scope, roomSvc) {

    roomSvc.getRooms().then(
      function(result) {
        $scope.rooms = result.data.rooms;
      }
    );

  }]);


})();