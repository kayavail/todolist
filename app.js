const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
// const ejs = require('ejs')
const app = express();
app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


const todosArr = ["Buy ingredients", "make food", "eat breakfast"];
const workList = [];
const homeList = [];


app.get("/", function(req, res) {
let greet = date.greet()
const currentDay = date.getDate()
  res.sendFile(__dirname + "/index.html")
  //  {
  // // option 1
  // var weekDay = new Date().getDay();

  // var day;

  // switch (weekDay) {
  //   case 0:
  //      day = "Sunday"
  //     break;
  //   case 1:
  //      day = "Monday"
  //     break;
  //   case 2:
  //      day = "Tuesday"
  //     break;
  //   case 3:
  //      day = "Wednesday"
  //     break;
  //   case 4:
  //      day = "Thursday"
  //     break;
  //   case 5:
  //     day = "Friday"
  //     break;
  //   case 6:
  //     day = "Saturday"
  //     break;
  //   default:
  //     day = "Just another day"
  //     break;
  // }

  // res.render("list", {kindOfDay: day})


  // //option 2
  // // let today = new Date();
  // let option = {
  //       month : "long",
  //       day: "numeric",
  //       week: "long"
  // }
  // let currentDay = new Date().toLocaleDateString("en-US", option)
  // let dayOftheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //
  //
  //
  // res.render('list', {
  //   kindOfDay: dayOftheWeek[currentDay]
  // });
  //  }
  //
  //Option 3
  // the variable "options" can be any string as long as it's parsed tru .toLocaleDateString()


  res.render('list', {

    listTitle: currentDay,
    x: todosArr,
    greetings: greet
  });

})

app.get("/work", function(req, res) {
let greet = date.greet()
  res.render("list", {
    listTitle: "Work List",
    x: workList,
    greetings: greet
  });
})

app.get("/home", function(req, res) {
  let greet = date.greet()
  res.render("list", {
    listTitle: "Home List",
    x: homeList,
    greetings: greet
  });
})

app.get("/about", function(req, res){
  res.render("about")
})

app.post("/", function(req, res) {
  let todo = req.body.newItem;
  if (req.body.list === 'Work List') {
    workList.push(todo)
    res.redirect("/work")
  } else if (req.body.list === "Home List") {
    homeList.push(todo)
    res.redirect("/home")
  } else {
    todosArr.push(todo)
    res.redirect("/")

  }
})

app.listen(process.env.PORT || 3000, function() {
  console.log("running on port 3000");
});
