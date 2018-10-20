const express = require("express");
const router = express.Router();
const db = require("../server");

console.log(db);
router.post("/", async (req, res) => {
  var person = req.body.user;
  var addDoc = await db
    .collection(person.role)
    .add({
      first_name: person.first_name,
      last_name: person.last_name,
      phone: parseInt(person.phone)
    })
    .then(ref => {
      console.log(ref);
      console.log("Added document with ID: ", ref.id);
    });

  console.log(person);
});

module.exports = router;
