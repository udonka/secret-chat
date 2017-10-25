var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatRoomSchema = new Schema({
  //_id
  room_name:String,
  /* ややこしいのであとで
  members:[{
    name:String,
    is_male:Boolean
  }],
  */
  messages:[{
    user_name:String,
    user_is_male:Boolean,
    content:String,
    date:Date
  }]
});


module.exports= ChatRoomSchema;
