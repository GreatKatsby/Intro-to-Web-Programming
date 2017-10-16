"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.0";
	var num;
	var count = 0;

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}
	
	function clicked(){
		document.getElementById("num").disabled = false;
		document.getElementById("submit").disabled = false;
		document.getElementById("yes").disabled = true;
	}//End of clicked
	
	function number(){
		num = parseInt(document.getElementById("num").value);
		document.getElementById("num").value = null;
		document.getElementById("guess").disabled = false;
		document.getElementById("check").disabled = false;
		document.getElementById("num").disabled = true;
		document.getElementById("submit").disabled = true;
	}//End of number

	function checkGuess(guess){	
		var guess = parseInt(document.getElementById("guess").value);
		
		var response = document.getElementById("response");
	
		if(guess > num){
			$("#app>footer").text("Your guess is Too High!");
			
			count = count + 1;
		}//End if
		if(guess < num){
			$("#app>footer").text("Your guess is Too Low!");
					
			count = count + 1;
		}//End if
		if(guess == num){
			count = count + 1;
			if(count == 1){
				$("#app>footer").text("Your guess is Correct! It took you " + count + " try!");
			}//End inner first if
			
			if(count > 1){
				$("#app>footer").text("Your guess is Correct! It took you " + count + " tries!");
			}//End second inner if
			
			document.getElementById("reload").disabled = false;
			document.getElementById("guess").disabled = true;
			document.getElementById("check").disabled = true;
		}//End if
	}//End checkGuess
	
	function reload(){
		window.location.reload();
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
		
		$("#yes").on("click", clicked);
		$("#submit").on("click", number);
		$("#check").on("click", checkGuess);
		$("#reload").on("click", reload);
		
	};
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new MyApp();
	window.app.start();
});
