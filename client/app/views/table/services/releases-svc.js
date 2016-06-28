(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.service('releasesSvc', ['$http', 'CONSTS', function($http, CONSTS) {

    var url = '/rest';
    var releasesUrl = '/releases';
    var sprintsUrl = '/sprints';
    var teamsUrl = '/teams';

    this.getReleases = function() {
      /*if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
        url = '../../../../demoData/demoData.json';
      }*/
      return $http.get(url + releasesUrl);
    };

    this.getSprints = function() {
      /*if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
       url = '../../../../demoData/demoData.json';
       }*/
      return $http.get(url + sprintsUrl);
    };

    this.getTeams = function() {
      /*if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
       url = '../../../../demoData/demoData.json';
       }*/
      return $http.get(url + teamsUrl);
    };
  }]);
})();