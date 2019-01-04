"use strict"

const express = require("express");
const cors = require("cors");
const PORT = 5000;
const monk = require('monk');
const app = express();
const Filter = require('bad-words');
const rateLimit = require("express-rate-limit");

require('dotenv').config();

const db = monk(`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@ds135844.mlab.com:35844/barks`);
const barks = db.get('barks');
const filter = new Filter();

console.log(barks);
console.log(barks.content);

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

app.use(rateLimit({
  windowMs: 30 * 1000, // 30 secunds
  max: 1 // limit each IP to 100 requests per windowMs
}));

app.post('/barks', (req, res, next) => {
  if (isValidBark(req.body)) {
    const bark = {
      name: filter.clean(req.body.name.toString()),
      content: filter.clean(req.body.content.toString()),
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
