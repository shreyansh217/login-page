const mongoose = require('mongoose');
//const userModel = require('./schemaadexport');
const url = 'mongodb+srv://shreyansh_2003:she123@cluster0.owi4a0w.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url)
console.log("hi")
var conn = mongoose.Collection;
var userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:{type:String,
        required:true,
    },
        email:{
            type:String,
            required:true,
            index:{
                unique:true,
            },
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        password:{
            type:String,
            required:true
        },
        data:{
            type:Date,
            default:Date.now}
        });    
    var userModel = mongoose.model('users',userSchema);
    module.exports = userModel;    