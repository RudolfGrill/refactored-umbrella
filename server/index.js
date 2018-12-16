"use strict"

const express = require("express");
const cors = require("cors");
const PORT = 5000;
//const monk = require('monk');
const app = express();
require('dotenv').config();

const db = require('db')
db.connect({
  PASSWORD: process.env.DB_PASS
})

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rudi:<PASSWORD>@barks-uaear.gcp.mongodb.net/test?retryWrites=true";
const db = new MongoClient(uri, { useNewUrlParser: true });

//const db = monk('mongodb://127.0.0.1:27017');
//const barks = db.get('barks');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {1
  res.json({
    message: 'Barking 🐕'
  });
});

function isValidBark(bark) {
  return bark.name && bark.name.toString().trim() !== '' &&
  bark.content && bark.content.toString().trim() !== '';
}

app.post('/barks', (req, res)=>{
  if (isValidBark(req.body)) {
    //to db
    const bark = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: new Date()
    };
    
    barks
      .insert(bark)
      .then(createdBark => {
        res.json(createdBark);
      });


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