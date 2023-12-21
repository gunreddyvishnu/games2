const mqtt = require("mqtt");
const brokerOptions = {
  host: "c47a4bf3.emqx.cloud",
  port: 1883, // MQTT over TCP Port
  protocol: "mqtt", // Use 'mqtt' for TCP connection
  username: "admin_server",
  password: "a123g2madhu@G",
};

// Create an MQTT client
const client = mqtt.connect(brokerOptions);

async function connectmqtt() {
  client.on("connect", () => {
    // console.log('Connected to MQTT broker');
  });
}

client.on("error", (err) => {
  console.error("Error:", err);
});

async function publishMessage(topic, message) {
  client.publish(topic, JSON.stringify(message));
}

exports.connectmqtt = connectmqtt;

exports.publishMessage = publishMessage;
