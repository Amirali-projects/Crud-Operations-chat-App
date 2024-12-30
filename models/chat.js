const mongoose=require("mongoose");

let chatSchema= new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,

    },
    msg:{
        type:String,
        required:true,
        maxLength:50,

    },
    created_at:{
        type:Date,
    }

})
const chat=mongoose.model("chat",chatSchema);
module.exports=chat;