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
  var addDoc = db
    .collection(person.role)
    .doc(userInfo.uid)
    .set({
      first_name: person.first_name,
      last_name: person.last_name,
      phone: parseInt(person.phone)
    })
    .then(ref => {
      res.end({ success: true });
    });
});

app.post("/sendMessage", async (req, res) => {
  var message = req.body.message;
  console.log(message);
  db.doc(message.recipient)
    .collection("messages")
    .doc()
    .set({
      title: message.title,
      content: message.content,
      sender: message.sender
    })
    .then(ref => {
      res.end({ success: true });
    });
});

app.post("/patientProfile", async (req, res) => {
  const uid = req.body.uid;
  var patientCol = db.collection("patients").doc(uid);
  await patientCol
    .get()
    .then(info => {
      var info = info.data();
      res.end(JSON.stringify(info));
    })
    .catch(err => {
      console.log("Error getting document", err);
    });
});
app.post("/doctorProfile", async (req, res) => {
  const uid = req.body.uid;
  var doctorCol = db.collection("doctors").doc(uid);
  await doctorCol
    .get()
    .then(info => {
      var info = info.data();
      res.end(JSON.stringify(info));
    })
    .catch(err => {
      console.log("Error getting document", err);
    });
});
app.post("/patientMessages", async (req, res) => {
  var messages = { messages: [] };
  const uid = req.body.uid;
  console.log(uid);
  var patientMsgs = db
    .collection("patients")
    .doc(uid)
    .collection("messages");
  await patientMsgs
    .get()
    .then(async info => {
      await info.forEach(async doc => {
        var doc = doc.data();
        console.log(doc);
        var result = await getName(doc.sender);
        console.log(result);
        messages.messages.push({
          title: doc.title,
          content: doc.content,
          sender: JSON.parse(result)
        });
      });
    })
    .catch(err => {
      console.log("Error getting document", err);
    });
  setTimeout(function() {
    res.end(JSON.stringify(messages));
  }, 2000);
});

app.post("/doctorMessages", async (req, res) => {
  var messages = { messages: [] };
  const uid = req.body.uid;
  console.log(uid);
  var doctorMsgs = db
    .collection("doctors")
    .doc(uid)
    .collection("messages");
  await doctorMsgs
    .get()
    .then(async info => {
      await info.forEach(async doc => {
        var doc = doc.data();
        console.log(doc);
        var result = await getName(doc.sender);
        console.log(result);
        messages.messages.push({
          title: doc.title,
          content: doc.content,
          sender: JSON.parse(result)
        });
      });
    })
    .catch(err => {
      console.log("Error getting document", err);
    });
  setTimeout(function() {
    res.end(JSON.stringify(messages));
  }, 2000);
});

async function getName(path) {
  var result = {};
  await db
    .doc(path)
    .get()
    .then(user => {
      var user = user.data();
      console.log(user);
      result.first_name = user.first_name;
      result.last_name = user.last_name;
    });
  return JSON.stringify(result);
}
