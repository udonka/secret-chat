var co = require('co');
var path = require('path');
var express = require('express');
var router = express.Router();



var messages = [
    {name:"チャットマスター",is_male:true,content:"チャットがリセットされました。"}
];

router.get('/', function(req, res, next) {
  res.render('index', {});
});




module.exports = router;
