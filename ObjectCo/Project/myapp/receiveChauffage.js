#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const assert = require('assert');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", JSON.parse(msg.content));

        // Connexion au serveur avec la méthode connect
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            var dbo = db.db("iot");
           dbo.collection("CapteurChauffage").insertOne(JSON.parse(msg.content), function(err, res){
               if(err) throw err;
               console.log('ca fonctionne');
               db.close;

           });
          });
    }, {noAck: true});
  });
});