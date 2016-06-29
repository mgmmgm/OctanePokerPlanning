(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.service('loggedinSvc', ['$http', function($http) {

    var loggedinuser = '';

    this.setUser = function(user) {
      //loggedinuser = user;
      localStorage.setItem("logggedIn",user);
    };

    this.getUser = function() {
      return localStorage.getItem("logggedIn");
     // return loggedinuser;
    };

  }]);
})();