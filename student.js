var mongoose =require('mongoose')

mongoose.connect('mongodb://localhost/student',{ useNewUrlParser: true })

var Schema =mongoose.Schema

var studentschema =new Schema ({
    name:{
        type: String,
        required: true
    },
    gender:{
        type: Number,
        enum:[0,1],
        default:0
    },
    age:{
        type: Number
    },
    hobbies:{
        type: String
    }
})

module.exports=mongoose.model('Student',studentschema)
