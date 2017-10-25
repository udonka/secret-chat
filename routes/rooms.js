const co = require('co');
const path = require('path');
const express = require('express');
const rooms_router = express.Router();

const mongoose = require('mongoose');
const ChatRoom = mongoose.model('ChatRoom');

rooms_router.get('/new', function(req, res, next) {
  res.render('rooms_new', {});
});

rooms_router.post('/', function(req, res, next) {
  co(function*(){
    const room_name = req.body.room_name;
    const newRoom = new ChatRoom({room_name});
    const savedRoom = yield newRoom.save();

    
    res.redirect(path.join(req.baseUrl,savedRoom._id.toString()));

  }).catch(e=>next(e));
});

rooms_router.post('/enter', function(req, res, next) {
  co(function*(){
    var room_name = req.body.room_name;

    const the_room = yield ChatRoom.findOne({room_name}).exec();
    if(the_room){
      return res.redirect(path.join(req.baseUrl,the_room._id.toString()));
    }

    res.redirect('/');

  }).catch(e=>next(e));
});

rooms_router.param('room_id', function(req, res, next, room_id){
  co(function*(){
    const room = yield ChatRoom.findOne({_id:room_id}).exec();

    
    if(room){
      req.room = room;
    }
    else{
      rel.room = undefined;
    }
    next();

  }).catch(e=>next(e));
});

/* GET home page. */
rooms_router.get('/:room_id', function(req, res, next) {
  if(!req.room) next();

  let is_male = false;
  if(req.query.sex == "male"){
    is_male = true;
  }
  
  res.render('chatroom', {
    title: 'Express' ,
    messages:req.room.messages.slice().reverse(),
    name:is_male ? "まさ": "りり",
    is_male:is_male,
    post_url:path.join(req.baseUrl,req.url)
  });
});

rooms_router.post('/:room_id', function(req, res, next) {
  co(function*(){
    if(!req.room) next();

    const name = req.body.name;
    const is_male = req.body.is_male == "true";
    const content = req.body.content;

    const message = {
      user_name:name,
      user_is_male:is_male,
      content
    };

    if(content != ""){
      req.room.messages.push(message);
    }
    const saved_room = yield req.room.save();

    if(is_male){
      return res.redirect(path.join(req.baseUrl,req.url));
    }
    
    res.redirect(path.join(req.baseUrl,req.url));
  }).catch(e=>next(e));
});


module.exports = rooms_router;
