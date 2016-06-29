var tableBl = require('./table_bl');

function voteUserStory(req,res) {
	var tableId = req.body.tableId;
	var storyId = req.body.storyId;
	var userName = req.body.userName;
	var estimation = req.body.estimation;
	var comment = req.body.comment;

	var tableData = tableBl.tablesMap[tableId];
	var storyVotes = tableData.storyVotes[storyId];
	if (storyVotes === undefined)
		storyVotes = [];
	var vote = {
		userName: userName,
		estimation: estimation,
		comment: comment
	}
	storyVotes.push(vote);
	tableData.storyVotes[storyId] = storyVotes;
	tableBl.tablesMap[tableId] = tableData;
	res.send(tableData);

};


exports.voteUserStory = voteUserStory;
