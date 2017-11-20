function WeatherWidget($widget){
	
	var lat;
	var lon;
	var coords;
	
	this.update = function(lat, lon){
		$(".results", $widget).hide();
		$(".loading", $widget).show();
		
		getWeatherReport(lat, lon);
		
	};
	
	function getWeatherReport(lat, lon){
		coords = lat + "," + lon;
		
		$.ajax({
			url: "http://api.weather.gov/points/" + coords + "/forecast",
			dataType : "json"
		})
		.done(function(data){
			$(".loading", $widget).fadeOut(function(){
			$(".results", $widget).fadeIn();
		});
			populateWeather(data);
		});
	}
	
	function populateWeather(data){
		var observation = data.properties.periods[0];
		
		$(".results header img", $widget)
			.attr("src", observation.icon);
		$(".location>span", $widget).text();
			
		$(".conditions>span").each(function(i, e){
			var $span = $(this);
			var field = $span.data("field");
			$(this).text(observation[field]);
		});
	}
}