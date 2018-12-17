const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb://rudi:<PASSWORD>@barks-shard-00-00-uaear.gcp.mongodb.net:27017,barks-shard-00-01-uaear.gcp.mongodb.net:27017,barks-shard-00-02-uaear.gcp.mongodb.net:27017/test?ssl=true&replicaSet=barks-shard-0&authSource=admin&retryWrites=true"
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});