const mongoose=require("mongoose");
const chat=require("./models/chat.js");
main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
})
 async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Apnachat');
 }

 let allchat=[
    {
    to:"Amir Ali",
    from:"Hassan",
    msg:"Assalam Alaikum",
    created_at:Date.now(),

},
{
    to:"luqman",
    from:"hussnain",
    msg:"walikum salam",
    created_at:Date.now(),
},
{
    to:"sadaqat",
    from:"hussnain",
    msg:"hello how are you",
    created_at:Date.now(),
}

]
chat.insertMany(allchat);