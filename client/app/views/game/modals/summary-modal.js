(function() {
	'use strict';

	var gameModule = angular.module('opp.game');

	gameModule.controller('ModalSummaryCtrl', ['$scope', '$uibModalInstance', 'summaryData', function($scope, $uibModalInstance, summaryData) {

		var tableName;

		function init() {
			$scope.selectedWorkItemIndex = summaryData.selectedWorkItemIndex;
			tableName = summaryData.tableName;
			buildSummaryObj(summaryData.votes.summary, summaryData.workItems);
		}

		function buildSummaryObj(summaryVotes, workItems) {
			$scope.summaryObj = [];
			angular.forEach(workItems, function(item, index) {
				var rowSummaryObj = {};
				rowSummaryObj.index = index + 1;
				rowSummaryObj.id = item.id;
				rowSummaryObj.name = item.name;
				if (summaryVotes[item.id]) {
					rowSummaryObj.sp = summaryVotes[item.id].sp;
					rowSummaryObj.comment = summaryVotes[item.id].comment;
					rowSummaryObj.finish = true;
				}
				$scope.summaryObj.push(rowSummaryObj);
			})
		}

		$scope.back = function() {
			$uibModalInstance.close();
		};

		$scope.exportToPDF = function() {
			var doc = new jsPDF();

			var summaryTableContentElement = angular.element('#summaryTableContent');

			doc.text('Summary', 10, 20);
			doc.fromHTML(summaryTableContentElement[0], 10, 25, {}, function() {});
			doc.save('summary-' + tableName + '.pdf');
		};

		init();

	}])
})();