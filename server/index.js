"use strict"

const express = require("express");
const cors = require("cors");
const PORT = 5000;
const monk = require('monk');
const app = express();
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://rudi:<${process.env.PASSWORD}>@barks-uaear.gcp.mongodb.net/test?retryWrites=true`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("barks").collection("barks");
  console.log('connection made');
  
  client.close();
});

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
    console.log(bark);
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