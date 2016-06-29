(function() {
  'use strict';

  var coreModule = angular.module('opp.core');

  coreModule.service('toastSvc', [function() {

    // toast configuration
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.options.timeOut = 3000;
    toastr.extendedTimeOut = 2000;

    this.showSuccessToast = function(str) {
      toastr.success(str);
    };

    this.showInfoToast = function(str) {
      toastr.info(str);
    };

    this.showWarningToast = function(str) {
      toastr.warning(str);
    };

    this.showErrorToast = function(str) {
      toastr.error(str);
    };


  }]);
})();