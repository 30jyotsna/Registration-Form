var express = require("express");
var bodyparser=require('body-parser')
var mongoose=require('mongoose');
const app = express();

app.use(bodyparser.json());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://localhost:27017/Form')
var db=mongoose.connection
db.on('error',()=> console.log("Error in connecting to database"))
db.once('open',()=> console.log("Connected to database"))

app.post("/sign_up", (req, res)=>{
    var name=req.body.name;
    var age=req.body.age;
    var email=req.body.email;
    var phone=req.body.phone;
    var gender=req.body.gender;
    var password=req.body.password;

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phone":phone,
        "gender":gender,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("record inserted successfully")
    })
    return res.redirect('signup_success.html')
})


app.get("/",(req,res) => {
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);
console.log("Listening on port")
