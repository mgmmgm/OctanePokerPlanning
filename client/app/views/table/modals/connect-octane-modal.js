(function() {
  'use strict';

  var tableModule = angular.module('opp.table');

  tableModule.controller('ModalOctaneConnectCtrl', ['$scope', '$uibModalInstance', 'connectSvc', 'CONSTS', function($scope, $uibModalInstance, connectSvc, CONSTS) {

    function init() {
      $scope.showGenerate = CONSTS.ENV_MODE !== CONSTS.ENV_MODE_OPTIONS.PRODUCTION;

         }


   $scope.sendAPI = function() {
     connectSvc.connectOctane($scope.apiKey, $scope.apiSecret, $scope.serverURL).then(function(){
       connectSvc.getWorkspaces().then(function(result) {
         $scope.workSpaces = result.data;
         $scope.selectedWorkSpace = result.data[0];
         selectUsers($scope.selectedWorkSpace.id);
       });
      });

    };

    $scope.generate = function() {
      $scope.serverURL = 'https://hackathon.almoctane.com';
      $scope.apiKey = 'Ido Raz_z2wmdyo6x4vqwbg5595n70lx8';
      $scope.apiSecret = '+414c89b9d5b2dbb6Y';
    }

    $scope.connect = function() {
      connectSvc.connectToWorkspace($scope.selectedWorkSpace.id, $scope.selectedUser.id).then(function(result){
        
        $uibModalInstance.close($scope.selectedUser.name);
      });

    }

    function selectUsers(workSpaceId) {
      connectSvc.getUsers($scope.selectedWorkSpace.id).then(function(result) {
        $scope.users = result.data;
        if ($scope.users.length > 0) {
          $scope.selectedUser = $scope.users[0];
        }

      });
    }

    $scope.setWorkSpace = function(data) {
      $scope.selectedWorkSpace = data;
      selectUsers( $scope.selectedWorkSpace.id);

    };

    $scope.setUserName = function(data) {
      $scope.selectedUser = data;

    };



    init();

  }]);


})();