function app(){
	
	var id;
	
	function drawCard(){
		$.ajax({
			url: "https://deckofcardsapi.com/api/deck/" + id + "/draw/?count=2"
		})
		.done(function(data){
			$("#face").attr("src", data.cards[0].image);
		});
	}
	
	function newDeck(){
		$.ajax({
			url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
		})
		.done(function(data){
			id = data.deck_id;
		});
	}
	
	this.start = function(){
		$("#new").click(function(data){
			newDeck();
		});
		
		$("#draw").click(function(){
			drawCard();
		});
		
	};
}

$(function(){
	window.app = new app();
	window.app.start();
});