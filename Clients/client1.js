var mqtt = require('mqtt');
var uname = process.argv[2] || 'null';
var pword = process.argv[3] || 'null';
var proc = process.argv[1].split("/")[process.argv[1].split("/").length-1];
const settings = {
	clientId : proc.slice(0,proc.length-3)+'_'+ Math.random().toString(16).substr(2,8),
	username : uname,
	password : pword,
	retain   : 'true',
}

var stopics = new Array();
var ptopics = new Array();
ptopics.push('status');
console.log('trying connecting with uname: "%s" and pass: "%s". ',uname,pword);
var client1 =  mqtt.connect('mqtt://localhost',settings);
client1.on('connect', function onconnect (){
	var topic = 'command/power';
	console.log('connected to server with client id %s', settings.clientId);
	client1.subscribe(topic,function(err){
		if(!err){
			stopics.push(topic);
			console.log('subscribing to topic:'+ topic);
		}
	});
});


client1.on('message',function(topic,message){
	console.log('Topic: '+ topic.toString()+'\nMessage: '+ message.toString());
	if(stopics.some((value)=>{return value ===topic;})){
		var date = new Date();
		var msg= message + ' ' +settings.clientId + date.toISOString();
		ptopics.forEach(function(tpc){
			client1.publish(tpc,message,function(err){
				if(!err)
					console.log('Publishing Message:-\n  topic: '+ tpc + '\n  message: ' + msg);
			});
		});
	}
});

client1.on('error',function (err){
	console.log("couldn't connect because of...." + err);
	client1.end();
});
