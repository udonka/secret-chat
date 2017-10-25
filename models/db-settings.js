var mongoose = require('mongoose');
var url = 'mongodb://localhost/sec-cha';

var db_obj = module.exports = {};

mongoose.Promise = global.Promise;
mongoose.connect(url);


// 接続イベントを利用してログ出力
mongoose.connection.on('connected', function () {
  console.log('mongoose URI locates ' + url);
});

//connected と openの違いがよくわからん。
mongoose.connection.once('open', function() {
  // we're connected!
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));


var ChatRoomSchema = require("./ChatRoom.js");
//var Schema = require("./_answer.js");


mongoose.model("ChatRoom",ChatRoomSchema);
//mongoose.model("",Schema);


db_obj.db_loaded_promise = Promise.resolve("loaded DB");

