
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://rudi:<${process.env.PASSWORD}>@barks-uaear.gcp.mongodb.net/test?retryWrites=true`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('connection made');
  
  client.close();
});