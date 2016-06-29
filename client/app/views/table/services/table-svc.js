(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.service('tableSvc', ['$http', 'CONSTS', function($http, CONSTS) {

    var baseUrl = '/rest/table';
    var url;


    this.getTables = function() {
      if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
        url = '../../../../demoData/demoData.json';
      }
      return $http.get(baseUrl);
    };

    this.getTableById = function(id) {
      if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
        url = '../../../../demoData/demoData.json';
      }
      url = baseUrl + '/' + id;
      return $http.get(url);
    };

    // add or update if already exist
    this.addTable = function(newTable) {
      return $http.post(baseUrl, newTable);

    };

    this.joinTable = function(joinData) {
      url = baseUrl + '/join';
      return $http.put(url, joinData);

    };

  }]);
})();