const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const responsehelper = require('express-response-helper');
const db = require("./app/models/index.js");

const app = express();

app.use(responsehelper.helper());

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/user", async (req, res) => {
  const users = await db.User.findAll();
  console.log(users)
  res.respond(users);
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
});


