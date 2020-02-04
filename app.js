//jshint esversion :6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy food","cook food","eat food"];
var workListItem = [];

app.use(bodyParser.urlencoded({extends:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');


app.get("/", function(req, res) {

  var options = { weekday: 'long',  day: 'numeric' , month: 'long'};
  var today = new Date();
  var day = today.toLocaleDateString("en-US", options);


  res.render("list", {
    ListTitle: day , newListItem : items
  });
});

app.post("/",function(req, res){
  var item = req.body.newItem;

  if(req.body.list === "Work"){
    workListItem.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }


});

app.get("/work",function(req,res){
  res.render("list",{ListTitle:"Work List",newListItem : workListItem});
});



app.listen(3000, function() {
  console.log("server start on port 3000");
});
