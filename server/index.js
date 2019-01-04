'use strict'
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()


const PORT = 5000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Barking 🐕'
  });
});

function isValidBark(bark) {
  return bark.name && bark.name.toString().trim() !== '' &&
    bark.content && bark.content.toString().trim() !== '';
}

app.post('/barks', (req, res) => {
  if (isValidBark(req.body)) {
    const bark = {
      name: req.body.name.toString(),
      content: req.body.content.toString()
    };
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