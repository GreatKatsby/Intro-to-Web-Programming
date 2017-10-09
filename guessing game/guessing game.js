var num;

function clicked(){
	document.getElementById("num").disabled = false;
	document.getElementById("submit").disabled = false;
	document.getElementById("yes").disabled = true;
}

function number(){
	num = parseInt(document.getElementById("num").value);
	document.getElementById("guess").disabled = false;
	document.getElementById("check").disabled = false;
	document.getElementById("num").disabled = true;
	document.getElementById("submit").disabled = true;
}

function checkGuess(guess){	
	var guess = parseInt(document.getElementById("guess").value);
	
	var response = document.getElementById("response");
	
	if(guess > num){
		response.innerHTML = "Your guess is Too High!";
	}
	if(guess < num){
		response.innerHTML = "Your guess is Too Low!";
	}
	if(guess == num){
		response.innerHTML = "Your guess is Correct!";
		
		reset();
	}
}

function reset(){
	document.getElementById("yes").disabled = false;
	document.getElementById("guess").disabled = true;
	document.getElementById("check").disabled = true;
	document.getElementById("num").disabled = true;
	document.getElementById("submit").disabled = true;
}