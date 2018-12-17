"use strict"

const express = require("express");
const cors = require("cors");
const PORT = 5000;
const monk = require('monk');
const app = express();
require('dotenv').config();

const db = monk('mongodb+srv://rudi:<password>@barks-uaear.gcp.mongodb.net/test?retryWrites=true');
const barks = db.get('barks');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Barking 🐕'
  });
});

app.get('/barks', (req, res) => {
  barks
    .find()
    .then(barks => {
      res.json(barks);
    });
});

function isValidBark(bark) {
  return bark.name && bark.name.toString().trim() !== '' &&
    bark.content && bark.content.toString().trim() !== '';
}

app.post('/barks', (req, res, next) => {
  if (isValidBark(req.body)) {
    const bark = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: new Date()
    };
    barks
      .insert(bark)
      .then(createdBark => {
        res.json(createdBark);
      }).catch(next);
  } else {
    res.status(422);
    res.json({
      message: 'Hey! Name and Content are required!'
    })
  }
});

app.listen(PORT, () => {
  console.log(`server is up and runing on port ${PORT}`);
});