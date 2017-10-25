var express = require('express');
var router = express.Router();

const chatrooms = {
  //_id
  room_name:String,
  members:[{
    name:String,
    is_male:Boolean
  }],
  messages:[{
    content:String,
    date:Date
  }]
};

var messages = [
    {name:"チャットマスター",is_male:true,content:"チャットがリセットされました。"}
];

router.get('/', function(req, res, next) {
  res.render('index', {});

});

router.post('/rooms/enter', function(req, res, next) {
  var room_name = req.body.room_name;


  if(room_name=="riri-masa"){
    res.redirect('/rooms/riri-masa');
  }

  res.redirect('/');
});

/* GET home page. */
router.get('/rooms/riri-masa', function(req, res, next) {
  res.render('chatroom', {
    title: 'Express' ,
    messages:messages.slice().reverse(),
    name:"りり",
    is_male:false,
    post_url:'/rooms/riri-masa'
  });
});

router.post('/rooms/riri-masa/', function(req, res, next) {
  const name = req.body.name;
  const is_male = req.body.is_male == "true";
  const content = req.body.content;

  const message = {name, is_male, content};

  if(content != ""){
    messages.push(message);
  }

  if(is_male){
    return res.redirect("/rooms/riri-masa/masa");
  }
  
  res.redirect("/rooms/riri-masa/");
});

router.get('/rooms/riri-masa/masa', function(req, res, next) {
  res.render('chatroom', {
    title: 'Express' ,
    messages:messages.slice().reverse(),
    name:"まさ",
    is_male:true,
    post_url:'/rooms/riri-masa'
  });
});


module.exports = router;
