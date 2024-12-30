const express=require("express");
const app=express();
const mongoose=require("mongoose");
const chat=require("./models/chat.js");
const path=require("path");
const methodOverride = require('method-override');
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));  // used to use static files in ejs
app.use(express.urlencoded({ extended: true })); // Used to parse data coming from ejs.
app.use(methodOverride('_method'));
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
 
app.get("/",(req,res)=>{
   res.send("Root is working now");
})
// All chats
app.get("/chats",async(req,res)=>{ 
    let chats=await chat.find();
    res.render("index.ejs",{chats});
       
})
// New Chat
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
// Create Route
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;  // To parse this we have to use a middleware express.urlencoded
    let newchat=new chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
    })
    newchat.save()
    .then(()=>{
        console.log("chat was saved" );
    })
    .catch((err)=>{
        console.log(err);
    });
    console.log(newchat);
    res.redirect("/chats");
})

app.get("/chats/:id/edit",async(req,res)=>{
   let {id}=req.params;
    let Chat=await chat.findById(id); 
   res.render("edit.ejs",{Chat});

})
// Update route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg}=req.body;
    console.log(msg);
   let updatedchat=await chat.findByIdAndUpdate(id,{msg:msg},{runValidators:true,new:true});
    res.redirect("/chats");

})

app.delete("/chats/:id",async(req,res)=>{
  let{id}=req.params;
  let deletedchat=await chat.findByIdAndDelete(id);
  res.redirect("/chats");
}
)



app.listen(8080,(e)=>{
    console.log("App is listening on port 8080");
})
