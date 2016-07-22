var express = require('express');
var router = express.Router();

var pandaFb = require('../libs/panda-fb');

/* GET home page. */
router.post('/', function(req, res, next) {
	pandaFb
	.foreverToken(req.body.token)
	.then(function(result){
		console.log('RESULT', result);
		res.json(result);
	}).catch(function(err){
		console.log('ERR', err);
	})
});

module.exports = router;
