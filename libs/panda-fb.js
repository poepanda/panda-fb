var promise = require("bluebird"),
		request = require('request-promise'),
		tokens = {};

var conf = require('../config');

var getForeverToken = function(shortToken){
	var longTerm = queryLongTermToken(shortToken),
			forever = longTerm.then(function(data){
								tokens.longTerm = data.access_token
								return data.access_token;
							})
							.then(queryUserId)
							.then(function(data){
								return data.id
							})
							.then(queryForeverTokens)
							.then(function(data){
								tokens.pageTokens = data.data;
								return tokens;
							});

	return forever;
}

var queryForeverTokens = function(id){
	return request({
		uri: 'https://graph.facebook.com/' + id + '/accounts',
		qs: {
			access_token: tokens.longTerm,
			limit: conf.limit
		},
		json: true
	});
};

var queryUserId = function(longTermToken){
	return request({
		uri: 'https://graph.facebook.com/v' + conf.graphVer + '/me',
		qs: {
			access_token: longTermToken
		},
		json: true
	});
};

var queryLongTermToken = function(token) {
	return request({
		uri: 'https://graph.facebook.com/v' + conf.graphVer + '/oauth/access_token',
		qs: {
			grant_type: 'fb_exchange_token', 
			client_id: conf.appId,
			client_secret: conf.appSecret, 
			fb_exchange_token: token
		},
		json: true
	});
};

var getLongTermToken = function(){

};

module.exports = {
	foreverToken: getForeverToken,
	longTermToken: getLongTermToken
};