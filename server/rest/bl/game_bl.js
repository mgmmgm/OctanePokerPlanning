var tableBl = require('./table_bl');
var api = require('./nga_api_bl');

function voteWorkItem(req,res) {
	var tableId = req.body.tableId;
	var index = req.body.index;
	var userName = req.body.userName;
	var estimation = req.body.estimation;
	var comment = req.body.comment;

	var tableData = tableBl.tablesMap[tableId];
	var workItemVotes = tableData.workItemVotes[index];
	if (workItemVotes === undefined)
		workItemVotes = [];
	var vote = {
		userName: userName,
		estimation: estimation,
		comment: comment
	};
	workItemVotes.push(vote);
	tableData.workItemVotes[index] = workItemVotes;
	tableBl.tablesMap[tableId] = tableData;
	res.send(tableData);

}

function skipWorkItem(req, res) {
	var tableId = req.body.tableId;
	var tableData = tableBl.tablesMap[tableId];
	tableData.selectedWorkItemIndex = req.body.selectedWorkItemIndex + 1;
	tableBl.tablesMap[tableId] = tableData;
	res.send(tableData);
}

function updateWorkItem(req, res) {
	var tableData = tableBl.tablesMap[req.body.tableId];
	//tableData.selectedWorkItemIndex = req.body.selectedWorkItemIndex + 1;

	var index = req.body.selectedWorkItemIndex;

	tableData.workItemVotes.summary[req.body.id] = {
		workItemId: req.body.id,
		index: index,
		sp: req.body.sp,
		comment: req.body.comment
	};

	return api.updateWorkItem(req, res);
}


exports.voteWorkItem = voteWorkItem;
exports.updateWorkItem = updateWorkItem;
exports.skipWorkItem = skipWorkItem;
