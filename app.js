const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

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

//body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//index route

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

//add idea form
app.get("/ideas/add", (req, res) => {
  res.render("ideas/add");
});

app.get("/ideas", (req, res) => {
  res.render("ideas");
});

// process form

app.post("/ideas", (req, res) => {
  // console.log(req.body);

  let error = [];

  if (!req.body.title) {
    error.push({ text: "please add a title" });
  }

  if (!req.body.details) {
    error.push({ text: "please add some details" });
  }

  if (error.length > 0) {
    res.render("ideas/add", {
      error: error,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    };

    new Idea(newUser).save().then(idea => {
      res.redirect("/ideas");
    });
  }
  // res.send("ok");
});
const port = 5000;

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});
