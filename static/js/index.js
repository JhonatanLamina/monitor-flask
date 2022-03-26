//Create a client instance
client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));
//Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
var options = {
  useSSL: false,
  userName: "web.jhonatanlamina@gmail.com",
  password: "jhonatanlamina",
  onSuccess:onConnect,
  onFailure:doFail
}
//Connect the client
client.connect(options);
//Called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Successful Connection");
  document.getElementById("state").innerHTML="Successful Connection";
  client.subscribe("web.jhonatanlamina@gmail.com/t1");
  //message = new Paho.MQTT.Message("New Connection");
  //message.destinationName = "web.jhonatanlamina@gmail.com/t2";
  //client.send(message);
}
function doFail(e){
  alert("A connection error has occurred. Try again later.")
  console.log(e);
  document.getElementById("state").innerHTML="Failed Connection";
  document.getElementById("data").remove();
}
//Called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode != 0) {
    console.log("Connection Lost:"+responseObject.errorMessage);
    document.getElementById("state").innerHTML="Lost Connection";
    //document.getElementById("data").remove();
  }
}
//Called when a message arrives
function onMessageArrived(message) {
  console.log("New data received: "+message.payloadString);
  //alert(message.payloadString);
  //document.getElementById('data').innerHTML=message.payloadString
  var text = document.createTextNode(message.payloadString+" |-|-|-| ");
  document.getElementById('data').appendChild(text);
}