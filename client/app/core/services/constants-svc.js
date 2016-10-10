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
          SCRUM: 'Scrum',
          FIBB: 'Fibonacci',
          TSHIRT: 'T-shirt',
          SEQUENTIAL: 'Sequential'
        },
        CARDS_VALUES: {
          SCRUM: [
            {
              value: '0',
              isSelected: false,
              isEnable: true
            },
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
              value: '5',
              isSelected: false,
              isEnable: true
            },
            {
              value: '8',
              isSelected: false,
              isEnable: true
            },
            {
              value: '13',
              isSelected: false,
              isEnable: true
            },
            {
              value: '20',
              isSelected: false,
              isEnable: true
            },
            {
              value: '40',
              isSelected: false,
              isEnable: true
            },
            {
              value: '100',
              isSelected: false,
              isEnable: true
            },
            {
              value: '?',
              isSelected: false,
              isEnable: true
            }
          ],
          FIBB: [
            {
              value: '0',
              isSelected: false,
              isEnable: true
            },
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
              value: '5',
              isSelected: false,
              isEnable: true
            },
            {
              value: '8',
              isSelected: false,
              isEnable: true
            },
            {
              value: '13',
              isSelected: false,
              isEnable: true
            },
            {
              value: '21',
              isSelected: false,
              isEnable: true
            },
            {
              value: '34',
              isSelected: false,
              isEnable: true
            },
            {
              value: '55',
              isSelected: false,
              isEnable: true
            },
            {
              value: '89',
              isSelected: false,
              isEnable: true
            },
            {
              value: '?',
              isSelected: false,
              isEnable: true
            }
          ],
          TSHIRT: [
            {
              value: 'XS',
              isSelected: false,
              isEnable: true
            },
            {
              value: 'S',
              isSelected: false,
              isEnable: true
            },
            {
              value: 'M',
              isSelected: false,
              isEnable: true
            },
            {
              value: 'L',
              isSelected: false,
              isEnable: true
            },
            {
              value: 'XL',
              isSelected: false,
              isEnable: true
            },
            {
              value: 'XXL',
              isSelected: false,
              isEnable: true
            },
            {
              value: '?',
              isSelected: false,
              isEnable: true
            }
          ],
          SEQUENTIAL: [
            {
              value: '0',
              isSelected: false,
              isEnable: true
            },
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
              value: '?',
              isSelected: false,
              isEnable: true
            }
          ]
        }
      }
    );
})();
