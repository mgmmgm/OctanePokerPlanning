var request = require('request');
var cookie = require('cookie');
var url  = require('url');

const OCTANE_SERVER = 'https://hackathon.almoctane.com';
const SHAREDSPACE_ID = 1001;
const WORKSPACE_ID = 2027;

var requestor = request.defaults({
	jar: true,
	baseUrl: OCTANE_SERVER,
	json: true,
	// if running from within HPE you will need to set a proxy.  Change according to nearest proxy
	proxy: 'http://web-proxy.il.hpecorp.net:8080'
});

var responseRequestor = {};

var releaseList = [];
var teamList = [];
var sprintList = [];

function connect(req, res) {
	login(requestor, function (requestor) {
		responseRequestor = requestor;
		res.send('ok');
	});
}

/**
 * Use to log in. Returns the HPSSO_COOKIE_CSRF header which needs to be reused with all communication to the server
 * @param requestor The request object used for HTTP
 * @param callback The callback that will be called once login is successful
 * @returns {*}
 */
function login(requestor, callback) {

	var HPSSO_COOKIE_CSRF = null;

	requestor.post({
		uri: '/authentication/sign_in',
		body: {
			client_id: 'Ido Raz_z2wmdyo6x4vqwbg5595n70lx8', // put API KEY here
			client_secret: '+414c89b9d5b2dbb6Y' // PUT API SECRET HERE
			//user: 'hackathon@user',
			//password: 'Mission-impossible'
			/**
			 * alternatively you can use API key like this
			 * client_id: '', // put API KEY here
			 * client_secret: '' // PUT API SECRET HERE
			 */
		}
	}, function (error, response) {
		if (error) {
			console.error(error);
			// do something with error...
			return;
		}
		var cookies = response.headers['set-cookie'];
		if (cookies) {
			cookies.forEach(function (value) {
				var parsedCookie = cookie.parse(value);
				if (parsedCookie.HPSSO_COOKIE_CSRF) {
					HPSSO_COOKIE_CSRF = parsedCookie.HPSSO_COOKIE_CSRF;
				}
			});
		} else {
			// problem getting cookies; something happened
		}

		requestor = requestor.defaults({
			baseUrl: (OCTANE_SERVER + '/api/shared_spaces/' + SHAREDSPACE_ID + '/workspaces/' + WORKSPACE_ID),
			headers: {
				'HPSSO_HEADER_CSRF': HPSSO_COOKIE_CSRF,
				'HPSSO-HEADER-CSRF': HPSSO_COOKIE_CSRF
			}
		});
		callback(requestor);
	});
}


function getReleases(req, res) {

	responseRequestor.get('/releases', function (error, message, releases) {
		console.log('ALL RELEASES');
		if (releases !== undefined && releases.data !== undefined) {
			releaseList = [];
			releases.data.forEach(function (release) {
				console.log('id: ' + release.id + ' name: ' + release.name);
				releaseList.push({'id': release.id, 'name': release.name});
			});
			res.send(releaseList);
			
		} else {
			res.send(message);
		}
	});

}

function getTeams(req, res) {

	responseRequestor.get('/teams', function (error, message, teams) {
		console.log('ALL TEAMS');
		if (teams !== undefined && teams.data !== undefined) {
			teamList = [];
			teams.data.forEach(function (team) {
				console.log('id: ' + team.id + ' name: ' + team.name);
				teamList.push({'id': team.id, 'name': team.name});
			});
			res.send(teamList);
		} else {
			res.send(message);
		}
	});

}


function getSprints(req, res) {

	responseRequestor.get('/sprints', function (error, message, sprints) {
		console.log('ALL TEAMS');
		if (sprints !== undefined && sprints.data !== undefined) {
			sprintList = [];
			sprints.data.forEach(function (sprint) {
				console.log('id: ' + sprint.id + ' name: ' + sprint.name);
				sprintList.push({'id': sprint.id, 'name': sprint.name});
			});
			res.send(sprintList);
		} else {
			res.send(message);
		}
	});

}

function getStories(req, res) {
	var queryString = '';
	var url_parts = url.parse(req.url, true);
	var params = url_parts.query;
	if (params !== undefined) {
		if (params['release'] !== undefined) {
			queryString = queryString + 'release={id='+params['release']+'}';
		}
		if (params['sprint'] !== undefined) {
			queryString = queryString + ';sprint={id=' + params['sprint']+'}';
		}
		if (params['team'] !== undefined) {
			queryString = queryString + ';team=(id='+params['team']+'}';
		}
	}
	if (queryString !== '') {
		queryString = queryString + ';';
	}
	queryString = queryString + 'subtype=\'story\'';

	console.log('query string is '+queryString);
	responseRequestor.get('/work_items?query="'+queryString+'"', function (error, message, stories) {
		if (stories !== undefined && stories.data !== undefined) {
			console.log('STORIES: '+stories.data.length);
			var storyList = [];
			stories.data.forEach(function (story) {
				//console.log(JSON.stringify(story));
				console.log('id: ' + story.id + ' name: ' + story.name + ' sp: '+ story.story_points);
				storyList.push({'id': story.id, 'name': story.name});

			});
			res.send(storyList);
		} else {
			res.send(message);
		}
	});
}


function updateStory(req, res) {

	var body = req.body;
	var id = body.id;
	var sp = body.sp;
	var comment = '';
	console.log ('updating id '+id+' sp '+ sp);
	var putStoryExample = {
				"name" : "changed",
				};

	putStoryExample['story_points'] = ''+sp+'';

	responseRequestor.put({uri: '/work_items/'+id, body: putStoryExample}, function (error, message, stories){
		console.log(stories);
		res.send(stories);
	});
}



exports.connect = connect;
exports.getReleases = getReleases;
exports.getSprints = getSprints;
exports.getTeams = getTeams;
exports.getStories = getStories;
exports.updateStory = updateStory;

