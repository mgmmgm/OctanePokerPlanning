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

    this.voteStory = function(gameId) {
      var myurl = url + 'vote';
      if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
        url = '../../../../demoData/demoData.json';
      }
      //$http.post('/rest/game/vote', {tableId: gameId, storyId: '123', userName: 'momo1', estimation: '34', comment: 'comment'});
      //return $http.post('/rest/game/vote', {tableId: gameId, storyId: '123', userName: 'momo', estimation: '31', comment: 'comment'});
    };


    this.updateStory = function(storyID, storyPoints, comments) {
      /*if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
       url = '../../../../demoData/demoData.json';
       }*/
      return $http.put('/rest/updateSP', {id: storyID, sp: storyPoints, comments: comments});
    }

  }]);
})();