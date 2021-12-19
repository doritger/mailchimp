const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const client = require("@mailchimp/mailchimp_marketing");

const port = 3000;

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//i used the express static with public folder instead
// app.get("/signin.css", function (req, res) {
//   res.sendFile(__dirname + "/signin.css");
// });

app.post("/", function (req, res) {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;
  //console.log(fName, lName, email);

  client.setConfig({
    apiKey: "f075da1509454c693f8c4cd625f24edb-us20",
    server: "us20",
  });

  const listId = "d8096d9f06";
  //Creating an object with the users data
  const subscribingUser = {
    firstName: fName,
    lastName: lName,
    email: email,
  };

  const run = async () => {
    const response = await client.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });

    //console.log(response);
  };
  res.sendFile(__dirname + "/success.html");
  console.log(`Successfully added contact as an audience member.`);
  run();
});

app.listen(process.env.PORT || port, function () {
  console.log(`Example app listening`);
  console.log(process.env.PORT);
});

//api mailchimp key
//f075da1509454c693f8c4cd625f24edb-us20
//audience id: d8096d9f06
