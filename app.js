const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();

//connect to mongoose

//this connection is not longer require mongoose 5.x

// mongoose
//   .connect("mongodb://localhost/vidjot-dev", {
//     useMongoClient: true
//   })
//   .then(() => {
//     console.log("Mongodb connected");
//   })
//   .catch(err => console.log(err));

mongoose
  .connect("mongodb://localhost/vidjot-dev", { useNewUrlParser: true })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch(err => console.log(err));

//Load Idea Model

require("./models/idea");
const Idea = mongoose.model("ideas");
//how middleware works

// app.use((req, res, next) => {
//   console.log(Date.now());
//   next();
// });

//handlebars middleware

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//index route

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

const port = 5000;

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});
