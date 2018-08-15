#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';
    // var msg = 'Hello World!';

    var msg = {
        name: 'Cognac',
        company: 'Paul',
        designation: 'Senior Application Engineer'
     };
     
    ch.sendToQueue(q, new Buffer(JSON.stringify(msg)));
    // ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    // ch.sendToQueue(q, new Buffer(msg));
    console.log(" [x] Sent %s", msg.toString());
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});