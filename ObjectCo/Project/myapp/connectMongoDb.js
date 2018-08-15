const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'iot';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  
  var dbo = db.db("iot");
  var myobj = {
    name: 'Jack Daniel',
    company: 'JP Morgan',
    designation: 'Senior Application Engineer'
 };
 dbo.collection("users1").insertOne(myobj, function(err, res){
     if(err) throw err;
     console.log('ca fonctionne');
     db.close;

 });
});