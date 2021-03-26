const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3333;
const mongoose = require("mongoose");
const Users = require("./models/models");
const register = require("./routes/register");
const doc = Users.findOne();
const bcrypt = require("bcryptjs");

require("dotenv").config();

app.use("/static", express.static(__dirname + "/public"));

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db !")
);

app.post("/register", (request, response) => {
  Users.findOne(
    { email: request.body.email },
    { username: request.body.username },
    function (err, user) {
      if (err) console.log(err);
      // log(user.email)
      if (user) {
        console.log(Users);
        response.send(`user ${request.body.username} already exists`);
        console.log(`user ${request.body.username} already exists`);
      } else {
        Users.create(request.body, function (err, doc) {
          // mongoose.disconnect();

          if (err) console.log(err);
          console.log("Сохранен объект user", doc);
          console.log(` ${request.body.username} registered succsessfully`);

          response.redirect("http://localhost:3333/static/about.html");
        });
      }
    }
  );
});

app.post("/login", (request, response) => {
  Users.findOne(
    { username: request.body.username },
    { password: request.body.password },
    function (err, user) {
      if (err) console.log(err);
      if (user) {
        console.log(user);
        response.send(
          `user ${request.body.username}  authenticated succsessfully`
        );
        console.log(` ${request.body.username} authenticated succsessfully`);
      } else {
        response.send("user doesnt exist");
        console.log("user doesnt exist");
      }
    }
  );
});

app.listen(port, () => {
  console.log("We are live on " + `${port}`);
});
