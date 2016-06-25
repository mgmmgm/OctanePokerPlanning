(function() {
  'use strict';

  angular.module('opp.core')
    .constant(
      'CONSTS', {
        ENV_MODE: 'production',  // dev or production
        ENV_MODE_OPTIONS: {
          DEV: 'dev',
          PRODUCTION: 'production'
        }

      }
    );
})();
