var request = require('request');
var cookie = require('cookie');

const OCTANE_SERVER = 'https://hackathon.almoctane.com';
const SHAREDSPACE_ID = 1001;
const WORKSPACE_ID = 1002;

var requestor = request.defaults({
	jar: true,
	baseUrl: OCTANE_SERVER,
	json: true,
	// if running from within HPE you will need to set a proxy.  Change according to nearest proxy
	proxy: 'http://web-proxy.il.hpecorp.net:8080'
});

var responseRequestor = {};

var releaseList = [];

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
			user: 'hackathon@user',
			password: 'Mission-impossible'
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
				res.send(releaseList);
			});
		} else {
			res.send(message);
		}
	});

}



exports.connect = connect;
exports.getReleases = getReleases;
