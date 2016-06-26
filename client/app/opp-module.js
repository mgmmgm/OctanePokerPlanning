(function () {
  'use strict';

  var mainModule = angular.module("opp-module", ['ui.router', 'ui.bootstrap', 'opp.core', 'opp.table', 'opp.game']);

  mainModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tables', {
        url: '/tables',
        templateUrl: 'app/views/table/tables.html',
        controller: 'TableCtrl'
      })
      .state('game', {
        url: '/game',
        params: {
          tableName: null,
          cardsValue: null,
          release: null
        },
        templateUrl: 'app/views/game/game.html',
        controller: 'GameCtrl'
      });

    $urlRouterProvider.otherwise('/tables');

  }]);

  mainModule.controller('OppController', ['$scope', 'CONSTS', function ($scope, CONSTS) {

    CONSTS.ENV_MODE = CONSTS.ENV_MODE_OPTIONS.DEV; // remove or change it in production

    $scope.test = 'main';

  }]);


})();