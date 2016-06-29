(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.controller('ModalVoteCommentCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {

    $scope.vote = function() {
      if(!$scope.voteComment)
        return;
      var data = {
        voteComment: $scope.voteComment
      };
      console.log(data);
      $uibModalInstance.close(data);
    };

  }]);

})();