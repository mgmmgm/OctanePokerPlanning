(function() {
  'use strict';

  var gameModule = angular.module('opp.game');

  gameModule.service('gameSvc', ['$http', 'CONSTS', function($http, CONSTS) {

    var url = '/rest/game/';

    this.getGameById = function(gameId) {
      url += gameId;
      if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
        url = '../../../../demoData/demoData.json';
      }
      return $http.get(url);
    };

    // add or update if already exist
    this.addGame = function(newGame) {
      return $http.post(url, newGame);
    };



    this.updateStory = function(storyID, storyPoints) {
      /*if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
       url = '../../../../demoData/demoData.json';
       }*/
      return $http.put('/rest/updateSP', {id: storyID, sp: storyPoints});
    }

  }]);
})();