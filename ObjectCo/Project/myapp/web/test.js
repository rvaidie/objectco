var http = require('http');
var url = require('url');
var fs = require('fs');
var amqp = require('amqplib/callback_api');
const MongoClient = require('mongodb').MongoClient;
const url2 = 'mongodb://localhost:27017';
const assert = require('assert');
var testT1= "ceci est un test";
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

/*var server = http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var name = url_parts.query.name;
    if (name) {
        console.log('Name: ' +name);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Hello ' +name + '!'}));
    } else {
        console.log('No name!');
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('test.html',function (err,data) {
            res.end(data);
        });
    }
}).listen(1337, '127.0.0.1');*/

var CapteurDistance;
var CapteurChauffage= {};
// Connexion au serveur avec la méthode connect
MongoClient.connect(url2, function(err, db) {
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

MongoClient.connect(url2, function(err, db) {
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

// GET method route
app.get('/chauffage', function (req, res) {
    res.json(CapteurChauffage);
});

app.get('/distance', function (req, res) {
    res.json(CapteurDistance);
});

  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
console.log('Server running at http://127.0.0.1:1337/');