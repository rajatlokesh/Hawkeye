var mqtt = require('mqtt');
const settings = {
	username: 'admin1',
	password: 'admin1',
	clientId: 'client2',
}
var client = mqtt.connect('mqtt://localhost',settings);
client.on('connect',function(){
	client.subscribe('presence',function(err){
		if(err){
			console.log("error in connection");
		}
	});
	client.subscribe('command/power');
});
client.on('message',function(topic,message){
	console.log(topic.toString() +": " +message.toString());
	if(topic === 'command/power')
		client.publish('ack',settings.clientId + ' Topic:'+ topic + ' Message:' +message,(err)=>{
			if(!err)
				console.log('Informed data collector');
		});
});
