(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.controller('ModalJoinTableCtrl', ['$scope', '$uibModalInstance', 'connectSvc', function($scope, $uibModalInstance, connectSvc) {

    function init() {
      // connect().then(function() {
      //   initCardsValues();
      //   initReleases();
      //   initSprints();
      //   initTeams();
      // });

    }


    function connect() {
      return connectSvc.connect();
    }



    $scope.join = function() {
      if(!$scope.displayName)
        return;
      var data = {
        displayName: $scope.displayName
      };
      console.log(data);
      $uibModalInstance.close(data);
    };

    init();

  }]);


})();