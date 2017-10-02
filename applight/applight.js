var on = false;

function clicked(){
	if(on == true){ 
		alert("off!");
		document.getElementById("inner").style.cssFloat = "left";
		document.body.style.backgroundColor = "black";
		on = false;
	}else{
		alert("on");
		document.getElementById("inner").style.cssFloat = "right";
		document.body.style.backgroundColor = "white";
		on = true;
	}
}