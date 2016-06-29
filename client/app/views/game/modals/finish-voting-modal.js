(function() {
  'use strict';

  var gameModule = angular.module('opp.game');

  gameModule.controller('ModalFinishVotingCtrl', ['$scope', '$uibModalInstance', 'finishVotingData', function($scope, $uibModalInstance, finishVotingData) {

    function init() {
      $scope.userstoryName = finishVotingData.userstoryName;
    }


    $scope.continue = function() {
      var data = {
        comment: 'this is a comment',
        value: 8
      };
      console.log(data);
      $uibModalInstance.close(data);
    };

    init();

  }]);


})();