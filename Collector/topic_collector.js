
var axios = require("axios");
function getdata(){
	return new Promise((resolve,reject)=>{
	axios({
		method: 'get',
		url: 'http://localhost:15672/api/exchanges/%2F/amq.topic/bindings/source',
		auth:{
			username: 'admin1',
			password: 'admin1',
		},
		responseType: 'json'
	})
    	.then(function (response) {
		var topics = new Set;
		var data = response.data;
		data.forEach((obj)=>{
			topics.add(obj.routing_key);
		});
		resolve(topics);
		//topics.forEach((ele)=>{	console.log(ele);});
    	})
    	.catch (function(error) {
        	console.log(error);
		reject(error);
	});
});



}

function setdata(){
	getdata()
	.then((set)=>{
		console.log(set);
		return set;
	})
	.catch((err)=>{
		Console.log(err);
		return 'err';
	})
}
setdata();
module.exports = getdata;
