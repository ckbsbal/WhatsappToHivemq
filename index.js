const venom = require('venom-bot');
var mqtt = require('mqtt')


//console.log("mqtt",message)
var topic= "testTopic";

var options = {
    host: 'f48ee08ab11a445eb674d5c74cbc9aa8.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'Chandan',
    password: 'Chandan@1234'
}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});



venom
  .create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {

    console.log(message.body,message.from)
    if(message.from==="917438879938@c.us" && message.isGroupMsg === false )
    {
    send_mqtt_message(message.body)
    }
    if (message.body === 'Hi' && message.isGroupMsg === false ) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }



   
  });
}

function send_mqtt_message(message){
    // console.log("mqtt",message)
    // var topic= "testTopic";

    // var options = {
    //     host: 'f48ee08ab11a445eb674d5c74cbc9aa8.s2.eu.hivemq.cloud',
    //     port: 8883,
    //     protocol: 'mqtts',
    //     username: 'Chandan',
    //     password: 'Chandan@1234'
    // }
    
    // // initialize the MQTT client
    // var client = mqtt.connect(options);
    
    // // setup the callbacks
    // client.on('connect', function () {
    //     console.log('Connected');
    // });
    
    client.on('error', function (error) {
        console.log(error);
    });
    
    client.on('message', function (topic, message) {
        // called each time a message is received
        console.log('Received message:', topic, message.toString());
    });
    
    // subscribe to topic 'my/test/topic'
    client.subscribe('my/test/topic');
    
    // publish message 'Hello' to topic 'my/test/topic'
    client.publish(topic, message);
    return;
}