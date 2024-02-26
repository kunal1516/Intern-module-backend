const mongoose=require('mongoose');

var teamSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
})
module.exports=mongoose.model('Team',teamSchema)