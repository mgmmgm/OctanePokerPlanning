(function() {
  'use strict';

  angular.module('opp.core')
    .constant(
      'CONSTS', {
        ENV_MODE: 'production',  // dev or production
        ENV_MODE_OPTIONS: {
          DEV: 'dev',
          PRODUCTION: 'production'
        },
        CARDS_TYPES: {
          SEQUENTIAL: [
            {
              value: '1',
              isSelected: false,
              isEnable: true
            },
            {
              value: '2',
              isSelected: false,
              isEnable: true
            },
            {
              value: '3',
              isSelected: false,
              isEnable: true
            },
            {
              value: '4',
              isSelected: false,
              isEnable: true
            },
            {
              value: '5',
              isSelected: false,
              isEnable: true
            },
            {
              value: '6',
              isSelected: false,
              isEnable: true
            },
            {
              value: '7',
              isSelected: false,
              isEnable: true
            },
            {
              value: '8',
              isSelected: false,
              isEnable: true
            },
            {
              value: '9',
              isSelected: false,
              isEnable: true
            },
            {
              value: '10',
              isSelected: false,
              isEnable: true
            },
            {
              value: '11',
              isSelected: false,
              isEnable: true
            },
            {
              value: '12',
              isSelected: false,
              isEnable: true
            },
            {
              value: '13',
              isSelected: false,
              isEnable: true
            },
            {
              value: '14',
              isSelected: false,
              isEnable: true
            },
            {
              value: '15',
              isSelected: false,
              isEnable: true
            },
            {
              value: '?',
              isSelected: false,
              isEnable: true
            }
          ]

        }

      }
    );
})();
