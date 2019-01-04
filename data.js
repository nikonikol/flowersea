var mongoose =require('mongoose')

mongoose.connect('mongodb://localhost/student',{ useNewUrlParser: true })

var Schema =mongoose.Schema

var userdata =new Schema ({
    dataname:{
        type: String,
        required: true
    },
    data:{
        type: String,
        required: true
    },
    datatime:{
        type: Date,
       
    }
})

module.exports=mongoose.model('Userdata',userdata )


