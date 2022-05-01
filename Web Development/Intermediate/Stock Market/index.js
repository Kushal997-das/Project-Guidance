const express = require("express");
const { engine } = require("express-handlebars");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
const path = require("path");

const PORT = process.env.PORT || 5000;

// Use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// API Key = pk_c4a70d73c4ea45f98d7e7da4d0b92b00
// Create call_api function
function call_api(finishedAPI, ticker) {
  request(
    "https://cloud.iexapis.com/stable/stock/" +
      ticker +
      "/quote?token=pk_c4a70d73c4ea45f98d7e7da4d0b92b00",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      if (res.statusCode === 200) {
        // console.log(body);
        finishedAPI(body);
      }
    }
  );
}

// Set Handlebar Middleware
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Set Handlebars index GET Routes
app.get("/", (req, res) => {
  call_api(function (doneAPI) {
    res.render("home", {
      stock: doneAPI,
    });
  }, "fb");
});

// Set Handlebars index POST Routes
app.post("/", (req, res) => {
  call_api(function (doneAPI) {
    // posted_stuff = req.body.stock_ticker;
    res.render("home", {
      stock: doneAPI,
    });
  }, req.body.stock_ticker);
});

app.get("/about.html", (req, res) => {
  res.render("about");
});

// //Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server listining on Port ${PORT}`);
});
