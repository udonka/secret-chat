var express = require('express');
var router = express.Router();


var messages = [
  "",
  ""
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,messages});
});

router.post('/', function(req, res, next) {
  const message = req.body.message_content;

  messages.push(message);
  
  res.redirect("/");
});

module.exports = router;
