(function() {
    'use strict';

    var mainModule = angular.module("MyApp", []);

    mainModule.controller('MyController', ['$scope', function ($scope) {
        
		$scope.test = 'aaaaaaaaaa';

    }]);



})();