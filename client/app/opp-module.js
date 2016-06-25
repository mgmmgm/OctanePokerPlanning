(function () {
  'use strict';

  var mainModule = angular.module("opp-module", ['ui.router', 'opp.core', 'opp.room', 'opp.game']);

  mainModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('rooms', {
        url: '/rooms',
        templateUrl: 'app/views/room/rooms.html',
        controller: 'RoomCtrl'
      })
      .state('game', {
        url: '/game',
        templateUrl: 'app/views/game/game.html',
        controller: 'GameCtrl'
      });

    $urlRouterProvider.otherwise('/rooms');

  }]);

  mainModule.controller('OppController', ['$scope', 'CONSTS', function ($scope, CONSTS) {

    CONSTS.ENV_MODE = CONSTS.ENV_MODE_OPTIONS.DEV; // remove or change it in production

    $scope.test = 'main';

  }]);


})();