const express=require("express");
const app = express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const ejs = require('ejs');
const { Int32 } = require("bson");

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://akshpreet-admin:akshpreet@cluster0.vlv54vq.mongodb.net/FitnessDB",{useNewUrlParser:true},{useUnifiedTopology:true})

const blogSchema={
    title:String,
    By:String,
    Category:String,
    Content:String,
    Picture:String
    
} 
const blog = mongoose.model("blog",blogSchema)

const registerSchema={
    Name: String,
    Age: Number,
    Height: Number,
    Weight: Number,
    Gender: String,
    Address: String,
    Email: {
        type: String,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    WantUpdates: String,
    Username: String,
    Password: String,
}
const register =  mongoose.model("Users", registerSchema)

const newSchema={
    email:String,
}
const newsletter=mongoose.model("newsletter",newSchema)


app.set('view engine', 'ejs')

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
    
});


app.use(express.static(__dirname));

app.post("/blog", function(req,res){

    let newBlog = new blog({
        title: req.body.btitle , 
        By: req.body.aname,
        Category:req.body.topic,
        Content:req.body.tarea,
        Picture:req.body.coverp
    });
    newBlog.save();
    res.redirect('/')

})

app.post("/register",function(req,res){

    let newReg = new register({
        Name: req.body.regname,
        Age: req.body.regage,
        Height: req.body.reght,
        Weight: req.body.regwt,
        Gender: req.body.reggender,
        Address: req.body.regad,
        Email: req.body.regem,
        WantUpdates: req.body.regupdt,
        Username: req.body.regusername,
        Password: req.body.regpswd,
    })
    newReg.save();
    res.redirect('/loginuser.html')
})

app.post("/login", async(req,res)=>{

    try {
        const username = req.body.username;
        const password = req.body.password;
        const query = { Username: username, Password: password };
        const user = await register.find(query);
        if (user) {
            console.log('Login successful!');
            res.render('index2',{users:user});
            return true;
        } else {
            console.log('Invalid username or password.');
            return false;
        }
    } catch (err) {
        console.error(err);
    }
});

app.post("/news",function(req,res){

    let newsub = new newsletter({
        email:req.body.email_address
    })
    newsub.save();
    res.redirect('/')

});


app.listen(3000,function(){
    console.log("Server is running on 3000")
})