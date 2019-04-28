function write(){
var arr1 = new Set('1','2','3');
var arr2 = new Set('1','2','4','5');
 if(equal(arr1,arr2)===1 ){
	arr1.forEach((val)=>{console.log(val);});
}
else{
	console.log('are equal');
}

}
function equal(a1,a2){
	if(a1.length === a2.length){
		return 1;
	}
	else{
		console.log(false);
		return 0;
	}
}

write();
