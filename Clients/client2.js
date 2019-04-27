var mqtt = require('mqtt');
const settings = {
	username: 'admin1',
	password: 'admin1',
}
var client = mqtt.connect('mqtt://localhost',settings);
client.on('connect',function(){
	client.subscribe('presence',function(err){
		if(err){
			console.log("error in connection");
		}
	});
	client.subscribe('command');
});
client.on('message',function(topic,message){
	console.log(topic.toString() +": " +message.toString());
});
