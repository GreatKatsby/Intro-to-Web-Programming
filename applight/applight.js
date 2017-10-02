var on = false;

function clicked(){
	if(on == true){ 
		document.getElementById("inner").innerHTML = "OFF";
		document.getElementById("inner").style.cssFloat = "left";
		document.body.style.backgroundColor = "black";
		on = false;
	}else{
		document.getElementById("inner").innerHTML = "ON";
		document.getElementById("inner").style.cssFloat = "right";
		document.body.style.backgroundColor = "white";
		on = true;
	}
}