(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.service('connectSvc', ['$http', function($http) {

    var url = '/rest/connect';

    var workSpaceUrl = '/rest/workSpaces';

    var usersUrl = '/rest/users';

    var workSpaceConnect = '/rest/workSpaces/connect';

    this.connectOctane = function(apiKey, apiSecret, serverURL) {
      var newConnection = {
        'key' : apiKey,
        'secret' : apiSecret,
        'url' : serverURL
      };
      return $http.post(url,newConnection);
    };

    this.getWorkspaces = function() {
      return $http.get(workSpaceUrl);
    };

    this.getUsers = function(workspaceID) {
      return $http.get(usersUrl + '/'+workspaceID);
    };




    this.connectToWorkspace = function(workSpaceId, userId) {
      return $http.get(workSpaceConnect + '/' + workSpaceId + '/' + userId);
    };



  }]);
})();