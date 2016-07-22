var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(
  	'index.html', 
  	{ 
  		title: 'Express',
  		perms: ['manage_pages', 'read_insights', 'ads_read']
  	}
  );
});

module.exports = router;
