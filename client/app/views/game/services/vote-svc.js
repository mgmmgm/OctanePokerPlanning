(function() {
  'use strict';

  var gameModule = angular.module('opp.game');

  gameModule.service('voteSvc', ['$http', function($http) {

    var url = '/rest/game/vote/';

    this.addVote = function(newVote) {
      return $http.post(url, newVote);
    };

  }]);
})();