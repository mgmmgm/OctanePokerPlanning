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

    this.voteWorkItem = function(gameId) {
      var myurl = url + 'vote';
      if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
        url = '../../../../demoData/demoData.json';
      }
      //$http.post('/rest/game/vote', {tableId: gameId, workItemId: '123', userName: 'momo1', estimation: '34', comment: 'comment'});
      //return $http.post('/rest/game/vote', {tableId: gameId, workItemId: '123', userName: 'momo', estimation: '31', comment: 'comment'});
    };

    this.skipWorkItem = function(data) {
      /*if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
       url = '../../../../demoData/demoData.json';
       }*/
      return $http.put('/rest/game/skip', {tableId: data.tableId, selectedWorkItemIndex: data.selectedWorkItemIndex});
    }

    this.updateWorkItem = function(data) {
      /*if (CONSTS.ENV_MODE === CONSTS.ENV_MODE_OPTIONS.DEV) {
       url = '../../../../demoData/demoData.json';
       }*/
      return $http.put('/rest/updateSP', {id: data.workItemId, sp: data.value, comment: data.comment, tableId: data.tableId, selectedWorkItemIndex: data.selectedWorkItemIndex});
    }

  }]);
})();