(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.service('loggedinSvc', ['$http', function($http) {

    var preffix = "OctanePokerPlanning:";

    this.setUser = function(user) {
      localStorage.setItem(preffix + "logggedIn",user);
    };

    this.getUser = function() {
      return localStorage.getItem(preffix + "logggedIn");
    };

  }]);
})();