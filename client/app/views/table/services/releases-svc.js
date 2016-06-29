(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.service('releasesSvc', ['$http', 'CONSTS', function($http, CONSTS) {

    var releasesUrl = '/rest/releases';
    var sprintsUrl = '/rest/sprints';
    var teamsUrl = '/rest/teams';

    this.getReleases = function() {
      return $http.get(releasesUrl);
    };

    this.getSprints = function(releaseId) {
      if (releaseId === "") {
        return $http.get(sprintsUrl);
      }
      else {
        return $http.get(sprintsUrl + '?release=' + releaseId);
      }
    };


    this.getTeams = function() {
        return $http.get(teamsUrl);
    };
  }]);
})();