const http = require('http');

// Create server
const hostname = '127.0.0.1';
const port = 3000;

//Connect to mongodb

var amqp = require('amqplib/callback_api');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const assert = require('assert');


const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


var CapteurDistance;
var CapteurChauffage= {};
// Connexion au serveur avec la méthode connect
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    var dbo = db.db("iot");
    dbo.collection("CapteurDistance").find({}).toArray(function (err, result) {
       if(err) throw err;
       CapteurDistance = result;
       console.log('Capteur distance : ' + CapteurDistance.length);
       db.close();
    });
});

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  var dbo = db.db("iot");
  dbo.collection("CapteurChauffage").find({}).toArray(function (err, result) {
     if(err) throw err;
     CapteurChauffage = result;
     console.log('Capteur chauffage : ' + CapteurChauffage.length);
     db.close();
  });
});