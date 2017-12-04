function app(){
	var version = "Beta";
	
	var id;
	var ACE = 11;
	var $hand;
	var $oppHand;
	var arr = [];
	var oppArr = [];
	var sum;
	var oppSum;
	var bet;
	var stash = 5000;
	
	function setStatus(message){
		$("#app>footer").text(message);
	}
	
	this.start = function(){
		
		$("#app>footer").append(version);
		setStatus("Ready");
		
		$("#stash").html(stash);
		
		$("#bet").keypress(function(e){
			if(e.which == 13){
				bet = $("#bet").val();
				if(bet <= stash){
					$("#bid").html(bet);
					newDeck();
					$("#deal").removeClass("hidden");
					$(".bet").addClass("hidden");
					return false;
				} else {
					$("#err").text("You Can Not Afford That Bid!!");
				}
			}
		});
		
		$("#deal").click(function(){
			deal();
			$("#deal").addClass("hidden");
			$("#hit").removeClass("hidden");
			$("#stay").removeClass("hidden");
		});
		
		$("#hit").click(function(){
			drawCard();
		});
		
		$("#stay").click(function(){
			$("#opponentTemp").removeClass("hidden");
			$("#oppSum").removeClass("hidden");
			showOppHand();
			$("#again").removeClass("hidden");
			$("#hit").addClass("hidden");
			$("#stay").addClass("hidden");
		});
		
		$("#again").click(function(){
			clearHand();
			$("#again").addClass("hidden");
			$(".bet").removeClass("hidden");
		});
	}
	
	function drawCard(){		
		$.ajax({
			url: "https://deckofcardsapi.com/api/deck/" + id + "/draw/?count=1"
		})
		.done(function(data){
			$hand = $(".template .hand ").clone();
			$("#face", $hand).attr("src", data.cards[0].image);
			$("#hand").append($hand);
			convert(data);
			handSum();
		});
	}
	
	function opponentHand(){
		$.ajax({
			url: "https://deckofcardsapi.com/api/deck/" + id + "/draw/?count=1"
		})
		.done(function(data){
			$oppHand = $(".opponentTemp .opponent ").clone();
			$("#face", $oppHand).attr("src", data.cards[0].image);
			$("#opponent").append($oppHand);
			oppHandConvert(data);
			oppHandSum();
		});
	}
	
	function newDeck(){
		$.ajax({
			url: "https://deckofcardsapi.com/api/deck/new/shuffle/"
		})
		.done(function(data){
			id = data.deck_id;
		});
		
	} 
	
	function deal(){
		for(var i = 1; i <= 2; i++){
			drawCard();
		}
	}
	
	function showOppHand(){
		$(".oppVal").show();
		for(var i = 1; i <= 2; i++){
			opponentHand();
		}
	}
	
	function convert(data){
		if(data.cards[0].value == "JACK" || data.cards[0].value == "QUEEN" || data.cards[0].value == "KING"){
			arr.push(10);
			
		} else if(data.cards[0].value == "ACE"){
			arr.push(ACE);
			
		}else if(data.cards[0].value == "ACE" && sum > 21){
			ACE = 1;
			
		}else{
			arr.push(data.cards[0].value);
			
		}
		
	}
	
	function oppHandConvert(data){
		if(data.cards[0].value == "JACK" || data.cards[0].value == "QUEEN" || data.cards[0].value == "KING"){
			oppArr.push(10);
			
		} else if(data.cards[0].value == "ACE"){
			oppArr.push(ACE);
			
		}else{
			oppArr.push(data.cards[0].value);
			
		}
		
	}
	
	function handSum(){
		sum = parseInt(arr[0]);
		
		if(arr.length == 2){
			
			sum = parseInt(arr[0]) + parseInt(arr[1]);
			
		}else if(arr.length == 3){
			
			sum = parseInt(arr[0]) + parseInt(arr[1]) + parseInt(arr[2]);
			
		}else if(arr.length == 4){
			
			sum = parseInt(arr[0]) + parseInt(arr[1]) + parseInt(arr[2]) + parseInt(arr[3]);
			
		}else{
			sum = parseInt(arr[0]) + parseInt(arr[1]) + parseInt(arr[2]) + parseInt(arr[3]) + parseInt(arr[4]);
		}
		
		$("#sum").text(sum);
		
		if(sum == 21){
			showOppHand();
		}
		
		if(sum > 21){
			$("#opponentTemp").removeClass("hidden");
			$("#oppSum").removeClass("hidden");
			showOppHand();
			$("#again").removeClass("hidden");
			$("#hit").addClass("hidden");
			$("#stay").addClass("hidden");
		}
	}
	
	function oppHandSum(){
		
		oppSum = parseInt(oppArr[0]) + parseInt(oppArr[1]);
		$("#oppSum").text(oppSum);
		
		handState();
	}
	
	function handState(){
		
		if(sum == 21 && arr.length == 2){
			$("#state").text("BLACKJACK");
			$("#state").addClass("blackjack");
			stash = stash + parseInt(bet);
			
		}else if(sum < oppSum || sum > 21){
			$("#state").text("YOU LOSE");
			stash = stash - parseInt(bet);
			
		}else if(sum > oppSum){
			$("#state").text("YOU WIN");
			stash = stash + parseInt(bet);
			
		}else{
			$("#state").text("PUSH");
			
		}
		
		$("#state").removeClass("hidden");
		
		$("#stash").html(stash);
	}
	
	function clearHand(){
		
		$("#hand>li").each(function(){
			$(this).remove();
		});
		
		$("#opponent>li").each(function(){
			$(this).remove();
		});
		
		$("#sum").text("");
		$("#oppSum").text("");
		$("#state").text("");
		$("#err").text("");
		
		oppArr = [];
		arr = [];
		sum = 0;
		oppSum = 0;
		
	}
}

$(function(){
	window.app = new app();
	window.app.start();
});