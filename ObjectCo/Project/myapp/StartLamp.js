var amqp = require('amqplib/callback_api');




var five = require("johnny-five");
var board = new five.Board();
var led = new five.Led(13);

board.on("ready", function() {
  var proximity = new five.Proximity({
    controller: "HCSR04",
    pin: "A0"
  });

  proximity.on("data", function() {
    centimetre = this.cm;

    /*if(this.cm<10) {
      led.brightness(1);
    } else {
      led.brightness(0);
    }*/

    amqp.connect('amqp://localhost', function(err, conn) {
      conn.createChannel(function(err, ch) {
        var q = 'hello';
        
        var msg = {
            name: 'CapteurDistanceArriere',
            CapteurDistanceCentimetre: "" + centimetre,
            designation: 'Senior Application Engineer'
         };
         
        ch.sendToQueue(q, new Buffer(JSON.stringify(msg)));
        console.log(" [x] Sent %s", msg.toString());
      });
    });
  });

  proximity.on("change", function() {
    console.log("The obstruction has moved.");
  });
});