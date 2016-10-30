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
          SCRUM: 'SCRUM',
          FIBB: 'FIBB',
          TSHIRT: 'TSHIRT',
          SEQUENTIAL: 'SEQUENTIAL'
        },
        CARDS_VALUES: {
          SCRUM: [
            {
              value: '0',
              imageName: 'heart',
              isSelected: false,
              isEnable: true
            },
            {
              value: '1',
              imageName: 'spade',
              isSelected: false,
              isEnable: true
            },
            {
              value: '2',
              imageName: 'diamond',
              isSelected: false,
              isEnable: true
            },
            {
              value: '3',
              imageName: 'club',
              isSelected: false,
              isEnable: true
            },
            {
              value: '5',
              imageName: 'heart',
              isSelected: false,
              isEnable: true
            },
            {
              value: '8',
              imageName: 'spade',
              isSelected: false,
              isEnable: true
            },
            {
              value: '13',
              imageName: 'diamond',
              isSelected: false,
              isEnable: true
            },
            {
              value: '20',
              imageName: 'club',
              isSelected: false,
              isEnable: true
            },
            {
              value: '40',
              imageName: 'heart',
              isSelected: false,
              isEnable: true
            },
            {
              value: '100',
              imageName: 'spade',
              isSelected: false,
              isEnable: true
            },
            {
              value: '?',
              imageName: 'diamond',
              isSelected: false,
              isEnable: true
            }
          ],
          FIBB: [
            {
              value: '0',
              imageName: 'heart',
              isSelected: false,
              isEnable: true
            },
            {
              value: '1',
              imageName: 'spade',
              isSelected: false,
              isEnable: true
            },
            {
              value: '2',
              imageName: 'diamond',
              isSelected: false,
              isEnable: true
            },
            {
              value: '3',
              imageName: 'club',
              isSelected: false,
              isEnable: true
            },
            {
              value: '5',
              imageName: 'heart',
              isSelected: false,
              isEnable: true
            },
            {
              value: '8',
              imageName: 'spade',
              isSelected: false,
              isEnable: true
            },
            {
              value: '13',
              imageName: 'diamond',
              isSelected: false,
              isEnable: true
            },
            {
              value: '21',
              imageName: 'club',
              isSelected: false,
              isEnable: true
            },
            {
              value: '34',
              imageName: 'heart',
              isSelected: false,
              isEnable: true
            },
            {
              value: '55',
              imageName: 'spade',
              isSelected: false,
              isEnable: true
            },
            {
              value: '89',
              imageName: 'diamond',
              isSelected: false,
              isEnable: true
            },
            {
              value: '?',
              imageName: 'club',
              isSelected: false,
              isEnable: true
            }
          ],
          TSHIRT: [
            {
              value: 'XS',
              imageName: 'heart',
              isSelected: false,
              isEnable: true
            },
            {
              value: 'S',
              imageName: 'spade',
              isSelected: false,
              isEnable: true
            },
            {
              value: 'M',
              imageName: 'diamond',
              isSelected: false,
              isEnable: true
            },
            {
              value: 'L',
              imageName: 'club',
              isSelected: false,
              isEnable: true
            },
            {
              value: 'XL',
              imageName: 'heart',
              isSelected: false,
              isEnable: true
            },
            {
              value: 'XXL',
              imageName: 'spade',
              isSelected: false,
              isEnable: true
            },
            {
              value: '?',
              imageName: 'diamond',
              isSelected: false,
              isEnable: true
            }
          ],
          SEQUENTIAL: [
            {
              value: '0',
              imageName: 'heart',
              isSelected: false,
              isEnable: true
            },
            {
              value: '1',
              imageName: 'spade',
              isSelected: false,
              isEnable: true
            },
            {
              value: '2',
              imageName: 'diamond',
              isSelected: false,
              isEnable: true
            },
            {
              value: '3',
              imageName: 'club',
              isSelected: false,
              isEnable: true
            },
            {
              value: '4',
              imageName: 'heart',
              isSelected: false,
              isEnable: true
            },
            {
              value: '5',
              imageName: 'spade',
              isSelected: false,
              isEnable: true
            },
            {
              value: '6',
              imageName: 'diamond',
              isSelected: false,
              isEnable: true
            },
            {
              value: '7',
              imageName: 'club',
              isSelected: false,
              isEnable: true
            },
            {
              value: '8',
              imageName: 'heart',
              isSelected: false,
              isEnable: true
            },
            {
              value: '8',
              imageName: 'spade',
              isSelected: false,
              isEnable: true
            },
            {
              value: '10',
              imageName: 'diamond',
              isSelected: false,
              isEnable: true
            },
            {
              value: '?',
              imageName: 'club',
              isSelected: false,
              isEnable: true
            }
          ]
        }
      }
    );
})();
