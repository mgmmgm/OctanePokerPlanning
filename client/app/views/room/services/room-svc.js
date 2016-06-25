(function() {
  'use strict';

  var roomModule = angular.module('opp.room');

  roomModule.service('roomSvc', ['$http', 'CONSTS', function($http, CONSTS) {

    var url = '/rest/room';

    this.getRooms = function() {
      if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
        url = '../../../../demoData/demoData.json';
      }
      return $http.get(url);
    };

    // add or update if already exist
    this.addRoom = function(newRoom) {
      return $http.post(url, newRoom);
    };

  }]);
})();