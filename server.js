require("dotenv").config();
const express = require("express");
const app = express();
const admin = require("firebase-admin");
const path = require("path");
const bodyParser = require("body-parser");

// Import Routers
//const createPerson = require("./routes/create-person");

// Use BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Firebase database
var config = {
  apiKey: "AIzaSyCUK6M9YrsQ9b95lECCv1vWAZTamhjnf0Y",
  authDomain: "chronic-care-220004.firebaseapp.com",
  databaseURL: "https://chronic-care-220004.firebaseio.com",
  projectId: "chronic-care-220004",
  storageBucket: "chronic-care-220004.appspot.com",
  messagingSenderId: "113219295435"
};

admin.initializeApp(config);
const db = admin.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

// Use Routes
//app.use("/createPerson", createPerson);

app.use(express.static(path.join(__dirname, "client/build")));

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);

app.post("/createPerson", async (req, res) => {
  var person = req.body.user;
  var userInfo = req.body.userInfo;
  console.log("Person:", person.role);
  var addDoc = db
    .collection(person.role)
    .doc(userInfo.uid)
    .set({
      first_name: person.first_name,
      last_name: person.last_name,
      phone: parseInt(person.phone)
    })
    .then(ref => {
      console.log("Added document with ID: ", ref.id);
    });
});
