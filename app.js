const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

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
