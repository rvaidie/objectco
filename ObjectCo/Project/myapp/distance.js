var amqp = require('amqplib/callback_api');
var five = require("johnny-five");
var board = new five.Board();
var cent;

board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "HCSR04",
    pin: "A0"
  });

  proximity.on("data", function() {
    console.log("Proximity: ");
    console.log("  cm  : ", this.cm);
    cent = this.cm;
    if(this.cm<10) {
      amqp.connect('amqp://localhost', function(err, conn) {
      conn.createChannel(function(err, ch) {
        var q = 'hello';
        
        var msg = "" + cent;
         
        ch.sendToQueue(q, new Buffer(msg));
        console.log(" [x] Sent %s", msg.toString());
      });
    });
    } else {
    }
    
	
  });

  

  proximity.on("change", function() {
    console.log("The obstruction has moved.");
  });
});