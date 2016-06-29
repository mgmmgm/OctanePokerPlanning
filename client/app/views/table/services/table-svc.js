(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.service('tableSvc', ['$http', 'CONSTS', function($http, CONSTS) {

    var url = '/rest/table';


    this.getTables = function() {
      if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
        url = '../../../../demoData/demoData.json';
      }
      return $http.get(url);
    };

    // add or update if already exist
    this.addTable = function(newTable) {
      return $http.post(url, newTable);

    };

  }]);
})();