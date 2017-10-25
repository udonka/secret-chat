var express = require('express');
var router = express.Router();


var messages = [
    {name:"チャットマスター",is_male:true,content:"チャットがリセットされました。"}
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express' ,
    messages:messages.slice().reverse(),
    name:"りり",
    is_male:false
  });
});

router.post('/', function(req, res, next) {
  
  const name = req.body.name;
  const is_male = req.body.is_male == "true";
  const content = req.body.content;

  const message = {name, is_male, content};

  if(content != ""){
    messages.push(message);
  }

  if(is_male){
    return res.redirect("/masa");
  }
  
  res.redirect("/");
});

router.get('/masa', function(req, res, next) {
  res.render('index', {
    title: 'Express' ,
    messages:messages.slice().reverse(),
    name:"まさ",
    is_male:true
  });
});


module.exports = router;
