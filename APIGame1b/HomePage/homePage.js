function Page(){
	
	var version = "Beta";
	
	function setStatus(message){
		$("#app>footer").text(message);
	}
	
	this.start = function(){
		$("#app>footer").append(version);
		setStatus("Ready");
	}
}

$(function(){
	window.homePage = new Page();
	window.homePage.start();
});