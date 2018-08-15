var five = require("johnny-five");
var board = new five.Board();
var amqp = require('amqplib/callback_api');
var R1 = 10000;
var logR2, R2, T;
var c1 = 1.009249522e-03, c2 = 2.378405444e-04, c3 = 2.019202697e-07;
board.on("ready", function() {
  var lap = 0;
	
  // Create a standard led component instance
  var led = new five.Led(13);
  // Create a new generic sensor instance for
  // a sensor connected to an analog (ADC) pin
  var sensor = new five.Sensor("A0");

  // When the sensor value changes, log the value
  sensor.on("change", function(value) {
	  
	//calcul de la valeur temperateur
	R2 = R1 * (1023.0 / value - 1.0);
	logR2 = Math.log(R2);
	T = (1.0 / (c1 + c2*logR2 + c3*logR2*logR2*logR2));
	T = T - 273.15;
	T = ((T * 9.0)/ 5.0 )/1.8; 
    console.log(parseInt(T));
	
  //envoie de la temperateur
  



	if(T>30){
     led.brightness(0);
     amqp.connect('amqp://localhost', function(err, conn) {
      conn.createChannel(function(err, ch) {
        var q = 'hello';
        
        var msg = {
            name: "CapteurTemperature",
            Capteur: "" + parseInt(T),
            designation: 'temperature en degres'
         };
         
        ch.sendToQueue(q, new Buffer(JSON.stringify(msg)));
        console.log(" [x] Sent %s", msg.toString());
      });
    });
		
		 
	}else{
		 led.brightness(1);
	}
	
  });
 
});


//setTimeout(function() { conn.close(); process.exit(0) }, 500);