const functions = require("firebase-functions");

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors=require("cors");
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());


const db="mongodb+srv://admin:admin@cluster0.vtktc.mongodb.net/myCovidDatabase?retryWrites=true&w=majority";

mongoose.connect(db,
    {useNewUrlParser: true,
      useUnifiedTopology: true}).then(()=>{
  console.log("CONNECTED");
}).catch((err)=> console.log("NOT CONNECTED"));

const userschema= new mongoose.Schema({
  "Name": "",
  "Comments": "",
});

const User = mongoose.model("User", userschema);

app.post("/newComment", (req, res)=>{
  const Users=new User({
    Name: req.body.name,
    Comments: req.body.comments,
  });
  Users.save().then((data)=>{
    console.log("user reg");
    res.send(data);
  });
});

app.get("/getcomments", (req, res)=>{
  User.find().then((data)=>{
    res.send(data);
  });
});

const isLike= new mongoose.Schema({
  "isLike": "",
});
const Like= mongoose.model("liked", isLike);

app.post("/liked", (req, res)=>{
  const Likes =new Like({
    "isLike": req.body.react,
  });
  Likes.save().then((data)=>{
    console.log("user reg");
    res.send(data);
  });
});
app.get("/getlike", (req, res)=>{
  Like.find().then((data)=>{
    res.send(data);
  });
});

app.delete("/dellike/:id", (req, res)=>{
  Like.findByIdAndRemove(req.params.id).then((response)=>{
    Like.find().then((data)=>{
      res.send(data);
    });
  });
});


const isView= new mongoose.Schema({
  "isView": "",
});
const View= mongoose.model("Viewed", isView);

app.post("/viewed", (req, res)=>{
  const Views =new View({
    "isView": req.body.open,
  });
  Views.save().then((data)=>{
    console.log("user reg");
    res.send(data);
  });
});
app.get("/getview", (req, res)=>{
  View.find().then((data)=>{
    res.send(data);
  });
});

app.listen(4000, ()=>{
  console.log("LISTENING TO PORT 4000");
});

//npm run lint -- --fix   (it is used to fix error before firebase deploy use this command)

exports.app = functions.https.onRequest(app);
