(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.service('connectSvc', ['$http', function($http) {

    var url = '/rest/connect';

    this.connect = function() {
      return $http.get(url);
    };

  }]);
})();