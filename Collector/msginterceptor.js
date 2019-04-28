
var live_topic = require('./topic_collector');
var mqtt =require('mqtt');
var uname = process.argv[2] || 'null';
var pword = process.argv[3] || 'null';
const settings = {
	clientId : 'Collection_server',
	username : uname,
	password : pword,
	retain: true,
}
var topics = live_topic;
console.log(topics);
var client = mqtt.connect('mqtt://localhost',settings);
client.on('error',function(err){
	console.log('Error in connection try again error code is '+err);
});
client.on('connect',function(){
	console.log('Connection Sucessful! This Client ID is'+ settings.clientId );
	client.subscribe('ack',function(err){
		if(!err);
			console.log('looking for acknowledgement from clients!!');
	});
	livetopics();

});
client.on('message',function(topic,message){
	var dt = new Date();
	console.log('Topic: '+ topic +'\nMessage: '+ message);
	var data =  message  +' TS:'+ dt.toISOString();
	if(topic ==='ack'){
		sendtodatabase(data);
	}
});
function livetopics(){
	live_topic()
	.then((topics)=>{
		topics.forEach((top)=>{
			top = top.replace(".","/");
			client.subscribe(top,function(err){
				if(!err){
//					console.log('subscribed to topics :',top );
				}
			});
		});
//		console.log(topics);
		setTimeout(livetopics,1000);
	})
	.catch((err)=>{
		setTimeout(livetopics,1000);
	})
};

function sendtodatabase(message){
	client.publish('dbentries',message,{qos:1,retain:true},function(err){
		if(!err)
			console.log('dbentry sent');
	});
};
