'use strict'

$(document).ready(function() {

// pageload	
	$(".hidden-advanced").hide();
	$(".results").hide();

// show advanced search page	
	$("#advanced").click(function() {
		$(".homepage").hide();
		$(".hidden-advanced").show();
		$(".results").hide();
	})

// show homepage
	$(".fa-home").click(function() {
		$(".homepage").show();
		$(".hidden-advanced").hide();
		$(".results").hide();
	})

// show results page on submit
	$("#homepage-submit").click(function(e) {
		e.preventDefault();
		$(".results").show();
		$(".results").html('');
		getBasicTrails();
	})

	$("#find-hikes").click(function(e) {
		e.preventDefault();
		$(".results").show();
		$(".results").html('');
		getTrails();
	})

// get basic hiking trails by state only
var getBasicTrails = function(criteria) {

	$.ajax({
    	url: 'https://trailapi-trailapi.p.mashape.com/', // The URL to the API. You can get this in the API page of the API you intend to consume
    	type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    	data: {"q[state_cont]": $(".homepage form > input").val()}, // Additional parameters here
    	dataType: 'json',
    	success: function(data) {
    		console.log((data));
    		for(var i = 0; i < data.places.length; i++) {

    			var place = data.places[i];
    			var directions = place.directions;

    			$('.results').append(`

					<div class="place">
						<h1>${place.name}</h1>
						<h2>${place.city}, ${place.state}</h2>
						<p class="${place.description === null ? 'no-description' : ''}">${place.description}</p>
						<p>Directions: ${directions}</p>
						<a href="${place.activities[0].url}">Read more</a>
					</div>
				`);
    		}
    	},
    	error: function(err) { alert(err); },
    	beforeSend: function(xhr) {
    		xhr.setRequestHeader("X-Mashape-Authorization", "QYyfJ0AJ55mshNE7Z8fXe8CIU4pQp1bT9bMjsnaTW8xTgmib0u"); // Enter here your Mashape key
    	}
	});
};


// get hiking trails based on search values
var getTrails = function(criteria) {

	// parameters to pass in request to Trail API
	var params = {
		"q[activities_activity_name_cont]": $("#park").val(),
		"q[activities_activity_type_name_eq]": 'hiking',
		"q[city_cont]": $("#city").val(),
		"q[country_cont]": 'United States',
		"q[state_cont]": $("#state").val(),
		radius: $("#distance").val()
	};

	$.ajax({
    	url: 'https://trailapi-trailapi.p.mashape.com/', // The URL to the API. You can get this in the API page of the API you intend to consume
    	type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    	data: params, // Additional parameters here
    	dataType: 'json',
    	success: function(data) {
    		console.log((data));
    		for(var i = 0; i < data.places.length; i++) {

    			var place = data.places[i];
    			var directions = place.directions;

    			$('.results').append(`

					<div class="place">
						<h1>${place.name}</h1>
						<h2>${place.city}, ${place.state}</h2>
						<p class="${place.description === null ? 'no-description' : ''}">${place.description}</p>
						<p>Directions: ${directions}</p>
						<a href="${place.activities[0].url}">Read more</a>
					</div>
				`);

    		}
    	},
    	error: function(err) { alert(err); },
    	beforeSend: function(xhr) {
    		xhr.setRequestHeader("X-Mashape-Authorization", "QYyfJ0AJ55mshNE7Z8fXe8CIU4pQp1bT9bMjsnaTW8xTgmib0u"); // Enter here your Mashape key
    	}
	});

};




});